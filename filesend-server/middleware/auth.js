const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

module.exports = (req, res, next) => {
  const authHeader = req.get("authorization");
  if (authHeader) {
    //Obtener el token
    const token = authHeader.split(" ")[1];
    try {
      //Comprobar JWT
      const usuario = jwt.verify(token, process.env.SECRET);
      req.usuario = usuario;
    } catch (error) {
      console.log("JWT NO VALIDO");
      console.log(error);
    }
  }

  return next();
};
