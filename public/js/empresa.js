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
    idEmpresa: userid
  };
  $.ajax({
    type: "POST",
    url: "/api/crearCurso",
    data: wall,
    success: function (msg) {

      console.log(msg.mensaje);
      
  }
  });
  location.reload();


});



$("#crearUsuario").on("click", function () {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
}

  var wall = {
    perteneceEmpresa: userid,
    nombre: text,
    password: 123,
    permiso: 3,
    usuariosCreados: 0
  };
  $.ajax({
    type: "POST",
    url: "/api/registerUser",
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