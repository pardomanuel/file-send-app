const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Enlaces = require('../models/Enlace');
const path = require('path'); 

exports.subirArchivo = async (req, res, next) => {
    const multerConfiguration = {
        limits: { fileSize: req.usuario === true ? 1024 * 1024 * 10 : 1000000 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`);
            }
        })
    }
    const upload = multer(multerConfiguration).single('archivo');

    upload( req, res, async (error) => {
        if(!error){
            res.json({ archivo: req.file.filename });
        } else {
            console.log(error);
            return next();
        }
    })
}

exports.eliminarArchivo = async (req, res, next) => {
    try {
        const { archivo } = req.params;
        const enlace = await Enlaces.findOne({ nombre: archivo })
        let reqpath = path.join(__dirname, `../uploads/${archivo}`);
        fs.unlinkSync(reqpath);
    } catch (error) {
        console.log("ERROR AL ELIMINAR EL ARCHIVO");
        console.log(error);
    }
}

exports.descargar = async (req, res, next) => {
    const { archivo } = req.params;
    try {
        const enlace = await Enlaces.findOne({ nombre: archivo })
        if(!enlace){
            return res.redirect("back");
        }
        const archivoDescarga = __dirname + '/../uploads/' + archivo;
        res.download(archivoDescarga);
        const { descargas, nombre } = enlace;
        if(descargas === 1) {
            //Eliminar el archivo
            req.archivo = nombre;
            await Enlaces.findOneAndRemove(enlace.id);
            return next();
        } else{
            enlace.descargas--;
            await enlace.save();
        }
    } catch (error) {
        console.log(error);
    }
}