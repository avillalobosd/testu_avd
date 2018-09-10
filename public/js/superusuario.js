$("#logOut").on("click", function () {
  sessionStorage.setItem('key', " ");
  url = "/login";
  $(location).attr("href", url);


});
$("#sendMessage").on("click", function () {
  var wall = {
    nombre: $("#messageTosend").val(),
    password: 123,
    permiso: 2
  };
  console.log(wall);
  $.ajax({
    type: "POST",
    url: "/api/crearEmpresa",
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
$(document).ready(function () {
  if (sessionStorage.getItem("permiso") == 2) {
    url = "/empresa";
    $(location).attr("href", url);

  }
  if (sessionStorage.getItem("permiso") == 3) {
    url = "/usuario";
    $(location).attr("href", url);

  }

});


//SE TERMINA EL VERIFICADOR DE ACCESO A LA PAGINA