$(function() {

	if(!sessionStorage.getItem('refeicao')) {
		sessionStorage.setItem('refeicao', JSON.stringify({items: [], id: []}))
		sessionStorage.setItem('total', JSON.stringify({total: 0}))
		$('#pedido').html('<i class="shop icon"></i>Meu Pedido: 0€')
	}
	else {
		/*
		* Insert missing lines in the table
		*/
		var already = JSON.parse(sessionStorage.getItem('refeicao'))
		var conta 	= JSON.parse(sessionStorage.getItem('total'))

		jQuery.each(already.items, function (index, item) {

			var newprice = item.price * item.qty

			if(item.status == 0) {
				// linha do pedido
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
					$('#remover').append(cenas)
			}
			else {
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
			}
			$('#rtotal').html('<b>' + conta.total + '€</b>')
			$('#ptotal').html('<b>' + conta.total + '€</b>')
			$('#pedido').html('<i class="shop icon"></i>Meu Pedido: ' + conta.total + '€')
		})
	}

	var temp = getProgressBars()

	function progresso() {
		$(temp[0]).progress('increment')
	}

	setInterval(progresso, 1000); // Time in milliseconds

	// popup de tipo de pagamento
	$('#pagamento').click( function () {
		$('#pmodal').modal('show')
	})

	// os vários redirects para as páginas nos botões do modal
	$('#dinheiro').click( function () {
		window.location.href = "../pagamento/dinheiro.html"
	})

	$('#mbway').click( function () {
		window.location.href = "../pagamento/mbway.html"
	})

	$('#multibanco').click( function () {
		window.location.href = "../pagamento/multibanco.html"
	})

	$('#bitcoin').click( function () {
		window.location.href = "../pagamento/bitcoin.html"
	})

	$('.ui.right.labeled.icon.teal.fluid.button').click( function () {
		// get refeicoes
		var already = JSON.parse(sessionStorage.getItem('refeicao'))
		// for each item
		jQuery.each(already.items, function (index, item) {
			// preco actualizado
			var newprice = item.price * item.qty
			// mudar pedido status
			if (item.status == 0) {
				//
				$("." + item.identify).remove()
				// update qty
				item.status = 1
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
			}

			sessionStorage.setItem('refeicao', JSON.stringify(already))
		})
	})

	// Obter as varias barras de progresso para incrementar o tempo do pedido
	function getProgressBars() {
		// obter items id's
		var consol = 0
		var already = JSON.parse(sessionStorage.getItem('refeicao')); var ids = []; var temp = [];
		jQuery.each(already.items, function (index, item) {
			if(item.status == 1) ids.push(item.identify)
		})
		jQuery.each(ids, function(index, item) {
			temp.push($('#' + item).children())
			})

	return temp
	}
})
