
function enviar (){

var nome = $("#nome").val();
var telefone = $("#telefone").val();

$.ajax({
  url: "/caduser",
  type: "POST",
  data: {
	  nome:nome,
	  telefone:telefone
  }
}).success(function(result) {
  alert(result);
}).error(function(result) {
  alert("deu erro");
  $("#erro").show();
  
});
}