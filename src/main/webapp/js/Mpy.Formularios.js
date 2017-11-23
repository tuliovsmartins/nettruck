var Mpy = Mpy || {};
var URL = window.location.protocol + "//" + window.location.host + "/pt/";

//classe usada nos formularios de cadastro, dashboard e edicao vvia cms dos dados do usuario
Mpy.Formularios = function() {
    var me = this;
    var cidadeestado = new Mpy.CidadeEstado();

    this.bindChangeEvents = function() {
        jq('#cadastroPf #estados_id').change(function() {
            cidadeestado.getCidades(jq(this).val(), 'cadastroPf');
        });
        jq('#cadastroPj #estados_id_pj').change(function() {
            cidadeestado.getCidades(jq(this).val(), 'cadastroPj');
        });
        jq('#cadastroPf #paises_id').change(function() {
            setTextOnFakeCombo('cadastroPf', 'paises_id');
            cidadeestado.getEstados(jq(this).val(), 'cadastroPf');
            if (jq(this).val() == 1) //se pais for brasil
            {
                //   if (!jq('#cadastroPf #ddi').val())
                //     jq('#cadastroPf #ddi').val('+55');
                //jq('#cadastroPf #ddi').attr('readonly', 'readonly');
                jq('#cpf').attr('class', 'validate[required]');
                jq('.fieldcpf').css('display', 'block');
            }
            else
            {
                jq('#cpf').removeClass('validate[required]');
                jq('.fieldcpf').css('display', 'none');
                //  jq('#cadastroPf #ddi').val('');
                //  jq('#cadastroPf #ddi').removeAttr('readonly');
            }
        });
        jq('#cadastroPj #paises_id_pj').change(function() {
            setTextOnFakeCombo('cadastroPj', 'paises_id_pj');
            cidadeestado.getEstados(jq(this).val(), 'cadastroPj');
            if (jq(this).val() == 1) //se pais for brasil
            {
                //if (!jq('#cadastroPj #ddi').val())
                //  jq('#cadastroPj #ddi').val('+55');
                //jq('#cadastroPj #ddi').attr('readonly', 'readonly');
                jq('#cnpj').attr('class', 'validate[required]');
                jq('.fieldcnpj').css('display', 'block');
            }
            else
            {
                jq('#cnpj').removeClass('validate[required]');
                jq('.fieldcnpj').css('display', 'none');
                //    jq('#cadastroPj #ddi').val('');
                //   jq('#cadastroPj #ddi').removeAttr('readonly');
            }
        });
    };

    this.unbindChangeEvents = function() {
        jq('#cadastroPf #estados_id').unbind('change');
        jq('#cadastroPj #estados_id_pj').unbind('change');
        jq('#cadastroPf #paises_id').unbind('change');
        jq('#cadastroPj #paises_id_pj').unbind('change');
    };

    this.preparaFormCadastro = function() {

        me.bindChangeEvents();

        jq('.page-cadastre #cadastroPf').submit(function() {
            var valida = new Mpy.Validacao();
            if (!valida.validarCadastroPf())
                return false;

            if (!jq('#cadastroPf #termos').attr('checked')) {
                alert(TERMOS);
                return false;
            }
            /*
             if( jq('.fieldcpf').css('display') !== 'none' ) {
             if( ! validarCPF(jq('#cpf').val())) {
             alert("O CPF digitado não é válido.");
             }
             }*/

        });
        jq('.page-cadastre #cadastroPj').submit(function() {
            if (!jq('#cadastroPj #termos').attr('checked')) {
                alert(TERMOS);
                return false;
            }
            /*
             if( jq('.fieldcnpj').css('display') !== 'none' ) {
             if( ! validarCNPJ(jq('#cnpj').val())) {
             alert("O CNPJ digitado não é válido.");
             }
             }*/

        });

        cidadeestado.getCidades(jq('#estados_id').val(), 'cadastroPf'); //carrega lista de cidades ao carregar a pagina
        cidadeestado.getCidades(jq('#estados_id_pj').val(), 'cadastroPj'); //carrega lista de cidades ao carregar a pagina

        if (jq('#cadastroPj #paises_id_pj').val() != 1) // se possui o campo txt estado preenchido,
        {
            mostraCamposTextoEstadoCidade("cadastroPj");
        }
        if (jq('#cadastroPf #paises_id').val() != 1) // se possui o campo txt estado preenchido,
        {
            mostraCamposTextoEstadoCidade("cadastroPf");
        }

        //seta a primeira opção do combo ao caregar a pagina:
        jq('.container select').each(function() {
            select = jq(this).find('option[value="' + jq(this).val() + '"]').html();
            jq(this).parent().find('.select-fake').text(select);
        });

        jq('#cadastroPj #cep_pj').change(function() {
            var ajax = new Mpy.Ajax();
            var callback = function(data) {
                var mpyJson = new Mpy.Json();
                mpyJson.jsonCepToFields('cadastroPj', data);
                setTextOnFakeCombo('cadastroPj', 'paises_id_pj');
            };
            ajax.requestCep(jq(this).val(), callback);
        });
        jq('#cadastroPf #cep').change(function() {
            var ajax = new Mpy.Ajax();
            var callback = function(data) {
                var mpyJson = new Mpy.Json();
                mpyJson.jsonCepToFields('cadastroPf', data);
                setTextOnFakeCombo('cadastroPf', 'paises_id');
            };
            ajax.requestCep(jq(this).val(), callback);
        });

        jq('#cadastroPj #tipopessoa-fisica, #cadastroPf #tipopessoa-fisica').click(function() {
            jq('#cadastroPj').hide();
            jq('#imageform').hide();
            jq('#cadastroPf').fadeIn('normal');
            jq('#cadastroPf').append(jq('#pesquisa'));
            jq('#cadastroPf #tipopessoa-fisica').attr('checked', 'checked');
            jq('#cadastroPj #tipopessoa-fisica').attr('checked', 'checked');
        });

        jq('#cadastroPf #tipopessoa-juridica, #cadastroPj #tipopessoa-juridica').click(function() {
            jq('#cadastroPf').hide();
            jq('#cadastroPj').fadeIn('normal');
            jq('#imageform').fadeIn('normal');
            jq('#cadastroPj').append(jq('#pesquisa'));
            jq('#cadastroPj #tipopessoa-juridica').attr('checked', 'checked');
            jq('#cadastroPf #tipopessoa-juridica').attr('checked', 'checked');
            setTextOnFakeCombo('cadastroPj', 'paises_id_pj');
            posicionaInputFileLogoPj();
        });

        function posicionaInputFileLogoPj() {
            var top = jq('label[for="cep_pj"]').offset().top;
            var left = jq('label[for="cep_pj"]').offset().left;
            
            //toma o label do campo cep como referencia
            //jq('#imageform').css('top', top - 13 + 'px');
            //jq('#imageform').css('left', (left - 339) + 'px');
        }

        jq(window).resize(function() {
            posicionaInputFileLogoPj();
        });


        jq('#outros-motivos').change(function() {
            if (jq(this).attr('checked')) {
                jq('#outros-motivos-txt').css('visibility', 'visible');
            } else {
                jq('#outros-motivos-txt').css('visibility', 'hidden');
                jq('#outros-motivos-txt').val('');
            }
        });

        jq('input[name="conheceu"]').change(function() {
            if (jq(this).attr('id') === "outros-conheceu") {
                jq('#outros').css('visibility', 'visible');
            } else {
                jq('#outros').css('visibility', 'hidden');
                jq('#outros').val('');
            }
        });

        if (window.IDIOMA && IDIOMA === 'pt') {
            // jq('label[for="pjSobrenome"]').html('Sobrenome<em>*</em> <span class="desclabel">(não será exibido nos anúncios):</span>');
            jq('label[for="nascimento"]').html('Nascimento <em>*</em><span class="desclabel">(dd/mm/aaaa):</span>');
        } else if (window.IDIOMA && IDIOMA === 'en') {
            // jq('label[for="pjSobrenome"]').html('Last name<em>*</em> <span class="desclabel">(not shown in the ad):</span>');
            jq('label[for="nascimento"]').html('Birthdate <em>*</em> <span class="desclabel">(mm/dd/yyyy):</span>');
        }
        //-- Upper case em nome fantasia e razao social, nome e sobrenome
        /*    upperCase('nome_fantasia');
         upperCase('razao_social');
         upperCase('nome');
         upperCase('sobrenome');
         upperCase('pjNome');
         upperCase('pjSobrenome');*/

        function upperCase(idcampo) {
            jq('#' + idcampo).keypress(function() {
                jq(this).val(jq(this).val().toUpperCase());
            });
            jq('#' + idcampo).keyup(function() {
                jq(this).val(jq(this).val().toUpperCase());
            });
            jq('#' + idcampo).change(function() {
                jq(this).val(jq(this).val().toUpperCase());
            });
        }

        jq('#tipopessoa-fisica').attr('checked', 'checked');
    };

    this.carregaCidadeEEstado = function(idForm, uf_id, cidade) {
        me.unbindChangeEvents();
        jq('#' + idForm + ' #paises_id').val('1');
        jq('#' + idForm + ' #paises_id_pj').val('1');
        cidadeestado.getEstados("1", idForm, false, uf_id);
        var callback = function(data) {
            var mpyJson = new Mpy.Json();
            var options = mpyJson.jsonToOption(data);
            if (options !== "") {
                jq('#' + idForm + ' #cidades_id').html(options);
                jq('#' + idForm + ' #cidades_id_pj').html(options);
                jq('#cidades_id option').each(function() {
                    if (jq(this).html().toUpperCase() == cidade.toUpperCase()) {
                        jq('#cidades_id').val(jq(this).attr("value"));
                    }
                });
                jq('#cidades_id_pj option').each(function() {
                    if (jq(this).html().toUpperCase() == cidade.toUpperCase()) {
                        jq('#cidades_id_pj').val(jq(this).attr("value"));
                    }
                });
            }
            setTextOnFakeCombo(idForm, 'cidades_id');
            setTextOnFakeCombo(idForm, 'cidades_id_pj');
            me.bindChangeEvents();
        }
        cidadeestado.getCidades(uf_id, idForm, callback);
    };
    mostraSelectEstadoCidade('cadastroPf');
    mostraSelectEstadoCidade('cadastroPj');
}

function validarCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '')
        return false;

    if (cnpj.length != 14)
        return false;

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
        return false;

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
        return false;

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
        return false;

    return true;

}

function validarCPF(cpf) {

    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf == '')
        return false;

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
        return false;

    // Valida 1o digito
    add = 0;
    for (i = 0; i < 9; i ++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;

    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i ++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;

    return true;

}