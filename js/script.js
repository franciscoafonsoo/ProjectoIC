function pulse(unique) {
	$("#" + unique).transition('pulse');
}

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

	$('.button').click( function function_name(argument) {
		$('#cenas').modal('show');
	});




















	
});