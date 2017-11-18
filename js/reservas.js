$(function(){

	// Calendario

	$('#example2').calendar({
		type: 'date'
	});

	// Hora

	$('#example3').calendar({
		type: 'time'
	});

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
	});

	// efectuar reserva e confirmar
	$('.button').click( function () {
		if( $('#efectuar').form('is valid')) {

			var uniq = 'id' + (new Date()).getTime();
			var data 		= document.getElementById("data").value;
			var pessoas 	= document.getElementById("pessoas").value;
			var hora 		= document.getElementById("hora").value;
			var telemovel 	= document.getElementById("telemovel").value;

			$('#contentData').text('Data da Reserva: ' + data);
			$('#contentHora').text('Hora da Reserva: ' + hora);
			$('#contentPessoas').text('Nº de Pessoas: ' + pessoas);
			$('#contentTelemovel').text('Nº de Telemóvel: ' + telemovel);

			var dict = {data: data, pessoas: pessoas, hora: hora, telemovel: telemovel}

  			$('#cenas').modal({
  			  onApprove : function() {

  			  	// se confirmar os dados, guarda na localStorage
  			    localStorage.setItem(uniq, JSON.stringify(dict));
  			    alert('Reserva Efectuada');
				window.location.replace("../index.html");
  			    
  			  }
  			}).modal('show');
		}
	});
});