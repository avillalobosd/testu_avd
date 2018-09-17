$("#logOut").on("click", function () {
  sessionStorage.setItem('key', " ");
  url = "/login";
        $(location).attr("href", url);


});





$("#sendMessage").on("click", function () {
  var wall = {
    idusuario: userid,
    nombre: username,
    mensaje: $("#messageTosend").val()
  };
  $.ajax({
    type: "POST",
    url: "/api/messagePost",
    data: wall,
    success: function (msg) {

      console.log(msg.mensaje);
      
  }
  });
  url = "/wall";
        $(location).attr("href", url);


});

$(".examen").on("click", function () {
  console.log(this.id);
  url = "/examen/"+this.id+"/"+userid;
  $(location).attr("href", url);
  
  });






// $(".examen").on("click", function () {

//   console.log($(this).attr("data-id"));
//   // var wall = {
//   //   idusuario: userid,
//   //   nombre: username,
//   //   mensaje: $("#messageTosend").val()
//   // };
//   var examen = $(this).attr("data-id");
//   $.ajax({
//     type: "POST",
//     url: "/api/tomarExamen",
//     data: {examen: examen},
//     success: function (msg) {

//       console.log(msg);
      
//   }
//   });
//   // url = "/wall";
//   //       $(location).attr("href", url);


// });



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