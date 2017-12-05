$(function(){
	/*
	1. Começar pedido.

		- Verificar se existe a chave 'refeicao' na sessionStorage.
			- Se sim: Obtem e faz update aos valores na página
			- Se não: Cria os valores e guarda em sessionStorage
 	*/
	if(!localStorage.getItem('reservas')) {
		localStorage.setItem('reservas', JSON.stringify({items: []}))
		localStorage.setItem('id', JSON.stringify({total: 0}))
	}
	// Calendario
	$('#example2').calendar({type: 'date'})
	// Hora
	$('#example3').calendar({type: 'time'})
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
			},
			telemovel: {
				identifier: 'telemovel',
				rules: [	
				{
					type   : 'exactLength[9]',
					prompt : 'Por favor, escolha um número de telemóvel.'
				}
				]
			}
		}
	})
	// efectuar reserva e confirmar
	$('#efectuarReserva').click( function () {
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
				hora: hora, 
				telemovel: telemovel
			})

  			$('#bmodal').modal({
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
	// confirmar reserva com telemovel
	$('#confirmarTelemovel').click( function () {
		var check = document.getElementById('cTelemovel').value
		if(check.length != 9) {
			$('#modaltitulo').text('O número inserido está incorrecto.')
			hideOrShowModal('hide')
			$('#bmodal').modal({
				onApprove : function() {
					setTimeout(function() { hideOrShowModal('show') }, 700)
				},
				onDeny : function () {
					setTimeout(function() { hideOrShowModal('show') }, 700)
				}
			}).modal('show')
		}
		else {
			confirmarReserva('cTelemovel')
		}
	})
	// confirmar reserva com id
	$('#confirmarId').click( function () {
		var check = document.getElementById('cid').value
		if(check.length == 0) {
			$('#modaltitulo').text('Por favor, introduza o seu número da reserva.')
			hideOrShowModal('hide')
			$('#bmodal').modal({
				onApprove : function() {
					setTimeout(function() { hideOrShowModal('show') }, 700)
				},
				onDeny : function () {
					setTimeout(function() { hideOrShowModal('show') }, 700)
				}
			}).modal('show')
		}
		else {
			confirmarReserva('cid')
		}
	})
	/* 
	 * funcoes auxiliares 
	 */	
	function confirmarReserva(id) {
		// get reservas
		var rs = JSON.parse(localStorage.getItem('reservas'))
		// get telemovel
		var confirm = document.getElementById(id).value		
		// check if tlm exists in reservas items
		if (id === 'cid') {
			var check = getId(rs.items, confirm)
		}
		else {
			var check = getTlm(rs.items, confirm)
		}
		// if not, hide extra elements in DOM, and warn
		if (jQuery.isEmptyObject(check)) {
			if (id === 'cTelemovel') {
				$('#modaltitulo').text('Não existe nenhuma reserva com este Telemóvel')
			}
			else {
				$('#modaltitulo').text('Não existe nenhuma reserva com este número')
			}
			hideOrShowModal('hide')

			$('#bmodal').modal({
				onApprove : function() {
					setTimeout(function() { hideOrShowModal('show') }, 700)
				},
				onDeny : function () {
					setTimeout(function() { hideOrShowModal('show') }, 700)
				}
			}).modal('show')
		}
		else {
			$('#modaltitulo').text('Confirme os dados da reserva:')
			$('#contentData').text('Data da Reserva: ' + check[0].data)
			$('#contentHora').text('Hora da Reserva: ' + check[0].hora)
			$('#contentPessoas').text('Nº de Pessoas: ' + check[0].pessoas)
			$('#contentTelemovel').text('Nº de Telemóvel: ' + check[0].telemovel)

			$('#bmodal').modal({
				onApprove : function() {
					// TODO: se confirmar os dados, remover localStorage 
					window.location.replace("../refeicoes/entradas.html")
				},
				onDeny : function () {
					setTimeout(function() { hideOrShowModal('show') }, 700)
				}
			}).modal('show')
		}
	}
	// obter array com 'tlm', se existir
	function getTlm(data, tlm) {
		return data.filter(
			function(data){ return data.telemovel == tlm }
		);
	  }
	// obter array com 'tlm', se existir
	function getId(data, id) {
		return data.filter(
			function(data){ return data.id == id }
		);
	}
	// esconder elementos do modal de confirmacao
	function hideOrShowModal(parm) {
		if (parm === 'show') {
			$('#contentData').show()
			$('#contentHora').show()
			$('#contentPessoas').show()
			$('#contentTelemovel').show()
			$('#butaonao').show()
		}
		else if (parm === 'hide') {
			$('#contentData').hide()
			$('#contentHora').hide()
			$('#contentPessoas').hide()
			$('#contentTelemovel').hide()
			$('#butaonao').hide()
		}
	}
})