var cantidad=0;



$("#logOut").on("click", function () {
  sessionStorage.setItem('key', " ");
  url = "/login";
  $(location).attr("href", url);


});





$("#sendMessage").on("click", function () {

  var agregar = [];
  $('input.agregar:checkbox:checked').each(function() {
    agregar.push($(this).attr('data-pregunta'));
});

var critica = [];
  $('input.critica:checkbox:checked').each(function() {
    critica.push($(this).attr('data-pregunta'));
});

  var wall = {
    incluye: agregar.toString(),
    criticas: critica.toString(),
    numPreguntas: parseInt($("#numPreguntas").val()),
    idCurso: $(this).attr('data-curso'),
    tiempo:  parseInt($("#tiempo").val()),
    idEmpresa: userid
  };

  console.log(wall);
  console.log(wall.incluye.toString());
  $.ajax({
    type: "POST",
    url: "/api/crearExamen",
    data: wall,
    success: function (msg) {

      console.log(msg.mensaje);

    }
  });
  location.reload();


});


$('.agregar').click(function() {
  if ((parseInt($("#numPreguntas").val()))>cantidad) {
    if($(this).is(':checked')){
    cantidad++;
    console.log(cantidad);
  }else{
    cantidad--;
    console.log(cantidad);
  }}else if($(this).is(':checked')){
    $(this).prop( "checked", false );
    console.log((parseInt($("#numPreguntas").val())));
    alert("Excederías el número de preguntas del exámen");
  } else {
    cantidad--;
    console.log(cantidad);
  }
  
  
});


$(".respuesta").on("click", function () {
  var color = "red";
  var revisa =$(".check" + this.id).is(':checked');

if (revisa){
  color="green";
}


  var wall = {
    respuesta: $("#"+this.id).val(),
    idPreguntas: this.id,
    correcta: $(".check" + this.id).is(':checked'),
    color: color
  };
  console.log(wall.idPreguntas);
  console.log(wall.respuesta);
  console.log(wall.correcta);
  console.log(wall.color);
  $.ajax({
    type: "POST",
    url: "/api/agregaRespuesta",
    data: wall,
    success: function (msg) {

      console.log(msg.mensaje);

    }
  });
  location.reload();

});
//DA EL PERMISO AL ACCESO A LA PAGINA
var userid;
var username;
$(document).ready(function () {
  var accesDeny = "";
  var key = {
    session: sessionStorage.getItem("key")
  };
  $.ajax({
    type: "POST",
    url: "/api/check",
    data: key,
    success: function (msg) {
      accesDeny = msg.message;
      if (accesDeny == "Denegado") {
        url = "/login";
        $(location).attr("href", url);
      }
      console.log(msg.message);
      userid = msg.authData.user.id;
      username = msg.authData.user.username;

    }
  });
});
//SE TERMINA EL VERIFICADOR DE ACCESO A LA PAGINA