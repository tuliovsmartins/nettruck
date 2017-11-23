var jq = jQuery.noConflict();

function converterParaReal(n) {

    if (n > 0) {

        c = 2;
        //separadores
        d = ',';
        t = '.';
        //valor de entrada
        //n = 1000.00;

        var n = n,
                c = isNaN(c = Math.abs(c)) ? 2 : c,
                d = d == undefined ? "," : d,
                t = t == undefined ? "." : t,
                s = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;

        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");

    }
}

(function(jq) {
    jq.fn.checkFileType = function(options) {
        var defaults = {
            allowedExtensions: [],
            success: function() {
            },
            error: function() {
            }
        };
        options = jq.extend(defaults, options);

        return this.each(function() {

            jq(this).on('change', function() {
                var value = jq(this).val(),
                        file = value.toLowerCase(),
                        extension = file.substring(file.lastIndexOf('.') + 1);

                if (jq.inArray(extension, options.allowedExtensions) == -1) {
                    options.error();
                    jq(this).focus();
                } else {
                    options.success();

                }

            });

        });
    };

})(jQuery);

function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}
function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}
function mtel(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    return v;
}
function id(el) {
    return document.getElementById(el);
}


function countChar(val) {
    var len = val.value.length;
    if (len > 50) {
        val.value = val.value.substring(0, 50);
    } else {
        jq('#count-resposta em').text(50 - len);
    }
}
;

/* ABAS */
jq.abasSimples = function() {
    var abas = 'p#abas';
    var conteudos = 'div#conteudos';
    jq(conteudos + ' .box-aba').hide();
    jq(conteudos + ' .box-aba').first().show();
    jq(abas + ' a').click(function() {
        jq(abas + ' a').removeClass('selected');
        jq(abas + ' a span').remove();
        jq(this).addClass('selected');
        jq(this).append('<span></span>');
        jq(conteudos + ' .box-aba').hide();
        jq(conteudos + ' ' + jq(this).attr('href')).slideDown();
        return false;
    });
};

jq.abaDentroAba = function() {
    var abas = 'ul#tabs-plano';
    var conteudos = 'div#conteudos-aba';
    jq(conteudos + ' .abas-plano').hide();
    jq(conteudos + ' .abas-plano').first().show();
    jq(abas + ' a').click(function() {
        jq(abas + ' a').removeClass('selected');
        jq(this).addClass('selected');
        jq(conteudos + ' .abas-plano').hide();
        jq(conteudos + ' ' + jq(this).attr('href')).show();
        return false;
    });
};

jq.abaDicas = function() {
    var abas = '#dicas .left ul';
    var conteudos = '#dicas';
    jq(conteudos + ' .right').hide();
    jq(conteudos + ' .right').first().show();
    jq(abas + ' a').click(function() {
        jq(abas + ' a').removeClass('selected');
        jq(this).addClass('selected');
        jq(conteudos + ' .right').hide();
        jq(conteudos + ' ' + jq(this).attr('href')).show();
        return false;
    });
};

function verificaCaptcha(field, rules, i, options) {
    if (field.val() != jq('input[name="word"]').val()) {
        // this allows the use of i18 for the error msgs
        return options.allrules.captchaErrado.alertText;
    }
}

function SomenteNumero(e) {
    var tecla = (window.event) ? event.keyCode : e.which;
    if ((tecla > 47 && tecla < 58))
        return true;
    else {
        if (tecla == 8 || tecla == 0)
            return true;
        else
            return false;
    }
}

function removeImagemGalleryFancybox(a) {
    var dataIdFotoPrincipal = a.attr('data-id-foto');
    jq('div.image-gallery a').attr('rel', 'gallery');
    jq('div.image-gallery a').each(function() {
        var dataIdFotoGaleria = jq(this).attr('data-id-foto');
        if (dataIdFotoGaleria === dataIdFotoPrincipal) {
            jq(this).removeAttr('rel');
        }
    });
}

/* CAROUSEL FOTOS */
function aplicarCarouselFotos() {
    var firstImg = jq('#box-gallery .gallery ul li a').attr('href');
    if (typeof firstImg !== 'undefined') {

        /*
         jq('#box-image img').attr('src', firstImg);
         var largeImg = firstImg.replace('519x350_', '');
         jq('#box-image a').attr('href', largeImg);
         jq('#box-gallery .gallery ul li').first().find('a').addClass('active');
         */

        jq('#box-gallery .gallery ul li a').click(function(event) {
            event.preventDefault();

            if (jq('#box-image img').attr('src') != jq(this).attr('href')) {

                var linkImg = jq(this).attr('href');
                var linkImgBig = jq(this).attr('data-href-foto-big');
                var dataIndex = jq(this).attr('data-index');
                var dataIdFoto = jq(this).attr('data-id-foto');

                jq('#box-image').append('<span class="wait-loading"></span>');
                jq('.gallery ul li a.active').removeClass('active');
                jq('#box-image img').attr('src', linkImg);
                //jq('#box-image a').attr('href', linkImgBig);
                jq('#box-image a').attr('data-id-foto', dataIdFoto);
                jq('#box-image a').attr('data-index', dataIndex);
                jq('#box-image a').attr('onclick', "jq('a.fancyboxDetalhesAeronave').eq(" + dataIndex + ").trigger('click'); removeImagemGalleryFancybox(jq('a.fancyboxImagePrincipal')); _gaq.push(['_trackEvent', 'ClickFotoAnuncio', 'Click', 'Foto Grande']); return false;");

                jq(this).addClass('active');

                jq('#box-image img').load(function() {
                    jq('#box-image span.wait-loading').remove();
                });

            }

        });

        jq('#box-gallery .gallery ul').each(function() {
            var listChilds = jq(this).find('li');
            var height = 0;
            listChilds.each(function() {
                height += jq(this).outerHeight(true);
            });
            jq(this).height(height);
        });

    }
}

function aplicarCarouselFotosPeca() {
    var firstImg = jq('#box-gallery .gallery ul li a').attr('href');
    if (typeof firstImg !== 'undefined') {

        /*
         jq('#box-image img').attr('src', firstImg);
         var largeImg = firstImg.replace('519x350_', '');
         jq('#box-image a').attr('href', largeImg);
         jq('#box-gallery .gallery ul li').first().find('a').addClass('active');
         */

        jq('#box-gallery .gallery ul li a').click(function(event) {
            event.preventDefault();

            if (jq('#box-image img').attr('src') != jq(this).attr('href')) {

                var linkImg = jq(this).attr('href');
                var linkImgBig = jq(this).attr('data-href-foto-big');
                var dataIndex = jq(this).attr('data-index');
                var dataIdFoto = jq(this).attr('data-id-foto');

                jq('#box-image').append('<span class="wait-loading"></span>');
                jq('.gallery ul li a.active').removeClass('active');
                jq('#box-image img').attr('src', linkImg);
                //jq('#box-image a').attr('href', linkImgBig);
                jq('#box-image a').attr('data-id-foto', dataIdFoto);
                jq('#box-image a').attr('data-index', dataIndex);
                jq('#box-image a').attr('onclick', "jq('a.fancyboxDetalhesAeronave').eq(" + dataIndex + ").trigger('click'); removeImagemGalleryFancybox(jq('a.fancyboxImagePrincipal')); _gaq.push(['_trackEvent', 'ClickFotoAnuncioPeca', 'Click', 'Foto Grande']); return false;");

                jq(this).addClass('active');

                jq('#box-image img').load(function() {
                    jq('#box-image span.wait-loading').remove();
                });

            }

        });

        jq('#box-gallery .gallery ul').each(function() {
            var listChilds = jq(this).find('li');
            var height = 0;
            listChilds.each(function() {
                height += jq(this).outerHeight(true);
            });
            jq(this).height(height);
        });

    }
}

function aplicarCarouselFotosHangar() {
    var firstImg = jq('#box-gallery .gallery ul li a').attr('href');
    if (typeof firstImg !== 'undefined') {

        /*
         jq('#box-image img').attr('src', firstImg);
         var largeImg = firstImg.replace('519x350_', '');
         jq('#box-image a').attr('href', largeImg);
         jq('#box-gallery .gallery ul li').first().find('a').addClass('active');
         */

        jq('#box-gallery .gallery ul li a').click(function(event) {
            event.preventDefault();

            if (jq('#box-image img').attr('src') != jq(this).attr('href')) {

                var linkImg = jq(this).attr('href');
                var linkImgBig = jq(this).attr('data-href-foto-big');
                var dataIndex = jq(this).attr('data-index');
                var dataIdFoto = jq(this).attr('data-id-foto');

                jq('#box-image').append('<span class="wait-loading"></span>');
                jq('.gallery ul li a.active').removeClass('active');
                jq('#box-image img').attr('src', linkImg);
                //jq('#box-image a').attr('href', linkImgBig);
                jq('#box-image a').attr('data-id-foto', dataIdFoto);
                jq('#box-image a').attr('data-index', dataIndex);
                jq('#box-image a').attr('onclick', "jq('a.fancyboxDetalhesAeronave').eq(" + dataIndex + ").trigger('click'); removeImagemGalleryFancybox(jq('a.fancyboxImagePrincipal')); _gaq.push(['_trackEvent', 'ClickFotoAnuncioHangar', 'Click', 'Foto Grande']); return false;");

                jq(this).addClass('active');

                jq('#box-image img').load(function() {
                    jq('#box-image span.wait-loading').remove();
                });

            }

        });

        jq('#box-gallery .gallery ul').each(function() {
            var listChilds = jq(this).find('li');
            var height = 0;
            listChilds.each(function() {
                height += jq(this).outerHeight(true);
            });
            jq(this).height(height);
        });

    }
}

function aplicarCarouselFotosServico() {
    var firstImg = jq('#box-gallery .gallery ul li a').attr('href');
    if (typeof firstImg !== 'undefined') {

        /*
         jq('#box-image img').attr('src', firstImg);
         var largeImg = firstImg.replace('519x350_', '');
         jq('#box-image a').attr('href', largeImg);
         jq('#box-gallery .gallery ul li').first().find('a').addClass('active');
         */

        jq('#box-gallery .gallery ul li a').click(function(event) {
            event.preventDefault();

            if (jq('#box-image img').attr('src') != jq(this).attr('href')) {

                var linkImg = jq(this).attr('href');
                var linkImgBig = jq(this).attr('data-href-foto-big');
                var dataIndex = jq(this).attr('data-index');
                var dataIdFoto = jq(this).attr('data-id-foto');

                jq('#box-image').append('<span class="wait-loading"></span>');
                jq('.gallery ul li a.active').removeClass('active');
                jq('#box-image img').attr('src', linkImg);
                //jq('#box-image a').attr('href', linkImgBig);
                jq('#box-image a').attr('data-id-foto', dataIdFoto);
                jq('#box-image a').attr('data-index', dataIndex);
                jq('#box-image a').attr('onclick', "jq('a.fancyboxDetalhesAeronave').eq(" + dataIndex + ").trigger('click'); removeImagemGalleryFancybox(jq('a.fancyboxImagePrincipal')); _gaq.push(['_trackEvent', 'ClickFotoAnuncioServico', 'Click', 'Foto Grande']); return false;");

                jq(this).addClass('active');

                jq('#box-image img').load(function() {
                    jq('#box-image span.wait-loading').remove();
                });

            }

        });

        jq('#box-gallery .gallery ul').each(function() {
            var listChilds = jq(this).find('li');
            var height = 0;
            listChilds.each(function() {
                height += jq(this).outerHeight(true);
            });
            jq(this).height(height);
        });

    }
}


function verificaEmail(field, rules, i, options) {
    var email = field.val();
    console.log(email);
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)) {
        console.log('Email valid');
        return true;
    } else {
        return options.allrules.emailErrado.alertText;
        console.log('Email invalid');
    }
}

function verificaCpf(field, rules, i, options) {
    var cpf = field.val();
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf == '')
        return options.allrules.cpfErrado.alertText;

    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
        return options.allrules.cpfErrado.alertText;

    // Valida 1o digito
    add = 0;
    for (i = 0; i < 9; i ++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return options.allrules.cpfErrado.alertText;

    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i ++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return options.allrules.cpfErrado.alertText;

}

function verificaCnpj(field, rules, i, options) {
    var cnpj = field.val();
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '')
        return options.allrules.cnpjErrado.alertText;

    if (cnpj.length != 14)
        return options.allrules.cnpjErrado.alertText;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
        return options.allrules.cnpjErrado.alertText;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return options.allrules.cnpjErrado.alertText;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return options.allrules.cnpjErrado.alertText;

}

jq(document).ready(function() {


    function split( val ) {
        return val.split( /,\s*/ );
    }

    function extractLast( term ) {
        return split( term ).pop();
    }

    jq( "#busca-simples" ).autocomplete({
        //source: '/pt/get-aircraft-autocomplete',
        source: function( request, response ) {
            jq.getJSON( "/pt/get-aircraft-autocomplete", {
                term: extractLast( request.term )
            }, response );
        },
        minLength: 3,
        open: function() {},
        close: function() {},
        focus: function(event,ui) {
        },
        select: function( event, ui ) {
            var terms = split( this.value );
            // remove the current input
            terms.pop();
            // add the selected item

            //var textConvertido = ui.item.value.replace(' - ', ' ');
            var textConvertido = ui.item.value;
            var arrayTexto = textConvertido.split(' - ');

            //ui.item.value

            terms.push( arrayTexto[1] );
            // add placeholder to get the comma-and-space at the end
            terms.push( "" );
            this.value = terms.join( ", " );
            return false;
        }
    });
	
	jq('.removerListaFavoritos').on('click', function() {
		
		var idAnuncio = $(this).attr('id-anuncio');
		var enumTipoAnuncio = $(this).attr('tipo-anuncio');
		
		jq.ajax({
        type: "POST",
        url: URL + 'usuarios/favoritar',
        data: {
            idanuncio: idAnuncio,
            tipoanuncio: enumTipoAnuncio
        },
        success: function (data) {
			
		}
		});
	});
	
window.dataLayer=window.dataLayer||[];

//ga analytics

jq('a.col-category-item').on('click', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'HomeCategorias',
			'eventAction':'click',
			'eventLabel':'Busca por Categorias'
		});
	});

jq('a#logo').on('click', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'LogoFlightMarket',
			'eventAction':'click',
			'eventLabel':'Logo FlightMarket'
		});
	});

jq('div#breadcrumbs').on('click', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'Breadcrumbs',
			'eventAction':'click',
			'eventLabel':'Breadcrumbs'
		});
	});

jq('div#outras-news').on('click', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'Noticias',
			'eventAction':'click',
			'eventLabel':'Outras Noticias'
		});
	});

jq('form#formBusca').on('submit', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'BuscaSimples',
			'eventAction':'submit',
			'eventLabel':'Busca Simples'
		});
	});

jq('form#formBuscaAvancada').on('submit', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'BuscaAvancada',
			'eventAction':'submit',
			'eventLabel':'Busca Avancada'
		});
	});

jq('ul.anuncios-destaques-cookie li a').on('click', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'HomeAnunciosDestaques',
			'eventAction':'click',
			'eventLabel':'Busca por Anuncios em Destaque'
		});
	});

jq('div.ultimos-adcionados-cookie li a').on('click', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'HomeUltimosAdicionados',
			'eventAction':'click',
			'eventLabel':'Busca por Ultimos Adicionados'
		});
	});

jq('div.lista-fabricantes-cookie li a').on('click', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'HomeFabricantes',
			'eventAction':'click',
			'eventLabel':'Busca por Fabricantes'
		});
	});

jq('div.ultimos-anuncios-cookie li a').on('click', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'SiteUltimosAnuncios',
			'eventAction':'click',
			'eventLabel':'Ultimos Anuncios Visualizados'
		});
	});

jq('form.formNews').on('submit', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'Newsletter',
			'eventAction':'submit',
			'eventLabel':'Inscricao newsletter'
		});
	});

jq('form#formNews').on('submit', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'Newsletter',
			'eventAction':'submit',
			'eventLabel':'Inscricao newsletter superior'
		});
	});

jq('#bt-face').on('click', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'Facebook',
			'eventAction':'click',
			'eventLabel':'Acessou Facebook'
		});
	});

jq('#bt-twitter').on('click', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'Twitter',
			'eventAction':'click',
			'eventLabel':'Acessou Twitter'
		});
	});
	
jq('#bt-instagram').on('click', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'Instagram',
			'eventAction':'click',
			'eventLabel':'Acessou Instagram'
		});
	});

    //aeronaves
	
jq('ul#destaques-list').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'AnunciosSemelhantes',
			'eventAction':'click',
			'eventLabel':'Anuncios Semelhantes'
		});
	});

jq('a.fancyboxDetalhesAeronave').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'ClickFotoAnuncioAeronave',
			'eventAction':'click',
			'eventLabel':'Foto Grande Aeronave'
		});
	});

jq('a.showVideoDetalhesAeronave').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'ClickFotoAnuncioAeronave',
			'eventAction':'click',
			'eventLabel':'Video Galeria Aeronave'
		});
	});

jq('a.imagemGaleriaAeronave').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'ClickFotoAnuncioAeronave',
			'eventAction':'click',
			'eventLabel':'Foto Galeria Aeronave'
		});
	});

jq('a.linkRecomendarAeronave').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'RecomendouAeronave',
			'eventAction':'Recomendar',
			'eventLabel':'Recomendou Aeronave'
		});
	});

jq('a.linkVerTelefoneAeronave').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'VerTelefoneAeronave',
			'eventAction':'click',
			'eventLabel':'Ver Telefone Aeronave'
		});
	});

jq('.submitAeronaveDetalhes').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'ConversacaoEnviadaAeronave',
			'eventAction':'click',
			'eventLabel':'Conversacao Aeronave'
		});
	});

	//editar anuncio

jq('a#btn-add-foto').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'EditouAnuncio',
			'eventAction':'Editar',
			'eventLabel':'Adicionou Foto'
		});
	});

jq('input#horas-totais').on('keypress', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'EditouAnuncio',
			'eventAction':'Editar',
			'eventLabel':'Editou Horas Totais'
		});
	});

jq('input#consulte').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'EditouAnuncio',
			'eventAction':'Editar',
			'eventLabel':'Editou Valor Consulte'
		});
	});

jq('input#real').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'EditouAnuncio',
			'eventAction':'Editar',
			'eventLabel':'Editou Moeda Real'
		});
	});

jq('input#dolar').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'EditouAnuncio',
			'eventAction':'Editar',
			'eventLabel':'Editou Moeda Dolar'
		});
	});

jq('input#valor').on('keypress', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'EditouAnuncio',
			'eventAction':'Editar',
			'eventLabel':'Editou Moeda Valor'
		});
	});

    //fale conosco
	
jq('form#formFaleConosco').on('submit', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'Contato',
			'eventAction':'Lead',
			'eventLabel':'Fale Conosco'
		});
	});

jq('form#formRevendedores').on('submit', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'Contato',
			'eventAction':'Lead',
			'eventLabel':'Contato Revendedor'
		});
	});

jq('form.faleConoscoPublicidade').on('submit', function() {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'Contato',
			'eventAction':'Lead',
			'eventLabel':'Contato Publicidade'
		});
	});

    //Hangar
	
jq('.flagImagemPrincipalHangar').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'ClickFotoAnuncioHangar',
			'eventAction':'click',
			'eventLabel':'Foto Grande Hangar'
		});
	});	

jq('.flagImagemPrincipalHangarGaleria').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'ClickFotoAnuncioHangar',
			'eventAction':'click',
			'eventLabel':'Foto Galeria Hangar'
		});
	});	

jq('a.linkRecomendarHangar').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'RecomendouHangar',
			'eventAction':'Recomendar',
			'eventLabel':'Recomendou Hangar'
		});
	});	

jq('a.verTelefoneHangar').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'VerTelefoneHangar',
			'eventAction':'click',
			'eventLabel':'Ver o Telefone Hangar'
		});
	});	

jq('.submitHangarDetalhes').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'ConversacaoEnviadaHangar',
			'eventAction':'click',
			'eventLabel':'Conversacao Hangar'
		});
	});

    //Peca
	
jq('.flagImagemPrincipalPeca').on('click', function () {

		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'ClickFotoAnuncioPeca',
			'eventAction':'click',
			'eventLabel':'Foto Grande Peca'
		});
	});

jq('.flagImagemPrincipalPecaGaleria').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'ClickFotoAnuncioPeca',
			'eventAction':'click',
			'eventLabel':'Foto Galeria Peca'
		});
	});

jq('a.linkRecomendarPeca').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'RecomendouPeca',
			'eventAction':'Recomendar',
			'eventLabel':'Recomendou Peca'
		});
	});

jq('a.verTelefonePeca').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'VerTelefonePeca',
			'eventAction':'click',
			'eventLabel':'Ver o Telefone Peca'
		});
	});

jq('.submitPecasDetalhes').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'ConversacaoEnviadaPecas',
			'eventAction':'click',
			'eventLabel':'Conversacao Pecas'
		});
	});

    //perfil-Servicos

jq('.flagImagemPrincipalPerfil').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'ClickFotoAnuncioServico',
			'eventAction':'click',
			'eventLabel':'Foto Grande Servico'
		});
	});

jq('a.linkRecomendarPerfil').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'RecomendouServico',
			'eventAction':'Recomendar',
			'eventLabel':'Recomendou Perfil Servico'
		});
	});

jq('.submitServicosDetalhes').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'ConversacaoEnviadaServicos',
			'eventAction':'click',
			'eventLabel':'Conversacao Servicos'
		});
	});

jq('.see-phone').on('click', function () {
		dataLayer.push({
			'event':'clickEvents',
			'eventCategory':'VerTelefoneServico',
			'eventAction':'click',
			'eventLabel':'Ver o Telefone Servico'
		});
	});
		
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		// some code..
		pathArray = window.location.href.split( '../../external.html?link=http://www.flightmarket.com.br/' );
		protocol = pathArray[0];
		host = pathArray[2];
		uri1 = pathArray[3];
		uri2 = pathArray[4];
		uri3 = pathArray[5];
		uri4 = pathArray[6];
		uri5 = pathArray[7];
		uri6 = pathArray[8];
		uri7 = pathArray[9];
		
		if(!uri1) {
			uri1 = 'pt';
		}
		console.log(typeof uri2);
		
		if( typeof uri2 === 'undefined') {
			url = protocol + '//' + host + '/' + uri1 + '/mobile/';
		}
		
		if(typeof uri2 !== 'undefined' && typeof uri3 === 'undefined') {
			if(uri2 == 'home') {
				url = protocol + '//' + host + '/' + uri1 + '/mobile/';
			} else {
				url = protocol + '//' + host + '/' + uri1 + '/mobile/' + uri2;
			}
		}
		if(typeof uri3 !== 'undefined' && typeof uri4 === 'undefined') {
		url = protocol + '//' + host + '/' + uri1 + '/mobile/' + uri2 + '/' + uri3;
		}
		if(typeof uri4 !== 'undefined' && typeof uri5 === 'undefined') {
		url = protocol + '//' + host + '/' + uri1 + '/mobile/' + uri2 + '/' + uri3 + '/' + uri4;
		}
		if(typeof uri5 !== 'undefined' && typeof uri6 === 'undefined') {
		url = protocol + '//' + host + '/' + uri1 + '/mobile/' + uri2 + '/' + uri3 + '/' + uri4 + '/' + uri5;
		}
		if(typeof uri6!== 'undefined' && typeof uri7 === 'undefined') {
		url = protocol + '//' + host + '/' + uri1 + '/mobile/' + uri2 + '/' + uri3 + '/' + uri4 + '/' + uri5 + '/' + uri6;
		}
		if(typeof uri7 !== 'undefined') {
		url = protocol + '//' + host + '/' + uri1 + '/mobile/' + uri2 + '/' + uri3 + '/' + uri4 + '/' + uri5 + '/' + uri6 + '/' + uri7;
		}
		
		if(uri2 != 'noticias' && uri2 != 'solucoes-financeiras' && uri2 !=  'pecas' && uri2 !=  'servicos' && uri2 !=  'empregos' && uri2 !=  'hangares' && uri2 != 'busca' && uri2 != 'busca-vendedores' && uri2 != 'fale-conosco') {
			//console.log(url);
			//window.location.href = url;
		}
	}	
		
	var $mail = jq("#apelido");
	jq("#nome").keyup(function() {
		jq('#apelido').val(this.value);
	});
	
    jq("#sendPerfil").validationEngine({
        promptPosition: "bottomLeft",
        scroll: false
    });

    jq('#sendPerfil input[type="submit"]').live('click', function() {

        var valid = jq("#sendPerfil").validationEngine('validate');

        if (valid == true) {

            //disable submit button
            jq('#sendPerfil input[type="submit"]').attr('disabled', 'disabled');
            jq('#sendPerfil input[type="submit"]').val('Aguarde ...');
            jq('#sendPerfil').submit();

        } else {
            jq("#sendPerfil").validationEngine();
        }
    });

    jq("form.form_tabela_aeronave").validationEngine({
        promptPosition: "topRight",
        scroll: false
    });

    jq('form.form_tabela_aeronave input[type="submit"]').live('click', function() {

        var valid = jq("form.form_tabela_aeronave").validationEngine('validate');

        if (valid == true) {

            //disable submit button
            jq('form.form_tabela_aeronave input[type="submit"]').attr('disabled', 'disabled');
            jq('form.form_tabela_aeronave input[type="submit"]').val('Aguarde ...');
            jq('form.form_tabela_aeronave').submit();

        } else {
            jq("form.form_tabela_aeronave").validationEngine();
        }
    });

    jq("#formFaleConosco").validationEngine({
        promptPosition: "topRight",
        scroll: false
    });

    jq('#formFaleConosco input[type="submit"]').live('click', function() {

        var valid = jq("#formFaleConosco").validationEngine('validate');

        if (valid == true) {

            //disable submit button
            jq('#formFaleConosco input[type="submit"]').attr('disabled', 'disabled');
            jq('#formFaleConosco input[type="submit"]').val('Aguarde ...');
            jq('#formFaleConosco').submit();

        } else {
            jq("#formFaleConosco").validationEngine();
        }
    });

    jq('div.listaAnunciosPerfil a').click(function() {
        var anchor = jq(this).attr('data-anchor');
        if (anchor !== "") {
            jq('div.listaComumPerfil').hide();
            jq('div.' + anchor).fadeIn();
        }
    });



    jq('a#back').click(function() {
        history.back();
    });


    jq('a.btnVoltar').click(function() {
        history.back();
    });

    jq('.see-phone').click(function() {

        var ajax = new Mpy.Ajax();

        var idAnuncio = jq(this).attr('data-id');
        var tipoAnuncio = 'servico';

        var callback = function(data) {
            //data = eval(data);
        };

        ajax.requestClickTelefone(idAnuncio, tipoAnuncio, callback);

        jq(this).fadeOut('fast', function() {
            jq('.see-phone-disable').fadeIn('normal');
        });
    });

    jq('#vertel').click(function() {

        if (!jq(this).hasClass('active')) {
            jq(this).addClass('active');
            tel = jq(this).attr('rel');
            jq(this).find('span').text(tel);
            jq(this).parent().find('p.title').fadeIn();

            var ajax = new Mpy.Ajax();

            var patt = new RegExp(/\/[0-9]+\//);
            var url = window.location.toString();

            /*
             var idAnuncio = url.match(patt);
             if (idAnuncio) {
             idAnuncio = idAnuncio.toString().replace("/", "");
             } else {
             patt = new RegExp(/\/[0-9]+/);
             idAnuncio = url.match(patt);
             idAnuncio = idAnuncio.toString().replace("/", "");
             }
             */

            var idAnuncio = jq(this).attr('data-id');

            if (jq(this).hasClass('aeronave') || jq(this).hasClass('linkVerTelefoneAeronave'))
                var tipoAnuncio = 'aeronave';

            if (jq(this).hasClass('hangar'))
                var tipoAnuncio = 'hangar';

            if (jq(this).hasClass('peca'))
                var tipoAnuncio = 'peca';

            if (jq(this).hasClass('servico'))
                var tipoAnuncio = 'servico';

            if (jq(this).hasClass('emprego'))
                var tipoAnuncio = 'emprego';

            var callback = function(data) {
                //data = eval(data);
            };

            ajax.requestClickTelefone(idAnuncio, tipoAnuncio, callback);

            jq(this).addClass('clicked');

            return;
        } else {
            jq(this).removeClass('active');
            jq(this).parent().find('p.title').fadeOut();
        }

    });


    /* ABAS */
    jq.abasSimples();
    jq.abaDentroAba();
    jq.abaDicas();
    jq('#main-right #tabs #conteudos ol li span').append('<em></em>');
    jq('.title-SearchAvancada').click(function() {
        jq(this).parent().find('#formSearchAvancada, #searchAvHangares').slideToggle('slow');
        jq(this).find('em').toggleClass('active');
    });
    jq('#toggle-avancada-aeroporto').click(function() {
        var submit = jq('#submit-aeroporto-simples');
        if (submit.css('display') == 'none') {
            submit.css('display', 'inline');
        } else {
            submit.css('display', 'none');
        }
    });
    jq('#toggle-avancada-hangar').click(function() {
        var submit = jq('#submit-hangar-simples');
        if (submit.css('display') == 'none') {
            submit.css('display', 'inline');
        } else {
            submit.css('display', 'none');
        }
    });

    jq('#search-avancada').click(function() {
        jq('#formBuscaAvancada').slideToggle('slow');
    });
    jq('#conteudos ol li span').click(function() {
        jq(this).parent().find('ul').slideToggle('slow');
        jq(this).find('em').toggleClass('active');
    });

    /* FANCYBOX */

    jq(".fancyboxDetalhesAeronave").fancybox({
        'titlePosition': 'outside',
        'cyclic': true,
        'titleFormat': function(title, currentArray, currentIndex, currentOpts) {
            return '<span id="fancybox-title-over">Imagem ' + (currentIndex + 1) + ' de ' + currentArray.length + ' ' + title + '</span>';
        },
        'onStart': function(currentArray, currentIndex) {
            var obj = currentArray[ currentIndex ];
            var alt = jq(obj).find('img').attr("alt");
            jq('img#fancybox-img').attr('alt', alt);
            this.title = jq(obj).find('img').attr("title");
            this.alt = jq(obj).find('img').attr("title");
        },
        'onClosed': function() {
            jq(".image-gallery a").attr('rel', 'gallery');
        }

    }); // fancybox

    jq('.fancybox').fancybox();

    jq('.fancyboxCustom').fancybox({
        'width': '75%',
        'height': '75%'
    });

    /* FORMS */
    jq(":input[placeholder]").placeholder();

    jq('.validate').validationEngine({
        autoHidePrompt: true,
        autoHideDelay: 2000,
        scroll: true
    });

    jq('.validatebuscaNews').validationEngine({
        promptPosition: 'centerRight:-190,0'
    });

    jq('.page-login form').each(function() {
        jq(this).validationEngine({
            autoHidePrompt: true,
            autoHideDelay: 2000,
            scroll: false
        });
    });

    jq('#formSenha').validationEngine({
        autoHidePrompt: true,
        autoHideDelay: 2000,
        scroll: false
    });

    if (jq('#cadastroPj #paises_id').val() == '1') {
        // jq('#cadastroPf #telefone').mask('(99)9999-9999');
        // jq('#cadastroPj #telefone').mask('(99)9999-9999');
        // jq('#cadastroPj #telefone2').mask('(99)9999-9999');
    }

    /*
     jq('#cadastroPj #ddd2').change(function() {
     if (parseInt(jq(this).val()) == 11 && jq('#cadastroPj #paises_id').val() == '1') {
     jq('#cadastroPj #telefone2').mask('(99)99999-9999');
     } else if (jq('#cadastroPj #paises_id').val() == '1') {
     jq('#cadastroPj #telefone2').mask('9999-9999');
     } else {
     jq('#cadastroPj #telefone2').unmask();
     }
     });
     
     jq('#cadastroPj #ddd').change(function() {
     if (parseInt(jq(this).val()) == 11 && jq('#cadastroPj #paises_id').val() == '1') {
     jq('#cadastroPj #telefone').mask('(99)99999-9999');
     } else if (jq('#cadastroPj #paises_id').val() == '1') {
     jq('#cadastroPj #telefone').mask('9999-9999');
     } else {
     jq('#cadastroPj #telefone').unmask();
     }
     });
     
     jq('#cadastroPf #ddd').change(function() {
     if (parseInt(jq(this).val()) == 11 && jq('#cadastroPf #paises_id').val() == '1') {
     jq('#cadastroPf #telefone').mask('(99)99999-9999');
     } else if (jq('#cadastroPf #paises_id').val() == '1') {
     jq('#cadastroPf #telefone').mask('9999-9999');
     } else {
     jq('#cadastroPf #telefone').unmask();
     }
     });
     
     jq('#cadastroPf #paises_id').change(function() {
     if (jq(this).val() == '1') {
     jq('#cadastroPf #telefone').mask('(99)9999-9999');
     jq('#ddi').val('55');
     } else {
     jq('#cadastroPf #telefone').unmask();
     jq('#ddi').val('');
     }
     });
     
     jq('#cadastroPj #paises_id').change(function() {
     if (jq(this).val() == '1') {
     jq('#cadastroPj #telefone').mask('(99)9999-9999');
     jq('#cadastroPj #telefone2').mask('9999-9999');
     jq('#ddi').val('55');
     } else {
     jq('#cadastroPj #telefone').unmask();
     jq('#cadastroPj #telefone2').unmask();
     jq('#ddi').val('');
     }
     });
     */

    jq('.tipoPessoa').click(function() {
        var id = jq(this).attr('id');
        if (id === 'pessoa-juridica') {
            jq('.containerCpf').hide();
            jq('.containerCnpj').show();
            $('#cpf').attr('name', 'invalid');
            $('#cnpj').attr('name', 'document');
        } else {
            jq('.containerCnpj').hide();
            jq('.containerCpf').show();
            $('#cnpj').attr('name', 'invalid');
            $('#cpf').attr('name', 'document');
        }
    });


    jq('#telefonePerfil, .telefonePerfil').attr('placeholder', 'DDD + Número');

    /*
     jq('#telefonePerfil, .telefonePerfil').focusout(function() {
     var phone, element;
     element = jq(this);
     element.unmask();
     phone = element.val().replace(/\D/g, '');
     if (phone.length > 13) {
     element.mask("+(99)(999)99999-999?9");
     } else {
     element.mask("+(99)(999)9999-9999?9");
     }
     }).trigger('focusout');
     */

    jq('.telefoneDDDDDI').focusout(function() {
        var phone, element;
        element = jq(this);
        element.unmask();
        phone = element.val().replace(/\D/g, '');
        if (phone.length > 10) {
            element.mask("99 (99) 99999-999?9");
        } else {
            element.mask("99 (99) 9999-9999?9");
        }
    }).trigger('focusout');

    jq('.telefoneDDD').focusout(function() {
        var phone, element;
        element = jq(this);
        element.unmask();
        phone = element.val().replace(/\D/g, '');
        if (phone.length > 10) {
            element.mask("(99) 99999-999?9");
        } else {
            element.mask("(99) 9999-9999?9");
        }
    }).trigger('focusout');

//jq('#telefone').mask('(99) 9999-9999');
//jq('.phone').mask('9999-9999');
    jq('.data').mask('99/99/9999');
    jq('.cep').mask('99.999-999');
    jq('.cpf').mask('999.999.999-99');
    //jq('.cod').mask('999');
    // jq('.horas').mask('99:99'); horas de aeronaves nao pode ter esta mascara

    jq('input[name="cep"]').mask('99.999-999');
    jq('.cpf').mask('999.999.999-99');
    jq('#homephone').mask('(99) 9999-9999');
    jq('#cellphone').mask('(99) 99999-9999');
    jq('.cnpj').mask('99.999.999/9999-99');
    jq('#birthdate').mask('99/99/9999');
    // jq('#cadastroPf #ddi').mask('+99');
    // jq('#cadastroPj #ddi').mask('+99');
    // jq('#cadastroPj #ddi2').mask('+99');
    //jq('.cep').mask('99999-999');
    //jq('.cpf').mask('999.999.999-99');
    //jq('.cod').mask('999');

    jq('.container select').live('change', function() {
        select = jq(this).find('option[value="' + jq(this).val() + '"]').html();
        jq(this).parent().find('.select-fake').text(select);
    });

    jq('.formCadastro .add_phone').click(function(ev) {
        ev.preventDefault();
        jq(this).fadeOut();
        jq('.duplica_phone').fadeIn();
    });

    // jq('#area-cliente li.submenu').append('<em></em>');

    /* FAVORITAS */
    jq('#destaques li .favoritar').click(function(event) {
        event.preventDefault();
        jq(this).toggleClass('active');
    });

    /* CLASSIFICADOS SIDEBAR */
    jq('#classificados ul li a').click(function() {
        quantUl = jq(this).parent().find('ul').length;
        if (quantUl >= 1) {
            jq(this).parent().find('ul').first().slideToggle('slow');
            jq(this).find('em').toggleClass('active');
        }
    });

    /* CLASSIFICADOS */

    jq('#destaques li a strong').each(function() {
        quantText = jq(this).height();
        if (quantText > 40) {
            jq(this).parent().addClass('small');
        }
        ;
    });

    jq('#box-gallery .prev').click(function(ev) {
        ev.preventDefault();
        var galeryUL = jq(this).parents('#box-gallery').find('ul');
        galeryUL.parent().scrollTo('-=' + (galeryUL.find('li').eq(2).outerHeight(true) * 4), 750);
    });
    jq('#box-gallery .next').click(function(ev) {
        ev.preventDefault();
        var galeryUL = jq(this).parents('#box-gallery').find('ul');
        galeryUL.parent().scrollTo('+=' + (galeryUL.find('li').eq(2).outerHeight(true) * 4), 750);
    });

    /* ANUNCIE */
    jq('.page-anunciando #main .steps-left ul li').click(function() {
        var foto_destaque = 'Featured photo';
        if (IDIOMA === 'pt')
            foto_destaque = 'Foto destaque';
        elementoSelect = jq('.page-anunciando #main .steps-left ul li.selected');
        jq(elementoSelect).removeClass('selected');
        jq('.page-anunciando #main .steps-left ul li p').remove();
        jq(this).addClass('selected');
        jq(this).append('<p>' + foto_destaque + '</p>');
    });

    jq('#sortableAnuncio li').click(function() {
        //   aplicarDestaqueNaThumb(jq(this));
    });

    jq('.page-detalhe #destaques li').last().addClass('last')
    jq('.box-fotos ul li .close').click(function() {
        jq(this).parent().remove();
    });

    jq('.parent-add .add input').change(function() {
        if (this.checked == true) {
            jq(this).parent().parent().find('select,.select-fake').fadeOut(1, function() {
                jq(this).parent().find('.adionando').fadeIn();
            });
        } else {
            jq(this).parent().parent().find('.adionando').fadeOut(1, function() {
                jq(this).parent().find('.select-fake').fadeIn();
                jq(this).parent().find('select').animate({opacity: 0}, 100);
                jq(this).parent().find('select').fadeIn().css({opacity: 0});
            });
        }
    });

    jq('.combo input[type="radio"]').change(function() {
        if (this.id == 'consulte') {
            jq(this).parent().find('#valor').attr('disabled', 'disabled');
        } else if (this.id == 'estofado-nao' || this.id == 'pintura-nao') {
            jq(this).parent().find('select').attr('disabled', 'disabled');
            jq(this).parent().find('.select-fake').addClass('disabled');
        } else if (this.id == 'estofado-sim' || this.id == 'pintura-sim') {
            jq(this).parent().find('select').removeAttr('disabled');
            jq(this).parent().find('.select-fake').removeClass('disabled');
        } else {
            jq(this).parent().find('#valor').removeAttr('disabled');
        }
    });
    //jq('.page-anunciando #main .steps1').height(jq('.page-anunciando #main .steps1').height() - 640);
    //jq('.page-anunciando #main .steps1').css('margin-bottom', '654px');

    /* CAROUSEL TABELA -- OPINIOES DE ANUNCIANTES -- */
    jq('.abas-plano #box-opnioes .gallery ul').each(function() {
        var listChilds = jq(this).find('li');
        var width = 0;
        listChilds.each(function() {
            width += jq(this).outerWidth(true);
        });
        jq(this).width(width);
    })
    jq('.abas-plano #box-opnioes .prev').click(function(ev) {
        ev.preventDefault();
        var galeryUL = jq(this).parents('#box-opnioes').find('ul');
        galeryUL.parent().scrollTo('-=' + (galeryUL.find('li').first().outerWidth(true) * 1), 750);
    });
    jq('.abas-plano #box-opnioes .next').click(function(ev) {
        ev.preventDefault();
        var galeryUL = jq(this).parents('#box-opnioes').find('ul');
        galeryUL.parent().scrollTo('+=' + (galeryUL.find('li').first().outerWidth(true) * 1), 750);
    });

    /* AEROPORTOS */
    jq('.other-products .box').each(function() {
        temitem = jq(this).find('.img').length
        if (temitem == 0) {
            jq(this).find('.descrip').addClass('full')
        }
    });

    /* CAROUSEL ANUNCIE DETALHE */
    jq('#box-carousel .gallery ul').each(function() {
        var listChilds = jq(this).find('li');
        var width = 0;
        listChilds.each(function() {
            width += jq(this).outerWidth(true);
        });
        jq(this).width(width);
    });

    /* ANUNCIE DETALHE */
    // jq('.animate-tel').click(function() {
    //     if(jq(this).hasClass('active')){
    //         jq(this).addClass('active');
    //         tel = jq(this).attr('rel');
    //         jq(this).find('span').text(tel);    
    //         jq(this).parent().find('p.title').fadeIn();
    //     } else {
    //         jq(this).parent().find('p.title').fadeOut();
    //     }
    // });

    // jq('.animate-tel').mouseover(function() {
    //     jq(this).find("div").show();
    // });
    // jq('.animate-tel').mouseleave(function() {
    //     jq(this).find("div").hide();
    // });


    jq('.info-anuncio .dados-form form input, .info-anuncio .dados-form form textarea, .dados-form form .submitFake').click(function() {
        jq('.submitFake').hide();
        jq(this).parent().parent().find('.more').click(function() {
            var teste = jq(this).hasClass('down');
            if (teste = 'down') {
                jq('.submitFake').show();
                //jq('#formEnvia').validationEngine('hideAll');
                jq(this).parent().find('fieldset ').fadeOut('fast');
                jq(this).parent().animate({height: '200px'}, {duration: 300});
                jq(this).removeClass('down');
            }
        });
        //jq(this).parent().parent().animate({height: '415px'}, {duration: 200});
        jq(this).parent().parent().animate({height: '350px'}, {duration: 200});
        jq(this).parent().find('fieldset ').fadeIn();
        jq(this).parent().parent().find('.more').toggleClass('down');
    });


    jq('#fancy-email').click(function() {
        jq('#box-email').fadeIn('fast');
        jq('#box-email .close').click(function() {
            jq('#box-email').fadeOut('fast');
        });
    });

    /* MAPA */
    jq('ul#map li a').click(function() {
        var nameEstado = jq(this).attr('rel');
        var idUf = jq(this).attr('data-id');
        var estado = jq(this).attr('title');
        if (!jq(this).hasClass('disable')) {
            var _this = jq(this).hasClass('selected');
            var elem = jq('#todos-estados ul li a[rel="' + nameEstado + '"]');
            var elemForm = jq('.page-vendedores #estados-selecionados form .submit');
            if (_this) {
                //bicca
                jq(this).removeClass('selected');
                elem.removeClass('selected');
                jq(".page-vendedores #estados-selecionados form input.arrayUf").val(jq(".page-vendedores #estados-selecionados form input.arrayUf").val().replace("," + idUf, ""));
                jq('form#formEstados ul li.sel' + idUf + '').remove();
            } else {
                jq(this).addClass('selected');
                elem.addClass('selected');
                var estadosAtuais = jq('.arrayUf').val();
                var s = estadosAtuais;
                if (s.indexOf(idUf) == -1) {
                    elemForm.before('<li class="sel' + idUf + '">' + estado + '</li>')
                    estadosAtuais += ',' + idUf;
                }
                jq('.arrayUf').val(estadosAtuais);
                //elemForm.before('<input type="checkbox" name="estados[]" value="'+estado+'" class="hiddenEstados" />');
            }
            var qtd = elemForm.parent().find('.estados').length;
            if (qtd > 0) {
                jq('#estados-selecionados form #qtd-estados').attr('checked', 'checked');
            } else {
                jq('#estados-selecionados form #qtd-estados').removeAttr('checked');
            }
        }
    });

    jq('.resetFormBuscaVendedor').click(function() {
        jq('input.arrayUf').val('');
        jq('form#formEstados ul li').remove();
        jq('.page-vendedores #estados-selecionados form input.arrayUf').val('');
    });

    jq('#todos-estados ul li a').click(function() {
        var nameEstado = jq(this).attr('rel');
        var estado = jq(this).attr('title');
        var idUf = jq(this).attr('data-id');
        if (!jq(this).hasClass('disable')) {
            var _this = jq(this).hasClass('selected');
            var elem = jq('ul#map li a[rel="' + nameEstado + '"]');
            var elemForm = jq('.page-vendedores #estados-selecionados form .submit');
            if (_this) {
                jq(this).removeClass('selected');
                elem.removeClass('selected');
                elemForm.parent().find('#' + nameEstado).remove();
            } else {
                jq(this).addClass('selected');
                elem.addClass('selected');
                var estadosAtuais = jq('.arrayUf').val();
                var s = estadosAtuais;
                if (s.indexOf(idUf) == -1) {
                    elemForm.before('<li>' + estado + '</li>')
                    estadosAtuais += ',' + idUf;
                }
                jq('.arrayUf').val(estadosAtuais);
            }
            var qtd = elemForm.parent().find('.estados').length;
            if (qtd > 0) {
                jq('#estados-selecionados form #qtd-estados').attr('checked', 'checked');
            } else {
                jq('#estados-selecionados form #qtd-estados').removeAttr('checked');
            }
        }
    });

    jq('.page-vendedores #estados-selecionados form .reset').click(function() {
        jq(this).parent().find('.estados').remove();
        jq('ul#map li a.selected').removeClass('selected');
        jq('#todos-estados ul li a.selected').removeClass('selected');
        jq('#estados-selecionados form #qtd-estados').removeAttr('checked');
    });

    jq('.formCadastroEmpregos .radio').change(function() {
        function itensDisable() {
            jq('.formCadastroEmpregos .checkbox, .formCadastroEmpregos #outra-profissao').attr('disabled', 'disabled');
        }
        if (jq(this).attr('id') == 'comandante') {
            itensDisable();
            jq(this).parent().find('.checkbox').removeAttr('disabled');
        } else if (jq(this).attr('id') == 'co-piloto') {
            itensDisable();
            jq(this).parent().find('.checkbox').removeAttr('disabled');
        } else if (jq(this).attr('id') == 'outra') {
            itensDisable();
            jq(this).parent().find('#outra-profissao').removeAttr('disabled');
        } else if (jq(this).attr('id') == 'mecanico') {
            itensDisable();
        }
    });

    jq('#formCadastroCurriculo .box-atual').change(function() {
        if (this.checked == true) {
            jq(this).parent().parent().find('.select-date select').attr('disabled', 'disabled');
            jq(this).parent().parent().find('.select-date .select-fake').addClass('disabled');
        } else {
            jq(this).parent().parent().find('.select-date select').removeAttr('disabled');
            jq(this).parent().parent().find('.select-date .select-fake').removeClass('disabled');
        }
    });

    jq('.ate_momento').live('change', function() {
        if (this.checked == true) {
            jq(this).parent().parent().find('.select-date select').attr('disabled', 'disabled');
            jq(this).parent().parent().find('.select-date .select-fake').addClass('disabled');
        } else {
            jq(this).parent().parent().find('.select-date select').removeAttr('disabled');
            jq(this).parent().parent().find('.select-date .select-fake').removeClass('disabled');
        }
    });

    if (jq('.info-anuncio .dados-telefone>a').length <= 2) {
        jq('.info-anuncio .dados-telefone>a').addClass('half')
    }

    jq(window).trigger('resize');

    /*
     jq("#formEnvia").validationEngine('attach', {
     promptPosition: "topRight",
     scroll: false,
     onValidationComplete: function(form, status) {
     if (status == true) {
     jq('#formEnvia input[type="submit"]').attr('disabled', 'disabled');
     jq('#formEnvia input[type="submit"]').val('Aguarde..');
     jq('#formEnvia').submit();
     }
     }
     });*/

    jq("#formEnvia").validationEngine({
        promptPosition: "topRight",
        scroll: false
    });

    jq('#formEnvia input[type="submit"]').live('click', function() {

        var valid = jq("#formEnvia").validationEngine('validate');

        if (valid == true) {

            //disable submit button
            jq('#formEnvia input[type="submit"]').attr('disabled', 'disabled');
            jq('#formEnvia input[type="submit"]').val('Aguarde ...');
            jq('#formEnvia').submit();

        } else {
            jq("#formEnvia").validationEngine();
        }
    });

    /*
     jq("#formEnvia").validationEngine('attach', {
     promptPosition: "topRight",
     scroll: false,
     onValidationComplete: function(form, status) {
     if (status == true) {
     jq('#formEnvia input[type="submit"]').attr('disabled', 'disabled');
     jq('#formEnvia input[type="submit"]').val('Aguarde ..');
     jq('#formEnvia').submit();
     } else {
     jq('#formEnvia input[type="submit"]').removeAttr('disabled');
     jq('#formEnvia input[type="submit"]').val('Enviar');
     }
     }
     });
     */

    htmlInicial = jq('#groupAeronaves').html();

    jq("#btAddAeronave").click(function() {
        jq("#maisAeronaves").append(htmlInicial);
        var count = -1;
        jq('.fieldset-tipo-aeronave').each(function() {
            count++;
        });
        jq('.fieldset-tipo-aeronave:last').find('input[type="radio"]').each(function() {
            jq(this).attr('name', 'tipo-aeronave[' + count + ']');
        });
        jq('.select-fabricante:last').parent().find('.select-fake:first').html('');
        jq('.select-modelo:last').parent().find('.select-fake:first').html('');
        jq('.select-categoria:last').parent().find('.select-fake:first').html('');
        jq('.hidden-fabricante:last').val('');
    });

    jq('.close-maisAeronaves').live('click', function() {
        jq(this).parent().remove();
    });

    jq("#btAddExperiencia").click(function() {
        jq("#maisExperiencias").append('<p class="sepAeronave">&nbsp;</p>');
        jq("#maisExperiencias").append(jq('#groupExperiencia').html());

        var count = -1;
        jq('.ate_momento').each(function() {
            count++;
        });
        jq('.ate_momento:last').attr('name', 'ate_momento[' + count + ']');
        jq('.fim_dia:last').attr('name', 'fim_dia[' + count + ']');
        jq('.fim_mes:last').attr('name', 'fim_mes[' + count + ']');
        jq('.fim_ano:last').attr('name', 'fim_ano[' + count + ']');

        jq('.inicio_dia:last').parent().find('.select-fake:first').html('');
        jq('.inicio_mes:last').parent().find('.select-fake:first').html('');
        jq('.inicio_ano:last').parent().find('.select-fake:first').html('');

        jq('.fim_dia:last').removeAttr('disabled');
        jq('.fim_dia:last').parent().find('.select-fake:first').html('').removeClass('disabled');
        jq('.fim_mes:last').removeAttr('disabled');
        jq('.fim_mes:last').parent().find('.select-fake:first').html('').removeClass('disabled');
        jq('.fim_ano:last').removeAttr('disabled');
        jq('.fim_ano:last').parent().find('.select-fake:first').html('').removeClass('disabled');
    });


});

jq(window).bind("load", function() {
    setTimeout(function() {
        jq('#tabs').fadeIn(500);
    }, 400);
});

jq(window).resize(function() {
    wwidth = jq(window).width();
    wheight = jq(window).height();

    jq('#wrap').css('min-height', wheight - jq('#footer').innerHeight());
});

function aplicarDestaqueNaThumb(cmp) {
    var foto_destaque = 'Featured photo';
    if (IDIOMA === 'pt')
        foto_destaque = 'Foto destaque';
    elementoSelect = jq('#sortableAnuncio li.selected');

    jq(elementoSelect).removeClass('selected')
    jq('#sortableAnuncio li p').remove();
    cmp.addClass('selected');
    cmp.append('<p>' + foto_destaque + '</p>');
}