import { REGISTRO_EXITOSO,
         REGISTRO_ERROR,
         LIMPIAR_ALERTA,
         LOGIN_ERROR,
         LOGIN_EXITOSO,
         USUARIO_AUTENTICADO,
         CERRAR_SESION
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case REGISTRO_EXITOSO:
            return {
                ...state,
                error: false,
                mensaje: action.payload
            } 
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                error: true,
                mensaje: action.payload,
                autenticado: null
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                error: false, 
                mensaje: null
            }
        case LOGIN_EXITOSO:
            localStorage.setItem('fileSendToken', action.payload);
            return {
                ...state,
                token: action.payload,
                autenticado: true
            }
        case USUARIO_AUTENTICADO:
            return{
                ...state,
                usuario: action.payload,
                autenticado: true
            }
        case CERRAR_SESION:
            localStorage.removeItem('fileSendToken');
            return{
                ...state,
                usuario: null,
                token: null,
                autenticado: null,
                error: false, 
                mensaje: null
            }
        default:
            return state;
    }
}