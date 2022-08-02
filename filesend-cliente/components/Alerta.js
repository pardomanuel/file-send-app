import React, { useContext } from "react";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";

const Alerta = ({ err }) => {
  const AuthContext = useContext(authContext);
  const { mensaje, error } = AuthContext;

  const AppContext = useContext(appContext);
  const { mensaje_archivo } = AppContext;

  return (
    <div
      className={`${
        ( error || err ) ? "bg-red-500" : "bg-green-500"
      } py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto`}
    >
      { mensaje || mensaje_archivo }
    </div>
  );
};

export default Alerta;
