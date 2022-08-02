const express = require("express");
const router = express.Router();
const enlaceController = require("../controllers/enlaceController");
const archivoController = require("../controllers/archivoController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/",
  [
    check("nombre", "Sube un archivo").not().isEmpty(),
    check("nombre_original", "Sube un archivo").not().isEmpty(),
  ],
  auth,
  enlaceController.nuevoEnlace
);

router.get('/',
  enlaceController.todosEnlaces
);

router.get('/:url',
    enlaceController.tienePassword,
    enlaceController.obtenerEnlace
);

router.post('/:url',
  enlaceController.verificarPassword,
  enlaceController.obtenerEnlace
);

module.exports = router;
