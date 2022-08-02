import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import { useRouter } from 'next/router';
import Spinner from "./Spinner";

const Header = () => {
  const router = useRouter();

  const [cargando, setCargando] = useState(true);
  //Extraer usuario autenticado del storage
  const AuthContext = useContext(authContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = AuthContext;
  
  const AppContext = useContext(appContext);
  const { limpiarState } = AppContext;

  useEffect(() => {
    usuarioAutenticado();
    setTimeout(() => {
      setCargando(false);
    }, 500);
  }, []);

  const redireccionar = () => {
    router.push('/');
    limpiarState();
  }

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
        <img 
          className="w-64 mb-8 md:mb-0 cursor-pointer" 
          src="/logo.svg" 
          onClick={ () => redireccionar() }
        />
      {cargando ? (
        <Spinner />
      ) : (
        <div>
          {usuario ? (
            <div className="flex items-center">
              <p className="py-2.5 px-3 text-black font-bold uppercase text-xl mr-2">
                Hola <span className="text-red-500">{usuario.nombre}</span>
              </p>
              <button 
                type="button"
                className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2"
                onClick={ () => cerrarSesion() }
              >Cerrar Sesión</button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">
                  Iniciar Sesión
                </a>
              </Link>
              <Link href="/crearcuenta">
                <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">
                  Crear Cuenta
                </a>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
