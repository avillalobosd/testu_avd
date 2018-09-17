$("#logOut").on("click", function () {
  sessionStorage.setItem('key', " ");
  url = "/login";
  $(location).attr("href", url);


});

$("#submit").on("click", function () {
  var revisar = [];
  $('form input[type=radio]:checked').each(function () {
    revisar.push($(this).attr("id"));
  });


  $.ajax({
    type: "POST",
    url: "/api/revisar",
    data: {
      data: JSON.stringify(revisar),
      userid: userid,
      examen: $(this).attr("data-examen")
    },
    success: function (msg) {
      console.log(msg.mensaje);


    }
  });
  console.log(revisar);


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