$("#logOut").on("click", function () {
  sessionStorage.setItem('key', " ");
  url = "/login";
  $(location).attr("href", url);


});





$("#sendMessage").on("click", function () {
  var wall = {
    pregunta: $("#messageTosend").val(),
    idCurso: $(this).attr('data-curso')
  };
  console.log(wall);
  $.ajax({
    type: "POST",
    url: "/api/crearPregunta",
    data: wall,
    success: function (msg) {

      console.log(msg.mensaje);

    }
  });
  url = "/preguntas/" + wall.idCurso;
  $(location).attr("href", url);


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