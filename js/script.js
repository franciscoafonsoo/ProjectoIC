$(function() {
	/*
	1. Começar pedido. Começa em qualquer página.

		- Verificar se existe a chave 'refeicao' na sessionStorage.
			- Se simm: Obtem e faz update aos valores na página
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
		// iterar sobre o array refeicao
		jQuery.each(already.items, function (index, item) {
			// calcular os precos
			var newprice = item.price * item.qty
			// colocar somente os items ainda nao pedidos
			if(item.status == 0) {
				// linha html do pedido || id
				var cenas = '<tr class="' + item.identify
					// nome
					+ '"><td>' + item.name
					// quantidade
					+ '</td>><td class="center aligned">' + item.qty
					// remover
					+ '</td><td class="center aligned"><i style="margin-left:0;" id="' + item.identify
					+ '" class="remove red icon" onClick="remove(this.id)"></i></td>'
					// preço
					+ '<td class="center aligned">' + newprice
					+ '€</td></tr>'
			}
			// adicionar à tabela
			$('.ui.huge.table').append(cenas)
			// adicionar preco total
			$('#total').html('<b>' + conta.total + '€</b>')
			// adicionar preco ao butao pedido
			$('#pedido').html('<i class="shop icon"></i>Meu Pedido: ' + conta.total + '€')
		})
	}

	$('.ui.right.labeled.icon.teal.fluid.button').click( function () {
		// get refeicoes
		var already = JSON.parse(sessionStorage.getItem('refeicao'))
		// change pedido status
		var modify; var nomes = {};
		jQuery.each(already.items, function (index, item) {
			// preco actualizado
			var newprice = item.price * item.qty
			// mudar pedido status
			if (item.status == 0) {
				// update qty
				item.status = 1
				// get it go get table line
				modify = item.identify
				// linha do pedido (sem remover)
				var cenas = '<tr class="' + item.identify
					// nome
					+ '"><td>' + item.name
					// quantidade
					+ '</td>><td class="center aligned">' + item.qty
					// remover
					+ '</td><td class="center aligned"><i style="margin-left:0;" id="' + item.identify
					// preco
					+ '"><div class="ui active teal small progress"><div class="bar"></div></div>'
					+ '</i></td><td class="center aligned">' + newprice + '€</td></tr>'
				$('#progresso').append(cenas)
				$("." + item.identify).remove()
			}

			sessionStorage.setItem('refeicao', JSON.stringify(already))
		})
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
	var usar = already.id[already.id.length - 1]
	// por info necessaria no modal
	$('#contentProduto').html(name)
	$('#contentProduto').append('<p id="contentPreco" class="alignright">' + price + '€</p>')
	$('#contentConstituintes').html(extra)
	$('#contentImagem').attr('src', "" + imagem)

	$('#algo').modal({
		onApprove : function() {
			// control variable and qty
			// get table line to be modified
			var control = 0; var quantity = 1; var modify
			// verificar se já existe
			jQuery.each(already.items, function (index, item) {
				if (item.name == name && item.status == 0) {
					// found same item and get quantify for table
					control = 1; quantity = item.qty
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
					// linha pedido modificada
					var grande = '<tr class="' + modify
						// nome
						+'"><td>' + name
						// quantidade
						+ '</td>><td class="center aligned">' + item.qty
						// remover
						+ '</td><td class="center aligned"><i style="margin-left:0;" id="'
						+ modify + '" class="remove red icon" onClick="remove(this.id)"></i></td>'
						// preco
						+ '<td class="center aligned">' + newprice
						+ '€</td></tr>'
					// modificar a linha "onplace"
					modify = $("." + modify).replaceWith(grande)
				}
			})
			// verificar se já existia um item ou não
			if (control == 0) {
				already.items.push({
					name: name,
					price: price,
					qty: quantity,
					status: 0,
					identify: usar
				})
				// parse do valor
				conta.total += parseFloat(price)
				// valor só com duas casas decimais
				conta.total.toFixed(3)
				// linha a adicionar à tabela
				var newprice = price.slice(0,-1) * quantity

				var grande = '<tr class="' + usar
				// nome e quantidade
				+'"><td>' + name + '</td>><td class="center aligned">' + 1
				// remover
				+ '</td><td class="center aligned"><i style="margin-left:0;" id="' + usar
				+ '" class="remove red icon" onClick="remove(this.id)"></i></td>' +
				// preco
				'<td class="center aligned">' + newprice
				+ '€</td></tr>'

				// update table	& pedido
				$('.ui.huge.table').append(grande)
			}

			// guarda item no sessionStorage
			sessionStorage.setItem('refeicao', JSON.stringify(already))
			sessionStorage.setItem('total', JSON.stringify(conta))

			$('#total').html('<b>' + conta.total + '€</b>')
			$('#pedido').html('<i class="shop icon"></i>Meu Pedido: ' + conta.total + '€')
	  }
	}).modal('show')
}

function remove(unique) {
	// parse da info necessaria
	var already = JSON.parse(sessionStorage.getItem('refeicao'))
	var conta 	= JSON.parse(sessionStorage.getItem('total'))
	// remover item
	$("." + unique).remove()
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
	var min = 0; var max = 10000
	min = Math.ceil(min)
	max = Math.floor(max)
	//The maximum is exclusive and the minimum is inclusive
	var temp = Math.floor(Math.random() * (max - min)) + min

	while(jQuery.inArray(temp,list) != -1) {
		// se for igual, repetir. isto deve evitar alguma colisão que surja.
		temp = Math.floor(Math.random() * (max - min)) + min
	}
	list.push(temp); return list
}
