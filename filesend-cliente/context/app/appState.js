import { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import clienteAxios from "../../config/axios";

import {
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  SUBIR_ARCHIVO,
  CREAR_ENLACE_EXITO,
  LIMPIAR_STATE,
  AGREGAR_PASSWORD,
  AGREGAR_DESCARGAS
} from "../../types";

const AppState = ({ children }) => {
  const initialState = {
    mensaje_archivo: null,
    nombre: '',
    nombre_original: '',
    cargando: false,
    descargas: 1,
    password: '',
    autor: null,
    url: ''
  };

  const [state, dispath] = useReducer(appReducer, initialState);

  //Muestra una alerta
  const mostrarAlerta = (msg) => {
    dispath({
      type: MOSTRAR_ALERTA,
      payload: msg,
    });
    setTimeout(() => {
      dispath({
        type: OCULTAR_ALERTA,
      });
    }, 3000);
  };

  //Suba archivos al servidor
  const subirArchivo = async (formData, nombreArchivo) => {
    dispath({
        type: SUBIR_ARCHIVO
    })
    try {
      const resultado = await clienteAxios.post("/api/archivos", formData);
      
      dispath({
          type: SUBIR_ARCHIVO_EXITO,
          payload: {
              nombre: resultado.data.archivo,
              nombre_original: nombreArchivo
          }
      })
    } catch (error) {
        dispath({
            type: SUBIR_ARCHIVO_ERROR,
            payload: error.response.data.msg
        })
    }
  };

  //Crea un enlace una vez que se sube un archivo
  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor
    }
    try {
      const resultado = await clienteAxios.post('/api/enlaces', data);
      dispath({
        type: CREAR_ENLACE_EXITO,
        payload: resultado.data.msg
      });
    } catch (error) {
      console.log(error);
    }
  }

  const limpiarState = () => {
    dispath({
      type: LIMPIAR_STATE
    })
  }

  const agregarPassword = password => {
    dispath({
      type: AGREGAR_PASSWORD,
      payload: password
    })
  }

  const agregarDescargas = descargas => {
    dispath({
      type: AGREGAR_DESCARGAS,
      payload: descargas
    })
  }
  return (
    <appContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        mostrarAlerta,
        subirArchivo,
        crearEnlace,
        limpiarState,
        agregarPassword,
        agregarDescargas
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
