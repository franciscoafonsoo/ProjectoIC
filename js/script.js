$(function(){

	// criar variaveis para refeicao

	if(!sessionStorage.getItem('refeicao')) {
		sessionStorage.setItem('refeicao', JSON.stringify({items: []}))
		sessionStorage.setItem('total', JSON.stringify({total: 0}))
		$('#pedido').html('<i class="shop icon"></i>Meu Pedido: 0€')
	}
	else {
		var already = JSON.parse(sessionStorage.getItem('refeicao'))
		var conta = JSON.parse(sessionStorage.getItem('total'))

		jQuery.each(already.items, function (index, item) {
			// load table
			$('.ui.huge.table').append('<tr><td>' + item.name + '</td>><td>' + item.price + '</td></tr>')
			$('#total').text(conta.total + '€')
			$('#pedido').html('<i class="shop icon"></i>Meu Pedido: ' + conta.total + '€')
		})
	}

})

function pulse(unique) {

	// animaçãos
	$("#" + unique).transition('pulse')

	// parse da info necessaria
	var already = JSON.parse(sessionStorage.getItem('refeicao'))
	var conta 	= JSON.parse(sessionStorage.getItem('total'))
	var name 	= $("#" + unique).find(".thirteen.wide.column").html()
	var price	= $("#" + unique).find(".right.aligned.column").html()
	var extra = $("#" + unique).find("p").html()
	var imagem = $("#" + unique).find(".ui.large.fluid.image").attr("src")

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