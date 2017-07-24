var app = angular.module('tivaApp', ['Routes', 'Controllers']);

//Localizes Date().toDateInputValue() timezone
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

$(document).ready(function(){
	$("#datepicker").datepicker();
	$('#get-reservations-input').val(new Date().toDateInputValue());

	$( "#new-reservation" ).submit(function( event ) {
		alert("Varaus luotu.");
	});

	$("#get-reservations").click(function(){
		$("#reslist").empty();
    $.get("/get-reservation", function(data){
      $(jQuery.parseJSON(data)).each(function() {
          var room = this.room;
          var start = this.time_start;
					var end = this.time_end;
					var li = document.createElement("LI");
					li.className = "list-group-item";
					var t = document.createTextNode(room + " from " + start + " to " + end + ".");
					li.appendChild(t);   // Append query result to <ul>
					document.getElementById("reslist").appendChild(li);
      });
    });
  });

	$('[data-toggle="popover"]').popover({
		title: "<h4>Kirjautumistiedot</h4>",
		content: "<form>Sähköposti <br> <input type='email'></input> <br> Salasana <br> <input type='password'></input> <br><br> <input type='submit' class='btn btn-default' value='Kirjaudu'></input></form>", html: true
	});
});
