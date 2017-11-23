Familia = function() {
    this.documentReady = function() {

        var path = new Path();
        var url = path.setPath();

        jq(document).ready(function() {
            jq('select.ordenacaoModelos').change(function() {

                jq('#main').append('<span class="wait-loading-modelo"></span>');

                var nomeFabricante = jq('#nomeFabricante').val();
                var idFabricante = jq('#idFabricante').val();
                var nomeModelo = jq('#nomeModelo').val();
                var nomeCategoria = jq('#nomeCategoria').val();
                var nomeFamilia = jq('#nomeFamilia').val();
                var selectValue = this.value;
                
                jq.post(url + 'pt/fabricantes/ordenacao-familia',
                        {
                            nomeFabricante: nomeFabricante,
                            idFabricante: idFabricante,
                            nomeModelo: nomeModelo,
                            nomeFamilia: nomeFamilia,
                            nomeCategoria: nomeCategoria,
                            ordenacao: selectValue
                        },
                function(data) {
                    jq('div.busca-res').fadeIn('fast').remove();
                    jq('#main').append(data);
                })
                        .done(function() {

                        })
                        .fail(function() {
                            alert("Error");
                        })
                        .always(function() {
                            jq('span.wait-loading-modelo').remove();
                        });

            });
        });

    }
}