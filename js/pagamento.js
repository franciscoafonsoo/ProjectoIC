$(function(){

    if(!sessionStorage.getItem('refeicao')) {
        var conta = {total: 0}
    }
    else{
        var conta 	= JSON.parse(sessionStorage.getItem('total'))
    }
    
    $("#btc").attr("data-usd", conta.total);
    $("#btcc").attr("data-usd", conta.total);
    $('#btc').btc()
    $('#btcc').btc()
    $('#total').text(conta.total + '€')

    // form mbway
    $('#mbwayForm').form({
        fields: {
			cTelemovel: {
				identifier: 'cTelemovel',
				rules: [
				{
					type   : 'exactLength[9]',
					prompt : 'Por favor, escolha um'
				}
				]
			}
		}
    })

    // form transfer
    $('#transferForm').form({
        fields: {
			cartao: {
				identifier: 'cartao',
				rules: [
				{
					type   : 'exactLength[16]',
					prompt : 'Por favor, insira um número válido.'
				}
				]
			}
		}
    })

    // efectuar pagamento com mbway
	$('#confirmarTelemovel').click( function () {
		if( $('#mbwayForm').form('is valid')) {
            
            $('.ui.error.message').hide()
            $('#waiting').show()
            setTimeout(function (){
                $('#waiting').hide()
                $('#done').show()
            }, 5000)
            setTimeout(function () {
                window.location.href = "../index.html"
            }, 8000)
            sessionStorage.removeItem('refeicao')
            sessionStorage.removeItem('total')
        }
        else {
            $('.ui.error.message').show()
            $('#waiting').hide()
        }
    })
    
     // efectuar pagamento por transferencia
	$('#cBitcoin').click( function () {
        $('.ui.error.message').hide()
        $('#waiting').show()
        setTimeout(function (){
            $('#waiting').hide()
            $('#done').show()
        }, 5000)
        setTimeout(function () {
            window.location.href = "../index.html"
        }, 8000)
        sessionStorage.removeItem('refeicao')
        sessionStorage.removeItem('total')
    })
})