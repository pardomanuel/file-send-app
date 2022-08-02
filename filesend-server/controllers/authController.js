const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

require("dotenv").config({ path: "variables.env" });

exports.autenticarUsuario = async (req, res, next) => {
  //Mostrar mensajes de error
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(404).json({ errores: errores.array() });
  }
  //Buscar el usuario para ver si esta registrado
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    res.status(401).json({ msg: "El usuario no existe" });
    return next();
  }

  //Verificar password y autenticar usuario
  if (bcrypt.compareSync(password, usuario.password)) {
    //Crear el JWT
    const token = jwt.sign(
      {
        id: usuario._id,
        nombre: usuario.nombre,
      },
      process.env.SECRET,
      {
        expiresIn: "8h",
      }
    );

    res.json({ token });
  } else {
    res.status(401).json({ msg: "La contraseña es incorrecta" });
  }
};

exports.usuarioAutenticado = async (req, res, next) => {
  res.json({ usuario: req.usuario });
};
