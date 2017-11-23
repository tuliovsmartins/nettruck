var Mpy = Mpy || {};

var jcrop, boundx, boundy, thumbDivId = 'previewContainer', cropperDivId = 'previewCrop';
var currentInstance;

Mpy.Cropper = function(imgSrc, formularioPrincipal, formularioCrop, widthPreview, heightPreview, aspectRatio) {
    var instance = this;
    currentInstance = this;
    var aspect = aspectRatio !== undefined ? aspectRatio : widthPreview / heightPreview;
    var pathImagem = imgSrc;
    pathImagem = pathImagem.replace('thumb_', '');
    var nomeImagem = pathImagem.split('../../external.html?link=http://www.flightmarket.com.br/');
    nomeImagem = nomeImagem[ nomeImagem.length - 1 ];
    nomeImagem = nomeImagem.replace('thumb_', '');
    var formDestinoCrop = formularioCrop;
    var formDestinoOrdenacao = formularioPrincipal;
    var Coords = {
        X1: 0,
        Y1: 0,
        X2: 0,
        Y2: 0,
        W: 0,
        H: 0
    };
    var callbackBotaoOk = function() {
    };
    this.getCoords = function() {
        return Coords;
    };
    this.setCoords = function(c) {
        this.Coords = c;
    };
    this.getFormDestinoCrop = function() {
        return jq(formDestinoCrop);
    };
    this.getFormDestinoOrdenacao = function() {
        return jq(formDestinoOrdenacao);
    };
    this.imgW;
    this.imgH;

    this.okAction = function() {
        var coords = instance.getCoords();
        var nome = 'crop';// + nomeImagem;

        var x = jq('<input />').attr('type', 'hidden').attr('name', nome + '_x').attr('id', nome + '_x').addClass('photo_hidden');
        var y = jq('<input />').attr('type', 'hidden').attr('name', nome + '_y').attr('id', nome + '_y').addClass('photo_hidden');
        var w = jq('<input />').attr('type', 'hidden').attr('name', nome + '_w').attr('id', nome + '_w').addClass('photo_hidden');
        var h = jq('<input />').attr('type', 'hidden').attr('name', nome + '_h').attr('id', nome + '_h').addClass('photo_hidden');
        var widthImg = jq('<input />').attr('type', 'hidden').attr('name', nome + '_widthImg').attr('id', nome + '_widthImg').addClass('photo_hidden');
        var heightImg = jq('<input />').attr('type', 'hidden').attr('name', nome + '_heightImg').attr('id', nome + '_heightImg').addClass('photo_hidden');
        var nomeimagem = jq('<input />').attr('type', 'hidden').attr('name', nome + '_nomeimagem').attr('id', nome + '_nomeimagem').addClass('photo_hidden');
        instance.getFormDestinoCrop().append(x);
        instance.getFormDestinoCrop().append(y);
        instance.getFormDestinoCrop().append(w);
        instance.getFormDestinoCrop().append(h);
        instance.getFormDestinoCrop().append(widthImg);
        instance.getFormDestinoCrop().append(heightImg);
        instance.getFormDestinoCrop().append(nomeimagem);

        x.val(coords.X1);
        y.val(coords.Y1);
        w.val(coords.W);
        h.val(coords.H);

        widthImg.val(this.imgW);
        heightImg.val(this.imgH);

        var imgnome = jq('#previewContainer img').attr('src');
        var patt = new RegExp(/[\w|-]+.[a-z]+$/i);
        imgnome = imgnome.match(patt);
        nomeimagem.val(imgnome);
    };

    this.openCropper = function(callbackOk) {
        callbackBotaoOk = callbackOk || callbackBotaoOk;
        if (formularioCrop !== '#cadastroPj')
            instance.getFormDestinoCrop().html('');
        jq('#previewCrop').html('<img src="' + pathImagem + '">');
        jq('#dialogCrop').css('display', 'inline');
        var cancelar = IDIOMA === 'pt' ? 'Cancelar' : 'Cancel';
        if (!jq('#botaoCancelarCrop')[0])
            jq('#dialogCrop').append('<input id="botaoCancelarCrop" type="button" value="' + cancelar + '">');

        jq('#previewContainer, #preview').css('width', widthPreview + 'px');
        jq('#previewContainer, #preview').css('height', heightPreview + 'px');

        if (formularioCrop === '#cadastroPj') {
            jq('#previewContainer2, #preview2').css('width', '140px');
            jq('#previewContainer2, #preview2').css('height', '40px');
        }

        jq('#previewCrop img').Jcrop({
            bgOpacity: 0.8,
            onChange: formularioCrop === '#cadastroPj' ? previewFormPj : showPreview,
            onSelect: formularioCrop === '#cadastroPj' ? previewFormPj : showPreview,
            aspectRatio: aspect
        }, function() {
            jq('#' + thumbDivId).html('');
            var bounds = this.getBounds();
            jcrop = this;
            boundx = bounds[0];
            boundy = bounds[1];
            var width = jq('#previewCrop img').width();
            var widthPreviewCrop = jq('#previewCrop').width();
            jq('.jcrop-holder').css('margin-left', (widthPreviewCrop - width) / 2 + 'px');
            instance.imgW = width;
            instance.imgH = jq('#previewCrop img').height();
            if (formularioCrop !== '#cadastroPj')
                fazerPreCrop(instance.imgW, instance.imgH);
        });

        jq('#txtDialog').css('position', 'relative')
                .css('height', '20px')
                .css('width', '550px');

        jq('#botaoCancelarCrop').click(function() {
            var imgnome = jq('.jcrop-holder img').attr('src');
            if (imgnome !== "") {
                var patt = new RegExp(/[\w|-]+.[a-z]+$/i);
                imgnome = imgnome.match(patt);
                imgnome = imgnome[0];
                removeImage(null, imgnome);
            }
            jq('#previewContainer').html('');
            jq('#previewCrop').html('');
            jq('#dialogCrop').css('display', 'none');
            jq('#dialogCrop').fadeOut('fast');
            jq('#botaoCancelarCrop').unbind('click');
        });

        jq('#botaoOkCrop').click(function() {
            //se o usuario clicou em ok sem fazer o crop
            var imagemCropada = jq('#previewContainer img')[0];
            if (!imagemCropada) {
                var msg = 'Please click and drag the cursor over the image to crop it.';
                if (IDIOMA === 'pt')
                    msg = 'Por favor, clique e arraste o cursor sobre a imagem para recortá-la.';
                alert(msg);
                return;
            }
            instance.okAction();
            jq('#previewContainer').html('');
            jq('#previewCrop').html('');
            jq('#dialogCrop').css('display', 'none');
            jq('#botaoOkCrop').unbind('click');
            callbackBotaoOk(nomeImagem);
        });

        function fazerPreCrop(imgW, imgH) {
            var x1 = 0, x2, y1 = 0, y2;
            y1 = 0;
            y2 = imgH;
            var largura = (imgH * 182) / 123;
            if (largura > imgW) {
                x1 = 0;
                x2 = imgW;
                var altura = (imgW * 123) / 182;
                var diferenca = imgH - altura;
                y1 = Math.round(diferenca / 2);
                y2 = Math.round(altura);
            } else {
                var diferenca = imgW - largura;
                x1 = Math.round(diferenca / 2);
                x2 = Math.round(largura);
            }
            jcrop.setSelect([x1, y1, x2, y2]);
        }
    };
}

function setInputHiddenOrdenacao(form) {
    var photo_ordenacao = jq('#foto_ordenacao');
    if (!photo_ordenacao[0]) {
        photo_ordenacao = jq('<input type="hidden" id="foto_ordenacao" name="foto_ordenacao" />');
        form.append(photo_ordenacao);
    }
    photo_ordenacao.val('');
    var ordem = new Array();
    jq('#sortableAnuncio li').each(function() {
        var imagem = jq(this).find('img').attr('src');
        if (imagem) {
            var imagem = imagem.split('../../external.html?link=http://www.flightmarket.com.br/');
            imagem = imagem[imagem.length - 1];
            imagem = imagem.replace('thumb_', '');
            ordem.push(imagem);
        }
    });
    var imagensSeparadasPorVirgula = ordem.join(',');
    jq('#foto_ordenacao').val(imagensSeparadasPorVirgula);
}

function removerExtensao(filename) {
    var patt = new RegExp(/[^\.]+/i);
    var match = filename.match(patt);
    if (match)
        return match[0];
    return false;
}

function showPreview(coords)
{
    var Coords = currentInstance.getCoords();
    Coords.X1 = coords.x;
    Coords.Y1 = coords.y;
    Coords.X2 = coords.x2;
    Coords.Y2 = coords.y2;
    Coords.W = coords.w;
    Coords.H = coords.h;
    currentInstance.setCoords(Coords);

    var img = jq("#" + cropperDivId).find('img');
    var imgsrc = img.attr('src');

    jq('#' + thumbDivId).html('<img src="' + imgsrc + '" />');
    var rx = jq('#' + thumbDivId).width() / coords.w;
    var ry = jq('#' + thumbDivId).height() / coords.h;
    jq('#' + thumbDivId + ' img').css({
        width: Math.round(rx * boundx) + 'px',
        height: Math.round(ry * boundy) + 'px',
        marginLeft: '-' + Math.round(rx * coords.x) + 'px',
        marginTop: '-' + Math.round(ry * coords.y) + 'px'
    });
    jq('#' + thumbDivId + ' img').css('max-width', '100000%'); //corrige conflito de estilo do bootstrap
}

function isExtensaoValida(str) {
    var patt = new RegExp(/\.jpg$|\.jpeg$|\.bmp$/i);
    var result = str.match(patt);
    return result != null ? true : false;
}

function previewFormPj(coords)
{
    var Coords = currentInstance.getCoords();
    Coords.X1 = coords.x;
    Coords.Y1 = coords.y;
    Coords.X2 = coords.x2;
    Coords.Y2 = coords.y2;
    Coords.W = coords.w;
    Coords.H = coords.h;
    currentInstance.setCoords(Coords);

    var img = jq("#" + cropperDivId).find('img');
    var imgsrc = img.attr('src');

    jq('#' + thumbDivId).html('<img src="' + imgsrc + '" />');
    var rx = jq('#' + thumbDivId).width() / coords.w;
    var ry = jq('#' + thumbDivId).height() / coords.h;
    jq('#' + thumbDivId + ' img').css({
        width: Math.round(rx * boundx) + 'px',
        height: Math.round(ry * boundy) + 'px',
        marginLeft: '-' + Math.round(rx * coords.x) + 'px',
        marginTop: '-' + Math.round(ry * coords.y) + 'px'
    });

    var thumbDivId2 = 'previewContainer2';

    jq('#' + thumbDivId2).html('<img src="' + imgsrc + '" />');
    var rx = jq('#' + thumbDivId2).width() / coords.w;
    var ry = jq('#' + thumbDivId2).height() / coords.h;
    jq('#' + thumbDivId2 + ' img').css({
        width: Math.round(rx * boundx) + 'px',
        height: Math.round(ry * boundy) + 'px',
        marginLeft: '-' + Math.round(rx * coords.x) + 'px',
        marginTop: '-' + Math.round(ry * coords.y) + 'px'
    });
    jq('#' + thumbDivId2 + ' img').css('max-width', '100000%'); //corrige conflito de estilo do bootstrap
}

/*
 function previewPhotoUpload(coords)
 {
 var Coords = currentInstance.getCoords();
 Coords.X1 = coords.x;
 Coords.Y1 = coords.y;
 Coords.X2 = coords.x2;
 Coords.Y2 = coords.y2;
 Coords.W = coords.w;
 Coords.H = coords.h;
 currentInstance.setCoords(Coords);
 
 var img = jq("#" + cropperDivId).find('img');
 var imgsrc = img.attr('src');
 
 jq('#' + thumbDivId).html('<img src="' + imgsrc + '" />');
 var rx = jq('#' + thumbDivId).width() / coords.w;
 var ry = jq('#' + thumbDivId).height() / coords.h;
 jq('#' + thumbDivId + ' img').css({
 width: Math.round(rx * boundx) + 'px',
 height: Math.round(ry * boundy) + 'px',
 marginLeft: '-' + Math.round(rx * coords.x) + 'px',
 marginTop: '-' + Math.round(ry * coords.y) + 'px'
 });
 
 var thumbDivId2 = '.photoupload_thumb:last';
 
 jq(thumbDivId2).html('<img src="' + imgsrc + '" />');
 var rx = jq(thumbDivId2).width() / coords.w;
 var ry = jq(thumbDivId2).height() / coords.h;
 jq(thumbDivId2 + ' img').css({
 width: Math.round(rx * boundx) + 'px',
 height: Math.round(ry * boundy) + 'px',
 marginLeft: '-' + Math.round(rx * coords.x) + 'px',
 marginTop: '-' + Math.round(ry * coords.y) + 'px'
 });
 }*/