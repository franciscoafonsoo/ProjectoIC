$(function(){

	/*
	1. Começar pedido. Começa em qualquer página (modificar para "nova refeição" soon)

		- Verificar se existe a chave 'refeicao' na sessionStorage.
			- Se sim: Obtem e faz update aos valores na página
			- Se não: Cria os valores e guarda em sessionStorage
 	*/

	if(!sessionStorage.getItem('refeicao')) {
		sessionStorage.setItem('refeicao', JSON.stringify({items: []}))
		sessionStorage.setItem('total', JSON.stringify({total: 0}))
		$('#pedido').html('<i class="shop icon"></i>Meu Pedido: 0€')
	}
	else {
		var already = JSON.parse(sessionStorage.getItem('refeicao'))
		var conta 	= JSON.parse(sessionStorage.getItem('total'))

		jQuery.each(already.items, function (index, item) {
			// load table
			$('.ui.huge.table').append('<tr><td>' + item.name + '</td>><td>' + item.price + '</td></tr>')
			$('#total').text(conta.total + '€')
			$('#pedido').html('<i class="shop icon"></i>Meu Pedido: ' + conta.total + '€')
		})
	}

	setTimeout(function() { 
		if (already.items.length > 0)
			$('#cancelar').transition('fade')
	}, 2000)

	$('#pagamento').click( function () {
		$('#pmodal').modal('show')
	})

	$('#dinheiro').click( function () {
		window.location.href = "../pagamento/dinheiro.html";
	})

	$('#mbway').click( function () {
		window.location.href = "../pagamento/mbway.html";
	})

	$('#multibanco').click( function () {
		window.location.href = "../pagamento/multibanco.html";
	})

	$('#transferencia').click( function () {
		window.location.href = "../pagamento/transferencia.html";
	})
})

function pulse(unique) {

	/*
	2. Adicionar ao Carrinho:

		- Parse da informação existente na sessionStorage
		- Parse da informação da div clicada
			- nome, preço, img src.
		- Colocar a informação necessária no modal
		- Se aprovar:
			- Incrementar total do pedido
			- Adicionar entrada à sessionStorage
			- Fazer update às tabelas e ao pedido
 	*/

	// animação da div
	$("#" + unique).transition('pulse')

	// parse da info necessaria
	var already = JSON.parse(sessionStorage.getItem('refeicao'))
	var conta 	= JSON.parse(sessionStorage.getItem('total'))
	var name 	= $("#" + unique).find(".thirteen.wide.column").html()
	var price	= $("#" + unique).find(".right.aligned.column").html()
	var extra 	= $("#" + unique).find("p").html()
	var imagem 	= $("#" + unique).find(".ui.large.fluid.image").attr("src")

	// por info necessaria no modal
	$('#contentProduto').html(name);
	$('#contentPreco').html(price);
	$('#contentConstituintes').html(extra);
	$('#contentImagem').attr('src', "" + imagem);

	$('#algo').modal({
		onApprove : function() {
			// se confirmar, parse do valor
			conta.total += parseFloat(price.slice(0,-1))

			// adiciona os valores ao json
			already.items.push({
				name: name,
				price: price,
				qty: 1
			})

			// guarda item no sessionStorage
			sessionStorage.setItem('refeicao', JSON.stringify(already))
			sessionStorage.setItem('total', JSON.stringify(conta))

			// update table	& pedido
			$('.ui.huge.table').append('<tr><td>' + name + '</td>><td>' + price + '</td></tr>')
			$('#total').text(conta.total + '€')
			$('#pedido').html('<i class="shop icon"></i>Meu Pedido: ' + conta.total + '€')
	  }
	}).modal('show');
}