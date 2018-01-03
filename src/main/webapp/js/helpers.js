var formatMoney = function(valor) {
		var valorAsNumber = Number(valor);
		return 'R$ ' + valorAsNumber.toMoney(2,',','.');
	};

	Number.prototype.toMoney = function(decimals, decimal_sep, thousands_sep) {
		var n = this,
		c = isNaN(decimals) ? 2 : Math.abs(decimals),
		d = decimal_sep || '.', 
		t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		sign = (n < 0) ? '-' : '',
		i = parseInt(n = Math.abs(n).toFixed(c)) + '', 
		j = ((j = i.length) > 3) ? j % 3 : 0; 
		return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : ''); 
	};

	var areaToParams = function (area, params) {
		params = params || {};
		$("#" + area).find('input, select, textarea').each(function(){
			params[ $(this).attr('name') ] = $(this).val();
		});
	};

	var startsWith = function(data, input) {
		return data.substring(0, input.length) === input;
	}

function showMessage (text) {
	
	$.colorbox({
		html: "<h4>"+text+"<img src='../img/loader.gif' width='100px' height='100px'></img></h4>",
		transition: 'fade',
		width: '35%',
		height: '20%',
		close: false,
		escKey: false,
		overlayClose: false,
		fixed: true,
		scrolling: false
		
	});
	
};

function showOnlyMessage(text) {
	
	$.colorbox({
		html: "<h1>"+text+"</h1>",
		transition: 'fade',
		width: '30%',
		height: '20%',
		close: false,
		escKey: false,
		overlayClose: false,
		fixed: true
		
	});
	
};

function showLoading (text) {
	
	$.colorbox({
		html: "<h1>"+text+"</h1>",
		transition: 'none',
		close: false,
		escKey: false,
		overlayClose: false,
		fixed: true
	});
	
};

function showTransactionCode(code) {
	var html = ('<h1 class="success">'+code+'</h1>');
	$.colorbox({
		html: html,
		close: false,
		escKey: false,
		overlayClose: false,
		fixed: true
	});
};

function showWaitingPayment(paymentName) {
	var html = ('<h1 class="success">'+paymentName+'</h1>');
	$.colorbox({
		html: html,
		close: false,
		escKey: false,
		overlayClose: false,
		fixed: true
	});
	
};

function showPaymentErrors(errors) {
	
	if (typeof errors == 'object') {
		var errors = errors.error;
		var html = '<ul class="errors">';
		for (var i in errors) {
			var error = errors[i];
			html += ('<li>' + error.message + '</li>');
		}
		html += ('</ul>');
		$.colorbox({
			html: html,
			fixed: true
		});
	}
};

function showCardTokenErrors(errors) {
	if (typeof errors == 'object') {
		var html = '<ul class="errors">';
		for (i in errors) {
			html += ('<li>' + errors[i] + '</li>');
		}
		html += ('</ul>');
		$.colorbox({
			html: html,
			fixed: true
		});
	}
	
};

var hideMessages = function() {
	$.colorbox.close();
};