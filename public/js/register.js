var userData;
var iduser;
$("#registerButton").on("click", function () {
  var userReg = {
    nombre: $("#nombreUsuario").val(),
    password: $("#userPass").val()
  };
  $.ajax({
    type: "POST",
    url: "/api/registerUser",
    data: userReg,
    success: function (req) {
      if(req.mensaje=="USUARIO"){
        console.log("USUARIO EQUIVOCADO");
        alert("Usuario ya Existe favor de Reigistrarse con nuevo usuario");
        url = "/register";
          $(location).attr("href", url); 
  
  
      } else {

        alert("Usuario Registrado Correctamente Favor de hacer Login");
        url = "/login";
        $(location).attr("href", url); 
      }

      console.log(msg.mensaje);
      
  }
  });


console.log("FUNCION BOTON");

});

