var Mpy = Mpy || {};
var URL = window.location.protocol + "//" + window.location.host + "/pt/";
var jq = jq || $;

var TERMOS, NASC_INVALIDO;

if (window.IDIOMA && IDIOMA === 'pt') {
    TERMOS = 'Você precisa aceitar os Termos de uso para prosseguir com o cadastro.';
    NASC_INVALIDO = 'A data de nascimento informada não é válida.';
} else {
    TERMOS = 'You have to accept the Terms of Service to proceed with the registration.';
    NASC_INVALIDO = 'The informed birth date is not valid.';
}

function favoritosAction(idAnuncio, enumTipoAnuncio) {

    pathArray = window.location.href.split( '../../external.html?link=http://www.flightmarket.com.br/' );
    language = pathArray[3];

    jq('span.msgToUser').remove();

    jq.ajax({
        type: "POST",
        url: URL + 'usuarios/favoritar',
        data: {
            idanuncio: idAnuncio,
            tipoanuncio: enumTipoAnuncio
        },
        success: function (data) {
            var href = jq(location).attr('href');
            var arrayUrl = href.split('../../external.html?link=http://www.flightmarket.com.br/');

            if (data == 'fail') {
                if (arrayUrl[5] != '' && arrayUrl[6] != '' && arrayUrl[7] && arrayUrl[8] != '') {
                    if(language == 'pt') {
                        jq('div#share').prepend('<span class="msgToUser">Faça login ou cadastre-se para usar essa função.</span>');
                    } else if(language == 'en') {
                        jq('div#share').prepend('<span class="msgToUser">Sign in or register to use this feature.</span>');
                    }
                    jq('span.msgToUser').delay(2500).fadeOut();
                }
                if (arrayUrl[4] == 'perfil') {
                    if(language == 'pt') {
                        jq('div#share').prepend('<span class="msgToUser">Faça login ou cadastre-se para usar essa função.</span>');
                    } else if(language == 'en') {
                        jq('div#share').prepend('<span class="msgToUser">Sign in or register to use this feature.</span>');
                    }
                    jq('span.msgToUser').delay(2500).fadeOut();
                }
            } else {
                if (arrayUrl[5] != '' && arrayUrl[6] != '' && arrayUrl[7] && arrayUrl[8] != '') {
                    if (jq("#share #add-favorito .icon").hasClass("iconOn")) {
                        jq('#share #add-favorito .icon').removeClass('iconOn');
                    } else {
                        jq('#share #add-favorito .icon').addClass('iconOn');
                    }
                }
                if (arrayUrl[4] == 'perfil') {
                    if (jq("#share #add-favorito .icon").hasClass("iconOn")) {
                        jq('#share #add-favorito .icon').removeClass('iconOn');
                    } else {
                        jq('#share #add-favorito .icon').addClass('iconOn');
                    }
                }
            }
        }
    });
}

function setTextOnFakeCombo(idForm, idCombo) { //seta o texto do combo estilizado na div de classe select-fake
    var combo_val = jq('#' + idForm + ' #' + idCombo).val();
    var combo_txt = jq('#' + idForm + ' #' + idCombo).find('option[value="' + combo_val + '"]').html();
    jq('#' + idForm + ' #' + idCombo).parent().find('.select-fake').text(combo_txt);
}

function mostraCamposTextoEstadoCidade(idForm) {
    jq('#' + idForm + ' label[for="estado"]').parent().css('display', 'block');
    jq('#' + idForm + ' label[for="cidade"]').parent().css('display', 'block');
    jq('#' + idForm + ' label[for="estado_pj"]').parent().css('display', 'block');
    jq('#' + idForm + ' label[for="cidade_pj"]').parent().css('display', 'block');

    jq('#' + idForm + ' label[for="cidades_id"]').parent().css('display', 'none');
    jq('#' + idForm + ' label[for="estados_id"]').parent().css('display', 'none');
    jq('#' + idForm + ' label[for="cidades_id_pj"]').parent().css('display', 'none');
    jq('#' + idForm + ' label[for="estados_id_pj"]').parent().css('display', 'none');

    /*
     jq('#' + idForm + ' #estado').attr('class', 'validate[required]');
     jq('#' + idForm + ' #cidade').attr('class', 'validate[required]');
     jq('#' + idForm + ' #estado_pj').attr('class', 'validate[required]');
     jq('#' + idForm + ' #cidade_pj').attr('class', 'validate[required]');
     */
 }

 function mostraSelectEstadoCidade(idForm) {
    //se existe um combo com id paises_id e o valor dele é 1 (brasil)
    if ((jq('#' + idForm + ' #paises_id')[0] && jq('#' + idForm + ' #paises_id').val() == 1) ||
        (jq('#' + idForm + ' #paises_id_pj')[0] && jq('#' + idForm + ' #paises_id_pj').val() == 1)
        )
    {
        setTextOnFakeCombo(idForm, 'estados_id');
        setTextOnFakeCombo(idForm, 'estados_id_pj');
        setTextOnFakeCombo(idForm, 'cidades_id');
        setTextOnFakeCombo(idForm, 'cidades_id_pj');

        jq('#' + idForm + ' label[for="estados_id"]').parent().css('display', 'block');
        jq('#' + idForm + ' label[for="cidades_id"]').parent().css('display', 'block');
        jq('#' + idForm + ' label[for="estados_id_pj"]').parent().css('display', 'block');
        jq('#' + idForm + ' label[for="cidades_id_pj"]').parent().css('display', 'block');

        jq('#' + idForm + ' label[for="cidade"]').parent().css('display', 'none');
        jq('#' + idForm + ' label[for="estado"]').parent().css('display', 'none');
        jq('#' + idForm + ' label[for="cidade_pj"]').parent().css('display', 'none');
        jq('#' + idForm + ' label[for="estado_pj"]').parent().css('display', 'none');

        //  if (!jq('#' + idForm + ' #ddi').val())
        //     jq('#' + idForm + ' #ddi').val('+55');

        //   jq('#' + idForm + ' #ddi').attr('readonly', 'readonly');

        jq('#' + idForm + ' #cidade').val('');
        jq('#' + idForm + ' #estado').val('');
        jq('#' + idForm + ' #cidade_pj').val('');
        jq('#' + idForm + ' #estado_pj').val('');
        /*
         jq('#' + idForm + ' #estado').removeClass('validate[required]');
         jq('#' + idForm + ' #cidade').removeClass('validate[required]');
         jq('#' + idForm + ' #estado_pj').removeClass('validate[required]');
         jq('#' + idForm + ' #cidade_pj').removeClass('validate[required]');
         */
     } else {
        // jq('#' + idForm + ' #ddi').removeAttr('readonly');
        mostraCamposTextoEstadoCidade(idForm);
    }
}

function mostraComboEstadoCidade(idForm) {
    jq('#' + idForm + ' label[for="estado"]').parent().css('display', 'none');
    jq('#' + idForm + ' label[for="cidade"]').parent().css('display', 'none');
    jq('#' + idForm + ' label[for="estado_pj"]').parent().css('display', 'none');
    jq('#' + idForm + ' label[for="cidade_pj"]').parent().css('display', 'none');

    jq('#' + idForm + ' label[for="cidades_id"]').parent().css('display', 'block');
    jq('#' + idForm + ' label[for="estados_id"]').parent().css('display', 'block');
    jq('#' + idForm + ' label[for="cidades_id_pj"]').parent().css('display', 'block');
    jq('#' + idForm + ' label[for="estados_id_pj"]').parent().css('display', 'block');
}

function adicionarEventosCategoria(adicionarImediatamente) {

    if (adicionarImediatamente === 'aviao') {
        adicionaCategoriasAviao();
        return;
    }
    if (adicionarImediatamente === 'helicoptero') {
        adicionaCategoriasHelicoptero();
        return;
    }
    jq('#radio-aviao').change(function () {
        adicionaCategoriasAviao();
        jq('#combo-fabricante option').remove();
        jq('#combo-fabricante').parent().find('.select-fake').text('Selecione uma categoria');
        jq('#combo-modelo option').remove();
        jq('#combo-modelo').parent().find('.select-fake').text('Selecione um fabricante');
    });

    jq('#radio-helicoptero').change(function () {
        adicionaCategoriasHelicoptero();
        jq('#combo-fabricante option').remove();
        jq('#combo-fabricante').parent().find('.select-fake').text('Selecione uma categoria');
        jq('#combo-modelo option').remove();
        jq('#combo-modelo').parent().find('.select-fake').text('Selecione um fabricante');
    });
}

function adicionaCategoriasHelicoptero(combo) {
    if (!combo) {
        combo = '#combo-categoria';
    }
    jq(combo).html('');
    if (IDIOMA === 'pt')
    {
        jq(combo).append('<option value="">Selecione</option>');
        jq(combo).append('<option value="1">Turbina</option>');
        jq(combo).append('<option value="2">Pistão</option>');
        jq(combo).append('<option value="3">Experimental</option>');
        jq(combo).parent().find('.select-fake').text('Selecione');
    }
    else
    {
        jq(combo).append('<option value="">Select</option>');
        jq(combo).append('<option value="1">Turbine</option>');
        jq(combo).append('<option value="2">Piston</option>');
        jq(combo).append('<option value="3">Experimental</option>');
        jq(combo).parent().find('.select-fake').text('Select');
    }
}
function adicionaCategoriasAviao(combo) {
    if (!combo) {
        combo = '#combo-categoria';
    }
    jq(combo).html('');
    if (IDIOMA === 'pt')
    {
        jq(combo).append('<option value="">Selecione</option>');
        jq(combo).append('<option value="4">Jato</option>');
        jq(combo).append('<option value="5">Turboélice</option>');
        jq(combo).append('<option value="6">Bimotor a pistão</option>');
        jq(combo).append('<option value="7">Monomotor a pistão</option>');
        jq(combo).append('<option value="8">Agrícola</option>');
        jq(combo).append('<option value="9">Planador</option>');
        jq(combo).append('<option value="10">Experimental ou ultraleve</option>');
        jq(combo).parent().find('.select-fake').text('Selecione');
    }
    else {
        jq(combo).append('<option value="">Select</option>');
        jq(combo).append('<option value="4">Jet</option>');
        jq(combo).append('<option value="5">Turboprop</option>');
        jq(combo).append('<option value="6">Piston multi engine</option>');
        jq(combo).append('<option value="7">Piston single engine</option>');
        jq(combo).append('<option value="8">Agricultural</option>');
        jq(combo).append('<option value="9">Glider</option>');
        jq(combo).append('<option value="10">Experimental or ultralight</option>');
        jq(combo).parent().find('.select-fake').text('Select');
    }
}

Mpy.Json = function () {
    this.jsonToOption = function (json) {
        if (typeof json === "string")
            json = eval(json);
        var options = "";
        for (var i in json) {
            var txt = json[i].cidade ? json[i].cidade : json[i].estado;
            options += "<option value=\"" + json[i].id + "\">" + txt + "</option>";
        }
        return options;
    };

    this.jsonModelosToOption = function (json) {
        if (typeof json === "string")
            json = eval(json);
        var options = "";
        for (var i in json) {
            options += "<option value=\"" + json[i].id + "\">" + json[i].nome + "</option>";
        }
        return options;
    };

    this.jsonModelosToOptionCms = function (json) {
        if (typeof json === "string")
            json = eval(json);
        var options = "";
        options += "<option value='0'>Todos</option>";
        for (var i in json) {
            options += "<option value=\"" + json[i].idModelo + "\">" + json[i].nomeModelo + "</option>";
        }
        return options;
    };

    this.jsonCepToFields = function (idForm, json) {
        var Cep = {
            NaoEncontrado: 0,
            CepCompleto: 1,
            SomenteCidade: 2
        };
        if (json.resultado == Cep.NaoEncontrado) {
            return;
        }
        ;
        var form = new Mpy.Formularios();
        if (json.resultado == Cep.SomenteCidade) {
            var cidade = json.cidade;
            var uf = json.uf;
            var uf_id = getIdByUf(uf);
            form.carregaCidadeEEstado(idForm, uf_id, cidade);
            jq('#' + idForm + ' #endereco').val('');
            jq('#' + idForm + ' #bairro').val('');
            jq('#' + idForm + ' #endereco_pj').val('');
            jq('#' + idForm + ' #bairro_pj').val('');
            return;
        }
        var cidade = json.cidade;
        var uf = json.uf;
        var uf_id = getIdByUf(uf);
        form.carregaCidadeEEstado(idForm, uf_id, cidade);
        var endereco = json.tipo_logradouro + " " + json.logradouro;
        var bairro = json.bairro;
        jq('#' + idForm + ' #endereco').val(endereco);
        jq('#' + idForm + ' #bairro').val(bairro);
        jq('#' + idForm + ' #endereco_pj').val(endereco);
        jq('#' + idForm + ' #bairro_pj').val(bairro);
        jq('#' + idForm + ' #ddi').val('55');
        jq('#' + idForm + ' #ddi2').val('55');
        jq('#' + idForm + ' #ddi_celular').val('55');
    }
};

Mpy.Ajax = function () {
    this.requestCidades = function (idEstado, callback) {
        var url = URL + "cidades/getcidades/" + idEstado;
        request(url, callback);
    };

    this.requestIdCidade = function (callback) {
        var url = URL + "cidades/getcidadebyuser";
        request(url, callback);
    };

    this.requestEstados = function (callback) {
        var url = URL + "estados/getestados";
        request(url, callback);
    };

    this.requestCep = function (cep, callback) {
        cep = filtrarSomenteNumeros(cep);
        var url = "../../external.html?link=http://cep.republicavirtual.com.br/web_cep.php?cep=" + cep + "&formato=json";
        request(url, callback);
    };

    this.requestModelos = function (idFabricante, callback) {
        var url = URL + "anunciar-aeronave/getmodelos/" + idFabricante;
        request(url, callback);
    };

    this.requestModelosCms = function (idFabricante, callback) {
        var url = URL + "anunciar-aeronave/getmodeloscms/" + idFabricante;
        request(url, callback);
    };

    this.requestFabricanteByModeloId = function (idModelo, callback) {
        var url = URL + "anunciar-aeronave/getfabricante/" + idModelo;
        request(url, callback);
    };

    this.requestCupom = function (cupom, callback) {
        var url = URL + "cupons/validarcupom/" + cupom;
        request(url, callback);
    };

    this.requestClickTelefone = function (idAnuncio, tipoAnuncio, callback) {
        var url = URL + "anuncio/clicktelefone" + tipoAnuncio + "/" + idAnuncio;
        request(url, callback);
    };

    this.requestFotosAeronaves = function (id, callback) {
        var url = URL + "perfil/getfotosaeronave/" + id;
        request(url, callback);
    };

    this.requestExcluirIntencao = function (id, callback) {
        var url = URL + "usuarios/excluirintencao/" + id;
        request(url, callback);
    };

    this.requestModelosDisponiveis = function (idFabricante, tipoAeronave, callback) {
        if (tipoAeronave) {
            var url = URL + "busca/get-modelos-disponiveis/" + idFabricante + "/" + tipoAeronave;
        } else {
            var url = URL + "busca/get-modelos-disponiveis/" + idFabricante;
        }
        request(url, callback);
    };

    this.requestFabricantesDisponiveis = function (idCategoria, tipoAeronave, callback) {
        var url = URL + "busca/get-fabricantes-disponiveis/" + idCategoria + "/" + tipoAeronave;
        request(url, callback);
    };

    this.requestDefinirImagemDestaqueFromEditar = function (idFoto, callback) {
        var url = URL + "anunciar-aeronave/alterar-imagem-destaque-from-editar/" + idFoto;
        request(url, callback);
    };

    this.requestDefinirImagemDestaque = function (nomeimagem, callback) {
        var url = URL + "anunciar-aeronave/alterar-imagem-destaque/" + nomeimagem;
        request(url, callback);
    };

    this.requestDefinirImagemDestaquePeca = function (idFoto, callback) {
        var url = URL + "anunciar-pecas/alterar-imagem-destaque-from-editar/" + idFoto;
        request(url, callback);
    };

    this.requestDefinirImagemDestaqueHangar = function (idFoto, callback) {
        var url = URL + "anunciar-hangar/alterar-imagem-destaque-from-editar/" + idFoto;
        request(url, callback);
    };

    this.requestDefinirImagemDestaqueServico = function (idFoto, callback) {
        var url = URL + "anunciar-servicos/alterar-imagem-destaque-from-editar/" + idFoto;
        request(url, callback);
    };

    this.requestDesativarAnuncioAeronave = function (idAnuncio, callback) {
        var url = URL + "usuarios/desativar-anuncio-aeronave/" + idAnuncio;
        request(url, callback);
    };

    this.requestExcluirAnuncioEmprego = function (idAnuncio, callback) {
        var url = URL + "usuarios/excluir-anuncio-emprego/" + idAnuncio;
        request(url, callback);
    };

    this.requestDesativarAnuncioPeca = function (idAnuncio, callback) {
        var url = URL + "usuarios/excluir-anuncio-peca/" + idAnuncio;
        request(url, callback);
    };

    this.requestDesativarAnuncioServico = function (idAnuncio, callback) {
        var url = URL + "usuarios/excluir-anuncio-servico/" + idAnuncio;
        request(url, callback);
    };

    this.requestDesativarAnuncioHangar = function (idAnuncio, callback) {
        var url = URL + "usuarios/excluir-anuncio-hangar/" + idAnuncio;
        request(url, callback);
    };

    function request(url, callback) {
        jq.get(url, function (data) {
            callback(data);
        });
    }
};

Mpy.CalculoCupom = function (callback) {
    //valor do anuncio
    this.valor = 0;
    //valor do desconto
    this.valordesconto = 0;
    //valor final do anuncio
    this.valorfinal = 0;
    this.cupomValido = false;
    this.cupom = null;
    this.valordestaque = 0;

    this.setValorDestaque = function (valor) {
        this.valordestaque = valor;
    };
    this.getValorDestaque = function () {
        return this.valordestaque;
    };
    this.getValorAnuncio = function () {
        return this.valor;
    };
    this.getValorDesconto = function () {
        return this.valordesconto;
    };
    this.getValorFinalDoAnuncio = function () {
        return this.valorfinal;
    };
    this.isCupomValido = function () {
        return this.cupomValido;
    };
    this.getCupom = function () {
        return this.cupom;
    }

    var ajax = new Mpy.Ajax();
    var instance = this;
    this.validarCupom = function (cupom, valorAnuncio) {
        this.cupom = cupom;
        this.valor = valorAnuncio;
        ajax.requestCupom(cupom, function (data) {
            if (!cupom)
                return;
            var desconto = 0;
            var json = eval(data);
            if (json[0].id != 0) {
                desconto = json[0].desconto;
                if (json[0].porcentagem != 0)
                    desconto = json[0].desconto + '%';
                jq('#codigo').css('background', 'url("' + URL + '../images/success-icon.png") no-repeat 510px 6px');
                instance.cupomValido = true;
            } else {
                desconto = 0;
                this.valordesconto = desconto;
                jq('#codigo').css('background', 'url("' + URL + '../images/error-icon.png") no-repeat 510px 6px');
                instance.cupomValido = false;
            }
            instance.updateValorAnuncio(valorAnuncio, desconto, callback);
        });
    };
    this.updateValorAnuncio = function (valorAnuncio, desconto, callback) {
        var valor = valorAnuncio;
        var valorfinal = valor + this.valordestaque;
        var valordesconto = desconto;
        if (valordesconto && valordesconto.toString().indexOf('%') != -1) {
            var tmp = valordesconto;
            valordesconto = parseFloat(valordesconto.replace('%', ''));
            valorfinal -= ((valorfinal * valordesconto) / 100);
            valordesconto = tmp;
        } else if (valordesconto) {
            valorfinal -= valordesconto;
        }

        valordesconto = valordesconto || '';
        valordesconto = valordesconto.toString();
        valorfinal = valorfinal.toString();
        valor = valor.toString();

        var patt = new RegExp(/[0-9]+/g);
        var cents_valor = valor.match(patt);
        var cents_valorfinal = valorfinal.match(patt);
        var cents_valordesconto = valordesconto.match(patt);

        if (cents_valor.length > 1)
            cents_valor[1] = cents_valor[1].substring(0, 2);
        if (cents_valorfinal.length > 1)
            cents_valorfinal[1] = cents_valorfinal[1].substring(0, 2);
        if (cents_valordesconto && cents_valordesconto.length > 1)
            cents_valordesconto[1] = cents_valordesconto[1].substring(0, 2);

        if (cents_valor.length > 1 && cents_valor[1].length < 2)
            valor = cents_valor[0] + ',' + cents_valor[1] + '0';

        if (cents_valorfinal.length > 1 && cents_valorfinal[1].length < 2)
            valorfinal = cents_valorfinal[0] + ',' + cents_valorfinal[1] + '0';
        else if (cents_valorfinal.length > 1)
            valorfinal = cents_valorfinal[0] + ',' + cents_valorfinal[1];

        if (cents_valordesconto && cents_valordesconto.length > 1 && cents_valordesconto[1].length < 2)
            valordesconto = cents_valordesconto[0] + ',' + cents_valordesconto[1] + '0';

        if (valordesconto && valordesconto.toString().indexOf('%') == -1)
            valordesconto = 'R$ ' + valordesconto;

        valorfinal = 'R$ ' + valorfinal;
        valor = 'R$ ' + valor;
        this.valordestaque = 'R$ ' + this.valordestaque + ',00';
        //valor do anuncio
        this.valor = valor;
        //valor do desconto
        this.valordesconto = valordesconto;
        //valor final do anuncio
        this.valorfinal = valorfinal;
        if (typeof callback === 'function')
            callback(instance);
    };
}

function gerarListaOptionAnos() {
    var ano = new Date().getFullYear();
    var selecione = IDIOMA === 'pt' ? 'Selecione' : 'Select a year';

    var options = '<option value="">' + selecione + '</option>';
    for (ano; ano >= 1900; ano--) {
        options += '<option value="' + ano + '">' + ano + '</option>';
    }
    return options;
}

function filtrarSomenteNumeros(val) {
    var pattern = new RegExp(/[0-9]+/g);
    val = val.match(pattern);
    var numeros = "";
    for (var i in val) {
        numeros += val[i];
    }
    return numeros;
}

Mpy.Validacao = function () {

    this.validarCadastroPf = function () {
        return validaNascimento();
    };

    function validaNascimento() {
        var nasc = jq('#nascimento').val();
        if (!nasc)
            return true; //retorna true pra deixar o validationEngine validar o campo vazio
        nasc = nasc.split("../../external.html?link=http://www.flightmarket.com.br/");
        var dia, mes, ano;
        if (IDIOMA === 'pt') {
            dia = nasc[0];
            mes = nasc[1];
            ano = nasc[2];
        } else {
            dia = nasc[1];
            mes = nasc[0];
            ano = nasc[2];
        }
        if (!(dia <= 31 && mes <= 12 && ano <= 2010 && ano >= 1900)) {
            alert(NASC_INVALIDO);
            return false;
        } else {
            return true;
        }
    }
};

Mpy.CidadeEstado = function () {
    var me = this;
    this.getCidades = function (idEstado, idForm, callback) {
        var ajax = new Mpy.Ajax();

        //se nao recebeu uma funcao no parametro callback, define um callback padrão
        callback = callback || function (data) {

            var mpyJson = new Mpy.Json();
            var options = mpyJson.jsonToOption(data);

            if (options !== "") {
                jq('#' + idForm + ' #cidades_id').html(options);
                jq('#' + idForm + ' #cidades_id_pj').html(options);
            }

            setTextOnFakeCombo(idForm, 'cidades_id');
            setTextOnFakeCombo(idForm, 'cidades_id_pj');
            //se está editando cadastro, carrega a cidade do usuario no combo:
            if (jq('.page-conta')[0] || jq('#cms-editar-usuario')[0])
            {
                var callback2 = function (data) {
                    if (typeof data === 'string')
                        data = eval(data);
                    if (data[0].cidade) {
                        jq('#' + idForm + ' #cidades_id').val(data[0].cidade);
                        jq('#' + idForm + ' #cidades_id_pj').val(data[0].cidade);
                        setTextOnFakeCombo(idForm, 'cidades_id');
                        setTextOnFakeCombo(idForm, 'cidades_id_pj');
                    }
                };
                ajax.requestIdCidade(callback2);
            }

        }; //fim callback padrão

        ajax.requestCidades(idEstado, callback);
    };

    this.getEstados = function (idPais, idForm, carregarCidades, idEstado) {
        if (carregarCidades == undefined)
            carregarCidades = false; //carregar cidades do primeiro estado ao carregar os estados
        idPais = parseInt(idPais);
        if (idPais !== 1) { // 1 equivale a Brasil
            mostraCamposTextoEstadoCidade(idForm);
            return;
        }
        mostraSelectEstadoCidade(idForm);
        var ajax = new Mpy.Ajax();
        var callback = function (data) {
            var mpyJson = new Mpy.Json();
            var options = '<option value="">Selecione</option>';
            options += mpyJson.jsonToOption(data);

            if (options !== "") {
                jq('#' + idForm + ' #estados_id').html(options);
                jq('#' + idForm + ' #estados_id_pj').html(options);
            }
            if (idEstado) {
                jq('#' + idForm + ' #estados_id').val(idEstado);
                jq('#' + idForm + ' #estados_id_pj').val(idEstado);
            }
            setTextOnFakeCombo(idForm, 'estados_id');
            setTextOnFakeCombo(idForm, 'estados_id_pj');

            if (carregarCidades)
                me.getCidades('1', idForm);
        };
        ajax.requestEstados(callback);
    };
};

jq(document).ready(function () {
    //se está na pagina de edição de dados da conta, ou pagina de cadastro 
    if (jq('#cadastroPf')[0] || jq('#cadastroPj')[0])
    {
        if (jq('#cms-editar-usuario')[0])
            return;
        frm = new Mpy.Formularios();
        frm.preparaFormCadastro();
        //  ajustaCamposDdiEDdd();
    }

    jq('.motivoDesativacao').click(function() {
        if (jq(this).val() == 'Outro motivo') {
            jq('.containerOutroMotivo').fadeIn();
        } else {    
            jq('.containerOutroMotivo').hide();
        }
    });

    jq('form#formContainerPequisaDesativacao').validationEngine({
        promptPosition: "topLeft",
        scroll: true,
        onValidationComplete: function (form, status) {
            if (status === true) {

                var serializeArray = jq( form ).serializeArray();
                
                jq.post("/send-pesquisa-desativacao", serializeArray, function (data) {


                }).done(function(data) {

                    jq.fancybox.close();

                });

            } else {
                return false;
            }

        }
    });

});

function addLabelDescFone() {
    if (IDIOMA === 'pt') {
        jq('#cadastroPj #telefone').parent().parent().append('<div class="descTelefone">(DDD) (Número)</div>');
        //jq('#cadastroPj #telefone2').parent().parent().append('<div class="descTelefone">(DDD) (Número)</div>');
        jq('#telefone_pj').parent().parent().append('<div class="descTelefone">(DDD) (Número)</div>');
        jq('#cadastroPf #telefone').parent().parent().append('<div class="descTelefone">(DDD) (Número)</div>');
    }
    jq('#cadastroPj #celular').parent().parent().append('<div class="descTelefone">&nbsp;</div>');
    jq('#cadastroPf #celular').parent().parent().append('<div class="descTelefone">&nbsp;</div>');
}

function ajustaCamposDdiEDdd() {
    /*  jq('#cadastroPj #telefone').parent().prepend(jq('#cadastroPj #ddd'));
     jq('#cadastroPj #telefone').parent().prepend(jq('#cadastroPj #ddi'));
     jq('#cadastroPj #telefone2').parent().prepend(jq('#cadastroPj #ddd2'));
     jq('#cadastroPj #telefone2').parent().prepend(jq('#cadastroPj #ddi2'));
     jq('#cadastroPj .ddipj').remove();
     jq('#cadastroPj .dddpj').remove();
     jq('#cadastroPj .ddi2pj').remove();
     jq('#cadastroPj .ddd2pj').remove();
     
     jq('#cadastroPf #telefone').parent().prepend(jq('#cadastroPf #ddd'));
     jq('#cadastroPf #telefone').parent().prepend(jq('#cadastroPf #ddi'));
     jq('#cadastroPf .ddipf').remove();
     jq('#cadastroPf .dddpf').remove();*/
 }

 function getIdByUf(uf) {
    switch (uf) {
        case "AC":
        return 1;
        case "AL":
        return 2;
        case "AP":
        return 3;
        case "AM":
        return 4;
        case "BA":
        return 5;
        case "CE":
        return 6;
        case "DF":
        return 7;
        case "ES":
        return 8;
        case "GO":
        return 9;
        case "MA":
        return 10;
        case "MT":
        return 11;
        case "MS":
        return 12;
        case "MG":
        return 13;
        case "PA":
        return 14;
        case "PB":
        return 15;
        case "PR":
        return 16;
        case "PE":
        return 17;
        case "PI":
        return 18;
        case "RJ":
        return 19;
        case "RN":
        return 20;
        case "RS":
        return 21;
        case "RO":
        return 22;
        case "RR":
        return 23;
        case "SC":
        return 24;
        case "SP":
        return 25;
        case "SE":
        return 26;
        case "TO":
        return 27;
        default:
        return false;
    }
}

function posicionaInputFileFotos() {
    var top = jq('#btn-add-foto').offset().top;
    var left = jq('#btn-add-foto').offset().left;
    //toma o label do campo site como referencia
    jq('#imageform #file').css('top', (top + 20) + 'px');
    jq('#imageform #file').css('left', (left - 430) + 'px');
}

function posicionaInputFileFotoPj() {
    if (jq('#site')[0]) {
        var top = jq('#site').offset().top;
        var left = jq('#site').offset().left;

        jq('#imageform').css('top', (top - 370) + 'px');
        jq('#imageform').css('left', (left - 680) + 'px');
    }
}

function desativarAeronave(id, tipo_anuncio) {

    
	if (tipo_anuncio === 'emprego') {
        var confirmar = "Are you sure you want to Delete this ad?";
        if (IDIOMA === 'pt')
            confirmar = "Tem certeza que deseja Excluir este anúncio?";
    } else {
        var confirmar = "Are you sure you want to disable this ad?";
        if (IDIOMA === 'pt')
            confirmar = "Tem certeza que deseja desativar este anúncio?";
    }
	
	if (confirm(confirmar) == true) {

		jq.fancybox({
		   'autoScale': true,
		   'transitionIn': 'elastic',
		   'transitionOut': 'elastic',
		   'speedIn': 500,
		   'speedOut': 300,
		   'autoDimensions': true,
		   'centerOnScroll': true,
		   'href' : '#contentdivDesativarAnuncio'+id,
		   'onClosed' : function() {

				var ajax = new Mpy.Ajax();
			var callback = function (data) {
				var msg = "Error disabling your ad.";
				if (IDIOMA === 'pt')
					var msg = "Erro ao desativar seu anúncio.";

				if (typeof data === 'string')
					data = eval(data);

				if (!data) {
					alert(msg);
				} else {
					jq('#li-' + tipo_anuncio + '-' + id).css('display', 'none');
				}
			};
			
			ajax.requestDesativarAnuncioAeronave(id, callback);

			window.location.reload();

		   }
	   });
   
	} else {
		return false;
	}

    
}

function desativar(id, tipo_anuncio) {
    if (tipo_anuncio === 'emprego') {
        var confirmar = "Are you sure you want to Delete this ad?";
        if (IDIOMA === 'pt')
            confirmar = "Tem certeza que deseja Excluir este anúncio?";
    } else {
        var confirmar = "Are you sure you want to disable this ad?";
        if (IDIOMA === 'pt')
            confirmar = "Tem certeza que deseja desativar este anúncio?";
    }

    if (confirm(confirmar)) {
        var ajax = new Mpy.Ajax();
        var callback = function (data) {
            var msg = "Error disabling your ad.";
            if (IDIOMA === 'pt')
                var msg = "Erro ao desativar seu anúncio.";

            if (typeof data === 'string')
                data = eval(data);

            if (!data) {
                alert(msg);
            } else {
                jq('#li-' + tipo_anuncio + '-' + id).css('display', 'none');
            }
        };
        if (tipo_anuncio === 'aeronave')
            ajax.requestDesativarAnuncioAeronave(id, callback);
        if (tipo_anuncio === 'peca')
            ajax.requestDesativarAnuncioPeca(id, callback);
        if (tipo_anuncio === 'emprego')
            ajax.requestExcluirAnuncioEmprego(id, callback);
        if (tipo_anuncio === 'servico')
            ajax.requestDesativarAnuncioServico(id, callback);
        if (tipo_anuncio === 'hangar')
            ajax.requestDesativarAnuncioHangar(id, callback);

    }
}