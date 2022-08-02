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

export default (state, action) => {
  switch (action.type) {
    case MOSTRAR_ALERTA:
      return {
        ...state,
        mensaje_archivo: action.payload,
      };
    case OCULTAR_ALERTA:
      return {
        ...state,
        mensaje_archivo: null,
      };
    case SUBIR_ARCHIVO_EXITO:
      return {
        ...state,
        nombre: action.payload.nombre,
        nombre_original: action.payload.nombre_original,
        cargando: false,
      };
    case SUBIR_ARCHIVO_ERROR:
      return {
        ...state,
        nombre: null,
        nombre_original: null,
        mensaje_archivo: action.payload,
      };
    case SUBIR_ARCHIVO:
      return {
        ...state,
        cargando: true,
        nombre: null,
        nombre_original: null,
        mensaje_archivo: null,
      };
    case CREAR_ENLACE_EXITO:
      return {
        ...state,
        url: action.payload,
      };
    case LIMPIAR_STATE:
      return {
        ...state,
        mensaje_archivo: null,
        nombre: "",
        nombre_original: "",
        cargando: false,
        descargas: 1,
        password: "",
        autor: null,
        url: ""
      };
    case AGREGAR_PASSWORD:
      return {
        ...state,
        password: action.payload
      }
    case AGREGAR_DESCARGAS:
      return {
        ...state,
        descargas: action.payload
      }
    default:
      return state;
  }
};
