var userData;
var iduser;
var permisoUser;
$("#loginbutton").on("click", function () {
  // sessionStorage.setItem('key', "nada");
  userData = {
    nombre: $("#nombreUsuario").val(),
    password: $("#userPass").val()
  };
  console.log(userData);
  $.post("/api/login", userData, function (res) {
    // console.log("ENTRO!");

    console.log(res.mensaje);
    if (res.mensaje == "USUARIO") {
      console.log("USUARIO EQUIVOCADO");
      alert("Usuario no Existe");


    } else {
      sessionStorage.setItem('key', res.token);
      sessionStorage.setItem('permiso', res.permiso);
      permisoUser=res.permiso;
      sessionStorage.setItem('idUsuario', res.id);
      console.log("token en front " + res.token);
    }
  }).then(function () {
    console.log("ok");
    if (permisoUser == 1) {
      url = "/superusuario";
      $(location).attr("href", url);

    }
    if (permisoUser == 2) {
      url = "/empresa/" + sessionStorage.getItem("idUsuario");
      $(location).attr("href", url);

    }
    if (permisoUser == 3) {
      url = "/usuario/"  + sessionStorage.getItem("idUsuario");
      $(location).attr("href", url);

    }
    // $.ajax({
    //   url: '/api/posts',
    //   type: 'post',
    //   headers: {
    //     Authorization: sessionStorage.getItem('key'),   //If your header name has spaces or any other char not appropriate

    //   },
    //   dataType: 'json',
    //   success: function (data) {
    //     console.log(data.authData.user.id);
    //     url = "/wall";
    //     $(location).attr("href", url);
  });

  // })
});


// });

