$(function(){

	/*
	1. Começar pedido. Começa em qualquer página.

		- Verificar se existe a chave 'refeicao' na sessionStorage.
			- Se sim: Obtem e faz update aos valores na página
			- Se não: Cria os valores e guarda em sessionStorage
 	*/

	if(!sessionStorage.getItem('refeicao')) {
		sessionStorage.setItem('refeicao', JSON.stringify({items: [], id: []}))
		sessionStorage.setItem('total', JSON.stringify({total: 0}))
		$('#pedido').html('<i class="shop icon"></i>Meu Pedido: 0€')
	}
	else {
		var already = JSON.parse(sessionStorage.getItem('refeicao'))
		var conta 	= JSON.parse(sessionStorage.getItem('total'))

		jQuery.each(already.items, function (index, item) {
			// insert missing lines in the table
			var newprice = item.price * item.qty
			var cenas = '<tr class="' + item.identify + '"><td>' + item.name + '</td>><td>' + item.qty + '</td><td><i id="' + item.identify + '" class="remove red icon" onClick="remove(this.id)"></i></td><td>' + newprice + '€</td></tr>'
			$('.ui.huge.table').append(cenas)
			$('#total').text(conta.total + '€')
			$('#pedido').html('<i class="shop icon"></i>Meu Pedido: ' + conta.total + '€')
		})
	}

	// popup de tipo de pagamento
	$('#pagamento').click( function () {
		$('#pmodal').modal('show')
	})

	// os vários redirects para as páginas nos botões do modal
	$('#dinheiro').click( function () {
		window.location.href = "../pagamento/dinheiro.html";
	})

	$('#mbway').click( function () {
		window.location.href = "../pagamento/mbway.html";
	})

	$('#multibanco').click( function () {
		window.location.href = "../pagamento/multibanco.html";
	})

	$('#bitcoin').click( function () {
		window.location.href = "../pagamento/bitcoin.html";
	})

	/* accordion on 'ajuda' */
	$('.ui.accordion').accordion()

	/* tab on 'refeiçoes' */
	$('.menu .item').tab()
})

function pulse(unique) {

	/*
	2. Adicionar ao Carrinho:

		- Parse da informação existente na sessionStorage
		- Parse da informação da div clicada
			- nome, preço, img src.
		- Colocar a informação necessária no modal
		- Se for aprovado:
			- Incrementar total do pedido
			- Adicionar entrada à sessionStorage
			- Fazer update às tabelas e ao pedido
 	*/

	// animação da div
	$("#" + unique).transition('pulse')

	// parse da info necessaria
	var already = JSON.parse(sessionStorage.getItem('refeicao'))
	var conta 	= JSON.parse(sessionStorage.getItem('total'))
	var name 	= $("#" + unique).find(".alignleft").html()
	var price	= $("#" + unique).find(".alignright").html().slice(0,-1)
	var extra 	= $("#" + unique).find("#extra").html()
	var imagem 	= $("#" + unique).find(".ui.large.fluid.image").attr("src")
	// geracao de um id unico e verificar se já existe um id igual
	already.id = getRandomInt(already.id)
	// id gerado alteriormente (ultimo a ser adiciona ao array)
	var usar = already.id[already.id.length - 1];

	// por info necessaria no modal
	$('#contentProduto').html(name);
	$('#contentProduto').append('<p id="contentPreco" class="alignright">' + price + '€</p>')
	$('#contentConstituintes').html(extra);
	$('#contentImagem').attr('src', "" + imagem);

	$('#algo').modal({
		onApprove : function() {
			// control variable and qty
			var control = 0
			var quantity = 1
			// get table line to be modified
			var modify
			// verificar se já existe
			jQuery.each(already.items, function (index, item) {
				if (item.name == name) {
					// found same item
					control = 1
					// get quantify for table
					quantity = item.qty
					// update qty
					item.qty = item.qty + 1
					// parse do valor
					conta.total += parseFloat(price)
					// valor só com duas casas decimais
					conta.total.toFixed(3)
					// get it go get table line
					modify = item.identify
					// update table
					var newprice = price * item.qty
					var grande = '<tr class="' + modify +'"><td>' + name + '</td>><td>' + item.qty + '</td><td><i id="' + modify + '" class="remove red icon" onClick="remove(this.id)"></i></td><td>' + newprice + '€</td></tr>'
					modify = $("." + modify).replaceWith(grande)
				}
			})
			// verificar se já existia um item ou não
			if (control == 0) {
				already.items.push({
					name: name,
					price: price,
					qty: quantity,
					identify: usar
				})
				// parse do valor
				conta.total += parseFloat(price)
				// valor só com duas casas decimais
				conta.total.toFixed(3)
				// linha a adicionar à tabela
				var newprice = price.slice(0,-1) * quantity
				var grande = '<tr class="' + usar +'"><td>' + name + '</td>><td>' + 1 + '</td><td><i id="' + usar + '" class="remove red icon" onClick="remove(this.id)"></i></td><td>' + newprice + '€</td></tr>'
				// update table	& pedido
				$('.ui.huge.table').append(grande)
			}

			// guarda item no sessionStorage
			sessionStorage.setItem('refeicao', JSON.stringify(already))
			sessionStorage.setItem('total', JSON.stringify(conta))

			$('#total').text(conta.total + '€')
			$('#pedido').html('<i class="shop icon"></i>Meu Pedido: ' + conta.total + '€')
	  }
	}).modal('show');
}

function remove(unique) {
	// parse da info necessaria
	var already = JSON.parse(sessionStorage.getItem('refeicao'))
	var conta 	= JSON.parse(sessionStorage.getItem('total'))
	// remover item
	$("." + unique).remove()
	// remove from id array
	
	// remover da lista
	jQuery.each(already.items, function (index, item) {
		if (item.identify == unique) {
			// update total
			conta.total -= parseFloat(item.price * item.qty)
			// valor só com duas casas decimais
			conta.total.toFixed(3)
			// remove element from array
			already.items.splice(index,1);
			
			// save to sessionStorage
			sessionStorage.setItem('refeicao', JSON.stringify(already))
			sessionStorage.setItem('total', JSON.stringify(conta))
			$('#total').text(conta.total + '€')
			$('#pedido').html('<i class="shop icon"></i>Meu Pedido: ' + conta.total + '€')
		}
	})
}

// função auxiliar para obter número pseudo-aleatório, não igual a nenhum no array dado.
function getRandomInt(list) {
	var min = 0
	var max = 10000
	min = Math.ceil(min)
	max = Math.floor(max)
	//The maximum is exclusive and the minimum is inclusive
	var temp = Math.floor(Math.random() * (max - min)) + min

	while(jQuery.inArray(temp,list) != -1) {
		// se for igual, repetir. isto deve evitar alguma colisão que surja.
		temp = Math.floor(Math.random() * (max - min)) + min
	}
	list.push(temp)
	return list
}