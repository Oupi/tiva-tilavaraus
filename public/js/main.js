$(document).ready(function(){
	$("#datepicker").datepicker();
	$('[data-toggle="popover"]').popover({
		title: "<h4>Kirjautumistiedot</h4>",
		content: "<form>Sähköposti <br> <input type='email'></input> <br> Salasana <br> <input type='password'></input> <br><br> <input type='submit' class='btn btn-default' value='Kirjaudu'></input></form>", html: true
	});
});