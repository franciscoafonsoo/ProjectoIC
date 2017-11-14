function pulse(unique) {
	$("#" + unique).transition('pulse');
}

$(function(){
	$('#example2').calendar({
		type: 'date'
		});

	$('.menu .item').tab();

	$('#example3').calendar({
  		type: 'time'
	});
});
