const express = require('express');
const jwt = require('jsonwebtoken');
var db = require("../models");
const app = express();
module.exports = function (app) {
  app.post('/api/posts', function (req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      req.token = bearerHeader;
      next();
    } else {
      res.sendStatus(403);
    }
  }, (req, res, next) => {
    // console.log(req.token);
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: 'Post created...',
          authData
        });
        next();
      }

    });
  }, (req, res) => {
    // console.log("NEXT2");
  }

  );

  app.post('/api/login', (req, res) => {
    db.users.findOne({ where: { nombre: req.body.nombre } }).then(project => {
      // project will be the first entry of the Projects table with the title 'aProject' || null
      if (project == null) {
        // console.log("No existe nombre de usuario")
        return res.json({
          mensaje: 'USUARIO'
        });

      } else {
        const user = {
          id: project.id,
          username: req.body.nombre,
          password: req.body.password,
          permiso: project.permiso
        }
        const permiso = user.permiso;
        const id = user.id;

        if (req.body.password == project.password) {
          jwt.sign({ user }, 'secretkey', { expiresIn: '3000s' }, (err, token) => {
            res.json({
              token,
              permiso,
              id




            });

            console.log("ESTE ES!!  " + token);
          });
        } else {
          // console.log("No Coinicide Password");

        }
      }
    })


  });


  app.post('/api/check', function (req, res, next) {
    // Get auth header value]
    const bearerHeader = req.body.session;

    if (typeof bearerHeader !== 'undefined') {
      req.token = bearerHeader;
      next();
    } else {
      res.json({
        message: 'Denegado'
      });
    }
  }, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.json({
          message: 'Denegado'
        });
      } else {
        res.json({
          message: 'Post created...',
          authData
        });
        next();
      }

    });
  }, (req, res) => {
    // console.log("NEXT2");
  }

  );


  app.delete("/api/deletePreg", function (req, res) {
    db.preguntas.destroy({
      where: {
        id: req.body.borra //this will be your id that you want to delete
      }
    }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
      if (rowDeleted === 1) {
        // console.log('Deleted successfully');
      }
    }, function (err) {
      // console.log(err);
    });
    db.respuestas.destroy({
      where: {
        idPreguntas: req.body.borra //this will be your id that you want to delete
      }
    }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
      if (rowDeleted === 1) {
        // console.log('Deleted successfully');
      }
    }, function (err) {
      // console.log(err);
    });


  });

  app.delete("/api/deleteResp", function (req, res) {
    // console.log(req.body.borra);
    db.respuestas.destroy({
      where: {
        id: req.body.borra //this will be your id that you want to delete
      }
    }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
      if (rowDeleted === 1) {
        // console.log('Deleted successfully');
      }
    }, function (err) {
      // console.log(err);
    });
  });


  app.post("/api/crearEmpresa", function (req, res) {
    db.users.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/crearPregunta", function (req, res) {
    db.preguntas.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/crearUsuario", function (req, res) {

    db.users.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/crearCurso", function (req, res) {
    db.cursos.create(req.body).then(function (dbExample) {
      res.json(dbExample);
      res.mensaje("AGREGADO");
    });
  });

  app.post("/api/agregaRespuesta", function (req, res) {
    db.respuestas.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/agregarCriticas", function (req, res) {
    console.log("AJAAAAAA");
    console.log(req.body.data);
    var arreglo = JSON.parse(req.body.data);

    console.log("AJAAAAAAREGLO");
    console.log(arreglo);

    db.criticas.bulkCreate(arreglo).then(function () {
      return res.json({
        mensaje: 'LISTO'
      });
    });
  });

  app.post("/api/agregarIncluye", function (req, res) {


    console.log("AJAAAAAA INCLUYE");
    console.log(req.body.data);
    var arr = JSON.parse(req.body.data);

    console.log("AJAAAAAAREGLO INCLUYE");
    console.log(arr);

    db.incluye.bulkCreate(arr).then(function () {
      return res.json({
        mensaje: 'LISTO'
      });
    });
  });

  app.post("/api/agregarRandom", function (req, res) {
    var arr = JSON.parse(req.body.data);
    db.random.bulkCreate(arr).then(function () {
      return res.json({
        mensaje: 'LISTO'
      });
    });
  });

  app.post("/api/revisar", function (req, res) {

    var respuestas = JSON.parse(req.body.data);
    

      db.respuestas.findAll({ where: {id: respuestas} }).then(project => {
        var res=[];
        var correctas=0;
        var incorrectas=0;
        project.map (function(x){
          res.push(x.dataValues);
          if (x.dataValues.correcta==true){
            correctas++;
          }else {
            incorrectas++;
          }
        });
        console.log(correctas);
        console.log(incorrectas);
        console.log("calificason: " + (100/(correctas+incorrectas))*correctas);
        // res[0].idUser=req.body.userid;
        for (var i=0; i<res.length;i++){
          res[i].idUser=parseInt(req.body.userid);
          res[i].idExamen=parseInt(req.body.examen);
        };
        
        db.respuestascontestadas.bulkCreate(res);
        console.log(res);
        
        // project will be the first entry of the Projects table with the title 'aProject' || null
      });


  });

  app.post("/api/crearExamen", function (req, res) {
    console.log(req.data);
    db.examenes.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/tomarExamen", function (req, res) {
    var incluye = [];
    var random = [];
    console.log(req.body.examen);
    db.incluye.findAll({ where: { idExamen: req.body.examen } }).then(project => {


      project.map(function (obj) {
        db.preguntas.findOne({ where: { id: obj.dataValues.idPregunta } }).then(preg => {
          var quest = preg.dataValues;
          quest.setAttribute("idUsuario", 1);
          incluye.push(preg.dataValues);
          console.log(incluye);

        });

      });

    });
    console.log(incluye);

  });

  app.post("/api/registerUser", function (req, res) {
    db.users.findOne({ where: { nombre: req.body.nombre } }).then(project => {
      if (project == null) {
        db.users.create(req.body).then(function () {
          return res.json({
            mensaje: 'LISTO'
          });
        });

      } else {
        return res.json({
          mensaje: 'USUARIO'
        });

      }
    });
  });

  // app.post("/api/crearExamen", function (req, res) {
  //   db.users.findOne({ where: { nombre: req.body.nombre } }).then(project => {
  //     if (project == null) {
  //       db.users.create(req.body).then(function () {
  //         return res.json({
  //           mensaje: 'LISTO'
  //         });
  //       });

  //     } else {
  //       return res.json({
  //         mensaje: 'USUARIO'
  //       });

  //     }
  //   });
  // });


};





