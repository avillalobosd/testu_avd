const express = require('express');
const jwt = require('jsonwebtoken');
var db = require("../models");
const app = express();
module.exports = function (app) {
  app.post('/api/posts', function(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];  
    if (typeof bearerHeader !== 'undefined') {
      req.token = bearerHeader;
      next();
    } else {
      res.sendStatus(403);
    }
  }, (req, res, next) => {
    console.log(req.token);
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
  }, (req, res)=>{
    console.log("NEXT2");
  }

);

  app.post('/api/login', (req, res) => {
    db.users.findOne({ where: { nombre: req.body.nombre } }).then(project => {
      // project will be the first entry of the Projects table with the title 'aProject' || null
      if (project == null) {
        console.log("No existe nombre de usuario")
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
        const permiso= user.permiso;
        const id= user.id;

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
          console.log("No Coinicide Password");
       
        }
      }
    })


  });


  app.post('/api/check', function(req, res, next) {
    // Get auth header value]
    const bearerHeader = req.body.session;
    console.log("EMPIEZA");
    console.log(bearerHeader );
    console.log(" TERMINA");
    if (typeof bearerHeader !== 'undefined') {
      req.token = bearerHeader;
      next();
    } else {
      res.json({
        message: 'Denegado'
      });
    }
  }, (req, res, next) => {
    console.log(req.token);
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
  }, (req, res)=>{
    console.log("NEXT2");
  }

);

app.post("/api/messagePost", function(req, res) {
  db.wall.create(req.body).then(function(dbExample) {
    res.json(dbExample);
    res.mensaje("AGREGADO");
  });
});

app.post("/api/crearEmpresa", function(req, res) {
  db.users.create(req.body).then(function(dbExample) {
    res.json(dbExample);
  });
});

app.post("/api/crearPregunta", function(req, res) {
  db.preguntas.create(req.body).then(function(dbExample) {
    res.json(dbExample);
  });
});


app.post("/api/crearCurso", function(req, res) {
  db.cursos.create(req.body).then(function(dbExample) {
    res.json(dbExample);
    res.mensaje("AGREGADO");
  });
});

app.post("/api/agregaRespuesta", function(req, res) {
  db.respuestas.create(req.body).then(function(dbExample) {
    res.json(dbExample);
  });
});

app.post("/api/registerUser", function(req, res) {
  db.users.findOne({ where: { nombre: req.body.nombre } }).then(project =>{
    if (project == null) {
      db.users.create(req.body).then(function() {
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


};





