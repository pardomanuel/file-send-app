const Enlaces = require("../models/Enlace");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.nuevoEnlace = async (req, res, next) => {
  //Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(404).json({ errores: errores.array() });
  }

  //Crear objeto enlace
  const { nombre_original, password, nombre } = req.body;

  const enlace = new Enlaces();
  enlace.url = shortid.generate();
  enlace.nombre = nombre;
  enlace.nombre_original = nombre_original;
  enlace.password = password;

  //Si el usuario esta autenticado
  if (req.usuario) {
    const { password, descargas } = req.body;
    //Asignar a enlace el nro de descargas
    if (descargas) {
      enlace.descargas = descargas;
    }
    //Asignar el password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      enlace.password = await bcrypt.hash(password, salt);
    }
    //Asignar el autor
    enlace.autor = req.usuario.id;
  }

  //Almacenar en base de datos
  try {
    await enlace.save();
    res.json({ msg: `${enlace.url}` });
    return next();
  } catch (error) {
    console.log(error);
  }
};

exports.todosEnlaces = async (req, res) => {
  try {
    const enlaces = await Enlaces.find({}).select('url -_id');
    res.json({ enlaces });
  } catch (error) {
    console.log(error);
  }
}

//Retorna si el enlace tiene o no password
exports.tienePassword = async (req, res, next) => {
  const { url } = req.params;
  //Verificar si existe el enlace
  const enlace = await Enlaces.findOne({ url });
  if(!enlace){
      res.status(404).json({ msg: 'El enlace no existe' })
      return next();
  } 
  
  if(enlace.password) {
    return res.json({ password: true, enlace: enlace.url, archivo: enlace.nombre })
  }

  next();
}

//Obtener enlace
exports.obtenerEnlace = async (req, res, next) => {
    const { url } = req.params;
    //Verificar si existe el enlace
    const enlace = await Enlaces.findOne({ url });
    if(!enlace){
        res.status(404).json({ msg: 'El enlace no existe' })
        return next();
    }
    res.json({ archivo: enlace.nombre, password: false });
    next();    
}

// Verifica si el password es correcto
exports.verificarPassword = async (req, res, next) => {
  const { url } = req.params;
  const { password } = req.body;
  //Consultar por el enlace
  const enlace = await Enlaces.findOne({ url });

  //Verificar password
  if(bcrypt.compareSync( password, enlace.password )){
    next();
  } else {
    return res.status(401).json({ msg: 'Password incorrecto' })
  }
}