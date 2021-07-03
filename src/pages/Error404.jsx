import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="bg-global w-screen h-screen flex justify-items-center content-center items-center justify-center">
      <div>
        <span className="text-white text-7xl uppercase">Error 404</span>
        <p className="text-center text-white mt-3 text-xl">
          Pagina no encontrada{" "}
          <span className="border-b ml-3 text-white">
            <Link to="/">&laquo; Volver al inicio</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Error404;
