var db = require("../models");
const jwt = require('jsonwebtoken');

module.exports = function(app) {
  // Load index page

  app.get("/loggedout", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("loggedout", {
        msg2: "Welcome!"
      });
    });
  });


  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("login", {
        msg2: "Welcome!"
      });
    });
  });
  
  app.get("/register", function(req, res) {
    res.render("register", {
      msg2: "FORMA DE REGISTRO"
    });
  
});



  app.get("/welcome", function(req, res) {
      res.render("welcome", {
        msg2: "Welcome! jaja"
      });
    
  });
  app.get("/wall", function(req, res) {
    db.wall.findAll({order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ['id', 'DESC']]}).then(function(messages) {
      console.log((messages));
      res.render("wall", {
        examples: messages
      });
      
    });
  });

  app.get("/superusuario", function(req, res) {
    db.users.findAll({
      where: {
        permiso: 2,
        
      }
    }).then(function(empresas) {
      res.render("superusuario", {
        empresa: empresas
      });
      
    });
  });

  app.get("/empresa/:id", function(req, res) {
    var nombreEmpresa;

    db.users.findOne({ where: {id: req.params.id}}).then(project => {
     nombreEmpresa=project.nombre;
    })

    db.cursos.findAll({
      where: {
        idEmpresa: req.params.id,
        
      }
    }).then(function(cursos) {
      res.render("empresa", {
        curso: cursos,
        nombre: nombreEmpresa
      });
      
    });
  });

  app.get("/preguntas/:id", function(req, res) {
    db.preguntas.findAll({
      where: {
        idCurso: req.params.id,
        
      }
    }).then(function(cursos) {

      db.respuestas.findAll().then(function(respuestas){
      res.render("preguntas", {
        curso: cursos,
        idCurso: req.params.id,
        respuestas: respuestas
        
      });
      
    });
  });
});

app.get("/crearexamen/:id", function(req, res) {




  db.preguntas.findAll({
    where: {
      idCurso: req.params.id,
      
    }
  }).then(function(cursos) {

    db.examenes.findAll({
      where: {
        idCurso: req.params.id,
        
      }
    }).then(function(examenes){
    res.render("crearexamen", {
      curso: cursos,
      idCurso: req.params.id,
      examenes: examenes
      
    });
    
  });
});
//   db.preguntas.findAll({
//     where: {
//       idCurso: req.params.id,
      
//     }
//   }).then(function(cursos) {
// //     db.examenes.findAll({
//       where: {
//         idCurso: req.params.id,
//         }.then(function(examenes){

// //           res.render("crearexamen", {
//             curso: cursos,
//             idCurso: req.params.id,
//             examenes: examenes
            
//           });


//         }),
      
//     });

// });
});

  app.get("/usuario/:id", function(req, res) {
    db.users.findOne({where:{ id : req.params.id}}).then(function(user) {
      db.examenes.findAll({where:{ idEmpresa: user.perteneceEmpresa}}).then(function(pertenece){
        res.render("usuario", {
          examanes: pertenece
        });
      

      });
      
    });
  });


  app.get("/login", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("login", {
        msg2: "Welcome!"
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
