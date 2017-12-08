function gettypes() {
	var typeselected= $("#tipo option:selected").val();
    
	$.ajax({
		url : "/user/newfeature/"+typeselected,
		type : "POST",
		data: typeselected,
		success : function(response) {
			
			$('#anunciomarca').empty();
			$('#anunciomarca').append($('<option>', {
			    value: 0,
			    text:  'Selecione a marca'
			}));
			
			for (item in response) {
				$('#anunciomarca').append($('<option>', {
				    value: response[item].id,
				    text:  response[item].marca
				}));
			}
		},
		error : function(e) {
			alert("Submit failed" + JSON.stringify(e));
		}
	});
}

function getmodels() {
	var typeselected= $("#anunciomarca option:selected").val();
    
	$.ajax({
		url : "/user/model/"+typeselected,
		type : "POST",
		data: typeselected,
		success : function(response) {
			$('#modelos').empty();
			$('#modelos').append($('<option>', {
			    value: 0,
			    text:  'Selecione o modelo'
			}));
			
			for (item in response) {
				$('#modelos').append($('<option>', {
				    value: response[item].id,
				    text:  response[item].modelo
				}));
			}
		},
		error : function(e) {
			alert("Submit failed" + JSON.stringify(e));
		}
	});
}

function getanos() {
	var yearselected= $("#modelos option:selected").val();
    
	$.ajax({
		url : "/user/year/"+yearselected,
		type : "POST",
		data: yearselected,
		success : function(response) {
			$('#anos').empty();
			$('#anos').append($('<option>', {
			    value: 0,
			    text:  'Selecione o ano'
			}));
			
			for (item in response) {
				$('#anos').append($('<option>', {
				    value: response[item].id,
				    text:  response[item].ano
				}));
			}
		},
		error : function(e) {
			alert("Submit failed" + JSON.stringify(e));
		}
	});
}

function getvalor() {
	var valueselected= $("#anos option:selected").val();
	var typeselected= $("#tipo option:selected").val();
	$.ajax({
		url : "/user/valor/"+valueselected,
		type : "POST",
		data: valueselected,
		success : function(response) {
			if (typeselected == "1"){
				$('#optionCaminhao').show();
			}
			$('#valorfipe').text(response.valor);
			$('#labelvalor').show();
			
		},
		error : function(e) {
			alert("Submit failed" + JSON.stringify(e));
		}
	});
}