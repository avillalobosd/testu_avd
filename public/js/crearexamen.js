var cantidad = 0;



$("#logOut").on("click", function () {
  sessionStorage.setItem('key', " ");
  url = "/login";
  $(location).attr("href", url);


});





$("#sendMessage").on("click", function () {
  event.preventDefault();
  var ex = 0;
  var agregar = [];
  var wall = {
    numPreguntas: parseInt($("#numPreguntas").val()),
    idCurso: $(this).attr('data-curso'),
    tiempo: parseInt($("#tiempo").val()),
    idEmpresa: userid,
    criticas: "a",
    incluye: "b"
  };
  console.log(wall);
  var ex;


  $.ajax({
    type: "POST",
    url: "/api/crearExamen",
    data: wall,
    success: function (msg) {
      console.log(msg.id);
      ex = msg.id;
    }
  }).done(function () {
    var preguntasCriticas = [];
    $('input.critica:checkbox:checked').each(function () {
      var b = {
        idPregunta: parseInt($(this).attr('data-pregunta')),
        idExamen: parseInt(ex),
        keycritica: parseInt($(this).attr('data-pregunta') + ex)
      }
      preguntasCriticas.push(b);
      console.log("Preguntas Criticas");
      console.log(preguntasCriticas);
    });
    console.log(JSON.stringify(preguntasCriticas));
    // for (var i=0;i<preguntasCriticas.length;i++){
    //   function varn(){
    $.ajax({
      type: "POST",
      url: "/api/agregarCriticas",
      data: { data: JSON.stringify(preguntasCriticas) },
      success: function (msg) {
        console.log("enviadas");
      }

    }).done(function () {
      var preguntasAgrega = [];
      $('input.agregar:checkbox:checked').each(function () {
        var c = {
          idPregunta: parseInt($(this).attr('data-pregunta')),
          idExamen: parseInt(ex),
          keycritica: parseInt($(this).attr('data-pregunta') + ex)
        }
        preguntasAgrega.push(c);
        console.log("Preguntas Criticas");
      });
      console.log(JSON.stringify(preguntasAgrega));
      // for (var i=0;i<preguntasCriticas.length;i++){
      //   function varn(){
      $.ajax({
        type: "POST",
        url: "/api/agregarIncluye",
        data: { data: JSON.stringify(preguntasAgrega) },
        success: function (msg) {
          console.log("enviadas");
        }

      }).done(function () {
        var preguntasRandom = [];
        $('input.agregar:checkbox:not(:checked)').each(function () {
          var d = {
            idPregunta: parseInt($(this).attr('data-pregunta')),
            idExamen: parseInt(ex),
            keycritica: parseInt($(this).attr('data-pregunta') + ex)
          }
          preguntasRandom.push(d);
          console.log("Preguntas RANDOM");
        });
        console.log(JSON.stringify(preguntasRandom));
        // for (var i=0;i<preguntasCriticas.length;i++){
        //   function varn(){
        $.ajax({
          type: "POST",
          url: "/api/agregarRandom",
          data: { data: JSON.stringify(preguntasRandom) },
          success: function (msg) {
            console.log("enviadas");
          }

        });
      });

    });

  });
});



$('.agregar').click(function () {
  if ((parseInt($("#numPreguntas").val())) > cantidad) {
    if ($(this).is(':checked')) {
      cantidad++;
      console.log(cantidad);
    } else {
      cantidad--;
      console.log(cantidad);
    }
  } else if ($(this).is(':checked')) {
    $(this).prop("checked", false);
    console.log((parseInt($("#numPreguntas").val())));
    alert("Excederías el número de preguntas del exámen");
  } else {
    cantidad--;
    console.log(cantidad);
  }


});


$(".respuesta").on("click", function () {
  var color = "red";
  var revisa = $(".check" + this.id).is(':checked');

  if (revisa) {
    color = "green";
  }


  var wall = {
    respuesta: $("#" + this.id).val(),
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