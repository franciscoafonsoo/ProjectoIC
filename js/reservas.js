$(function(){

	/*
	1. Começar pedido. Começa em qualquer página (modificar para "nova refeição" soon)

		- Verificar se existe a chave 'refeicao' na sessionStorage.
			- Se sim: Obtem e faz update aos valores na página
			- Se não: Cria os valores e guarda em sessionStorage
 	*/

	if(!localStorage.getItem('reservas')) {
		localStorage.setItem('reservas', JSON.stringify({items: []}))
		localStorage.setItem('id', JSON.stringify({total: 0}))
	}

	// Calendario

	$('#example2').calendar({
		type: 'date'
	})

	// Hora

	$('#example3').calendar({
		type: 'time'
	})

	// Form Reservas

	$('#efectuar').form({
		fields: {
			data: {
				identifier: 'data',
				rules: [
				{
					type   : 'empty',
					prompt : 'Por favor, escolha uma data.'
				}
				]
			},
			hora: {
				identifier: 'hora',
				rules: [
				{
					type   : 'empty',
					prompt : 'Por favor, escolha uma hora.'
				}
				]
			},
			pessoas: {
				identifier: 'pessoas',
				rules: [
				{
					type   : 'empty',
					prompt : 'Por favor, escolha um número de pessoas.'
				}
				]
			}
		}
	})

	// efectuar reserva e confirmar
	$('#confirmar').click( function () {
		if( $('#efectuar').form('is valid')) {

			var already = JSON.parse(localStorage.getItem('reservas'))
			var increm	= JSON.parse(localStorage.getItem('id'))

			increm.total++
			var data 		= document.getElementById("data").value
			var pessoas 	= document.getElementById("pessoas").value
			var hora 		= document.getElementById("hora").value
			var telemovel 	= document.getElementById("telemovel").value

			$('#contentData').text('Data da Reserva: ' + data)
			$('#contentHora').text('Hora da Reserva: ' + hora)
			$('#contentPessoas').text('Nº de Pessoas: ' + pessoas)
			$('#contentTelemovel').text('Nº de Telemóvel: ' + telemovel)

			already.items.push({
				id: increm.total, 
				data: data, 
				pessoas: pessoas, 
				hora: hora, telemovel: telemovel
			})

  			$('#cenas').modal({
  			  onApprove : function() {

  			  	// se confirmar os dados, guarda na localStorage
  			    localStorage.setItem('reservas', JSON.stringify(already))
  			    localStorage.setItem('id', JSON.stringify(increm))
  			    alert('Reserva Efectuada.\nNº da Reserva: ' + increm.total)
				window.location.replace("../index.html")
  			    
  			  }
  			}).modal('show')
		}
	})
})