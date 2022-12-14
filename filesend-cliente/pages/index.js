import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import Alerta from "../components/Alerta";
import Dropzone from "../components/Dropzone";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import Link from "next/link";

const Index = () => {
  //Extraer usuario autenticado del storage
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

  //Extraer mensaje de error de archivos
  const AppContext = useContext(appContext);
  const { mensaje_archivo, url } = AppContext;

  useEffect(() => {
    const token = localStorage.getItem('fileSendToken');
    if (token) {
      usuarioAutenticado();
    }
  }, []);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <div className="text-center">
            <p className="text-center text-2xl mt-10">
              <span className="font-bold text-red-700 text-4xl uppercase">
                Tu URL es:
              </span>{" "}
              {`${process.env.frontendURL}/enlaces/${url}`}
            </p>
            <button
              type="button"
              className="bg-red-500 hover:bg-gray-900 w-4/5 lg:w-2/5 p-2 rounded-md text-white uppercase font-bold cursor-pointer mt-10"
              onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}
            >
              Copiar Enlace
            </button>
          </div>
        ) : (
          <>
            {mensaje_archivo && <Alerta />}
            <div className="lg:flex md:shadow-lg p-5 bg-white rouded-lg py-10 min-h-[50vh] lg:h-full">
              <Dropzone />
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                  Compartir archivos de forma privada
                </h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">FileNodeSend </span>
                  te permite compartir archivos con cifrado de extremo a extremo
                  y un archivo que es eliminado despu??s de ser descargado. As??
                  que puedes mantener lo que compartes en privado y asegurarte
                  de que tus cosas no permanezcan en l??nea para siempre
                </p>
                <Link href="/crearcuenta">
                  <a className="text-red-500 font-bold text-lg hover:text-red700">
                    Crea una cuenta para mayores beneficios
                  </a>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
