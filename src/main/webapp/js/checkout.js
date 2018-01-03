var MyApplication = window.MyApplication || {};
MyApplication.CheckoutPage = new function() {
	
	var hasSessionId = false; // Inicia sem sessionId
	$('#creditCardData').hide();
	$('#holderData').hide();
	$('#eftData').hide();
	$('#boletoData').hide();
	
	PagSeguroDirectPayment.getPaymentMethods({
	            success: function(response){ console.log(response); },
	            error: function(response){ console.log(response); },
	            complete: function(response){ console.log(response); }
	});
	
	
	var updateSessionId = function(callback) {
		showMessage("Criando sessão de pagamento... ");
		//Promise(resolve => setTimeout(resolve, 10000));
		$.ajax({
			url: "/user/getSession",
			type:"GET",
			cache: false,
			success: function(response) {
				console.log( response );
				PagSeguroDirectPayment.setSessionId(response);
				hasSessionId = true;
				cardBrandEvents();
				callback();
			},
			error: function() {
				console.log(" Não foi possível obter o Session ID do PagSeguro ");
			},
			complete: function() {
				hideMessages();
			}
		});
	};
	
	// Gerenciando bandeira do cartão
	var cardBrandEvents = function() {
		
		var verifyBrand = function() {
			// Obtendo apenas os 6 primeiros dígitos (bin)
			
			var cardBin = $("#cardNumber").val().substring(0, 6);
			var carNumber = $("#cardNumber").val();
			// Atualizar Brand apenas se tiver 6 ou mais dígitos preenchidos
			if (String(cardBin).length >= 6) {
				$.ajax({
					url: "/user/getCardBrand",
					type:"POST",
					data: {cardBin: carNumber},
					success: function(response) {
						$(".cardBrand").attr('brand', response);
						$("#creditCardBrand").val(response);
					},
					error: function(response) {
						console.log(" Erro ao obter bandeira" + response.error );
					},
				});
			} else {
				// Se não digitou o número do cartão, esconder parcelamento
				$("#installmentsWrapper").hide();
			}
		};
		// Verificar bandeira após qualquer mudança nos inputs de cartão de crédito
		$("#cardNumber").change(function(){
			verifyBrand();
		});
		// Verificar bandeira logo no início
		verifyBrand();
		
	};
	
	
	$("#itemAmount").change(function(){
		var valueSelected = $("#itemAmount").val();
		$('#valueSelected').append(valueSelected);
	});
	

	function sleep(ms) {
		  return new Promise(resolve => setTimeout(resolve, ms));
	}	
	
var updateCardBrand = function(cardBin) {
		var cardNumber = $("#cardNumber").val();
		PagSeguroDirectPayment.getBrand({
			
			success: function(response) {
				var brand = response.brand.name;
				$(".cardBrand").attr('brand', brand);
				$("#creditCardBrand").val(brand);
				//updateInstallments(brand);
			},
			error: function(response) {
				 console.log( response.brand );
			},
			complete: function(response) {
			}
		});
	};
	
var changeMethod = function(method) {
		showMessage("Estabelecendo conexão segura...");
		var showBox = function() {
			var allMethods = $(".paymentMethodGroup");
			var thisMethod = allMethods.filter("[dataMethod='"+method+"']");
			allMethods.hide();
			thisMethod.show();
			hideMessages()
		};
		
		if (hasSessionId) {
			showBox();
			hideMessages()
		} else {
			// obter sessioId se ainda não foi setado
			updateSessionId(showBox);
		}
		
	};
	
var updateCardToken = function(callback) {
		PagSeguroDirectPayment.createCardToken({
			cardNumber: $("#cardNumber").val(),
			brand: $("#creditCardBrand").val(),
			cvv: $("#cardCvv").val(),
			expirationMonth: $("#cardExpirationMonth").val(),
			expirationYear: $("#cardExpirationYear").val(),
			success: function(response) {
				
				// Obtendo token para pagamento com cartão
				var token = response.card.token;
				// Executando o callback (pagamento) passando o token como parâmetro
				callback(token);
			},
			
			error: function(response) {
				showCardTokenErrors(response.errors);
				console.log(response.errors);
			},
			complete: function(response) {
			}
		});
	};

	// Fazer pagamento de qualquer tipo
	var doPayment = function(params, callback) {
		// travando a tela (loading)
		showMessage("Efetuando pagamento...");
		// Adicionando dados do comprador aos parâmentros de pagamento
		areaToParams("holderData", params);
		// Adicionando dados dos items (carrinho) aos parâmetros de pagamento
		areaToParams("cartData", params);
		// Atualizando hash do comprador
		params.senderHash = PagSeguroDirectPayment.getSenderHash();
		
		// Request para o controller passando os dados do pagamento
		$.ajax({
			type:"POST",
			url: "/acquireCredits",
			data: JSON.stringify(params),
			contentType: "application/json",
			cache: false,
			success: function(response) {
				// Executa o callback passado como parâmentro
				callback(response.transaction);
				hideMessages();
				showMessage("Pagamento realizado<br> Seu paramento está: " + response.status + "<br> Código da transação: " + response.transaction);
				sleep(2000).then(() => {
					hideMessages();
				});
				
			},
			error: function(jqxhr) {
				// Liberando a tela (esconde o loading)
				hideMessages();
				// obtendo lista de erros
				var response = $.parseJSON(jqxhr.responseText);
				console.log("Erros " + response);
				// Exibindo lista de erros
				showPaymentErrors(response);
			}
		});
	};
	
	
	
	// Pagamento com cartão de crédito
	var creditCardPayment = function() {
		validations();
		showLoading();
		updateCardToken(function(cardToken) {
			// Atualizando field que deve conter o valor do token
			$("#creditCardToken").val(cardToken);
			
			var params = {
				paymentMethod: 'creditCard',
				creditCardToken: cardToken
			};
			// Adicionando dados do cartão de crédito aos parâmentros de pagamento
			areaToParams("creditCardData", params);
			// Fazer pagamento via cartão de crédito passando um callback a ser executado no final
			doPayment(params, function(transaction){
				// Aqui você tem o código da transação no final do pagamento
				showTransactionCode(transaction);
				
			});
		});
	};
	
	// Alerando tipo de meio de pagamento (cartão, boleto ou tef)
	var changeMethodEvents = function() {
		
		var radioInputs = $("input[name='changePaymentMethod']");
		radioInputs.click(function(){
			var method = $(this).val();
			changeMethod(method);
		});
		radioInputs.filter(":checked").trigger("click");
	};
	
	
	// Pagamento via cartão de crédito no click do "botão pagar"
	var creditCardPaymentEvents = function() {
		$("#creditCardPaymentButton").click(function(){
			creditCardPayment();
		});
	};
	
	
	// Adicionar dados do carrinho aos parâmetros de pagamento
	var addCartData = function(params) {
		
		$("#cartTable tbody tr").each(function(index, element){
			$(element).find("td").each(function(){
				if($(this).attr("data-name")) {
					if (startsWith($(this).attr("data-name"),"itemAmount")) {
						params[$(this).attr("data-name") + (index+1)] = $(this).html().replace(",",".");
					} else {
						params[$(this).attr("data-name") + (index+1)] = $(this).html();
					}
				}
			});
		});
		
	};
	
	// limpar dados do dono do cartão para preecher novo
	$("#otherHolder").click(function(){
		holderData.find("input").val('');
		holderData.show();
		$("#creditCardHolderBirthDate").focus();
	});
	
	// Verificar no início
	$("input[name='holderType']:checked").trigger('click');
	
	
	// Pagamento com TEF
	var eftEvents = function() {
		
		$(".bank-flag").click(function(){
			var bank = $(this).attr("dataBank");
			var params = {
				paymentMethod: 'eft',
				bankName: bank
			};
			doPayment(params, function(transaction){
				window.open(transaction.paymentLink);
				showWaitingPayment("Débito online");
			});
		});
		
	};
	
	
	// Pagamento com boleto
	var boletoEvents = function() {
		
		$("#boletoButton").click(function(){
			var params = {
				paymentMethod: 'boleto'
			};
			doPayment(params, function(transaction){
				window.open(transaction.paymentLink);
				showWaitingPayment("Pagamento com Boleto...");
			});
		});
		
	};
	
	
	// Aplicando eventos apenas quado o documento estiver pronto
	$(document).ready(function(){
		changeMethodEvents();
		//holderEvents();
		creditCardPaymentEvents();
		//installmentQuantityEvents();
		eftEvents();
		boletoEvents();
	});
	
	function validations(){

		var radioInputs = $("input[name='changePaymentMethod']:checked").val();
		var valid = true;
		if(radioInputs == "creditCard"){
			var allMethods = $("#cardData, #ownerData");
			$(allMethods).each(function(index, element){
				$(element).find("input").each(function(){
					if($(this).val() == "") {
						$(this).css("border","#8B0000 dotted 2px");
						$(this).css("background-color","#FF3E96");
						$(this).after("<div class='message'>Este campo é obrigatório</div>");
						$(this).focus(function() {
							$('.message').remove();;
						});
						valid = false;
					}
				});
				if($('#itemAmount').val() == "") {
					$('#itemAmount').css("border","#8B0000 dotted 2px");
					$('#itemAmount').css("background-color","#FF3E96");
					$('#itemAmount').prop('title', 'Este campo é obrigatório');
					$('#itemAmount').after("<div class='message'>Este campo é obrigatório</div>");
					$('#itemAmount').focus(function() {
						$( ".message" ).remove();
					});
					valid = false;
				}
				if (valid == false){
					return false;
				}
			});
				
		}
		
	}
	
	
}

	