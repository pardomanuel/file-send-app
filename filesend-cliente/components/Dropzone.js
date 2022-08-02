import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import clienteAxios from "../config/axios";
import appContext from "../context/app/appContext";
import authContext from "../context/auth/authContext";
import Spinner from './Spinner';
import Formulario from "./Formulario";

const Dropzone = () => {

  const AppContext = useContext(appContext);
  const { cargando, mostrarAlerta, subirArchivo, crearEnlace } = AppContext;
  
  const AuthContext = useContext(authContext);
  const { usuario, autenticado } = AuthContext;
  
  const onDropAccepted = useCallback(async (acceptedFiles) => {
    //Crear un formData
    const formData = new FormData();
    formData.append("archivo", acceptedFiles[0]);
    
    subirArchivo(formData, acceptedFiles[0].path);
  }, []);

  const onDropRejected = () => {
    mostrarAlerta('No se pudo subir, el límite es 1MB. Obten una cuenta gratis para subir archivos más grandes');
  }

  //Extraer contenido de dropzone
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

  const archivos = acceptedFiles.map((archivo) => (
    <li
      className="bg-white flex-1 py-3 px-5 mb-4 shadow-lg rounded"
      key={archivo.lastModified}
    >
      <p className="font-bold text-xl">{archivo.path}</p>
      <p className="text-sm text-gray-500">
        {(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB
      </p>
    </li>
  ));

  
  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4 min-h-[80%]">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full text-center">
          <h4 className="text-2xl font-bold mb-4">Archivos</h4>
          <ul>{archivos}</ul>
          { autenticado && (<Formulario />) }
          { cargando ? <Spinner className="mb-4"/> : (
            <button
              type="button"
              className="bg-blue-700 w-3/5 py-3 px-3 rounded-lg text-white uppercase font-bold my-10 hover:bg-blue-800"
              onClick={ () => crearEnlace() }
            >
              Crear Enlace
            </button>
          )}
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input className="h-100 " {...getInputProps()} />
          <div className="text-center">
            {isDragActive ? (
              <p className="text-2xl text-center text-gray-600">
                Suelta el archivo
              </p>
            ) : (
              <>
                <p className="text-2xl text-center text-gray-600">
                  Selecciona un archivo y arrastralo aquí
                </p>
                <button
                  type="button"
                  className="bg-blue-700 py-3 px-3 rounded-lg text-white uppercase font-bold my-10 hover:bg-blue-800"
                >
                  Selecciona archivos para subir
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
