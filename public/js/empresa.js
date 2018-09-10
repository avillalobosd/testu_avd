$("#logOut").on("click", function () {
  sessionStorage.setItem('key', " ");
  url = "/login";
        $(location).attr("href", url);


});

$(".pregunta").on("click", function () {
console.log(this.id);
url = "/preguntas/"+this.id;
$(location).attr("href", url);

});


$(".examen").on("click", function () {
  console.log(this.id);
  url = "/crearExamen/"+this.id;
  $(location).attr("href", url);
  
});



$("#sendMessage").on("click", function () {
  var wall = {
    nombre: $("#messageTosend").val(),
    idEmpresa: sessionStorage.getItem("idUsuario")
  };
  $.ajax({
    type: "POST",
    url: "/api/crearCurso",
    data: wall,
    success: function (msg) {

      console.log(msg.mensaje);
      
  }
  });
  url = "/wall";
        $(location).attr("href", url);


});
//DA EL PERMISO AL ACCESO A LA PAGINA
var userid;
var username;
$(document).ready(function() {
  var accesDeny="";
  var key ={
    session: sessionStorage.getItem("key")
  }; 
  $.ajax({
    type: "POST",
    url: "/api/check",
    data: key,
    success: function (msg) {
      accesDeny=msg.message;
      if(accesDeny=="Denegado"){
        url = "/login";
          $(location).attr("href", url);
      }
      console.log(msg.message);
      userid=msg.authData.user.id;
      username=msg.authData.user.username;
      
  }
  });
});
//SE TERMINA EL VERIFICADOR DE ACCESO A LA PAGINA