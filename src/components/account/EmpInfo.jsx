import React from "react";

const EmpInfo = ({ empInfo }) => {
  return (
    <ul>
      <li>
        <span className="text-xl">Nombre: </span>
        {empInfo?.nombre}
      </li>
      <li className="mt-4">
        <span className="text-xl">Apellido: </span>
        {empInfo?.apellido}
      </li>
      <li className="mt-4">
        <span className="text-xl">Codigo de acceso: </span>
        {empInfo?.codeAccess}
      </li>
      {empInfo?.telefono && (
        <li className="mt-4">
          <span className="text-xl">Telefono: </span>
          {empInfo.telefono}
        </li>
      )}
      {empInfo?.direccion && (
        <li className="mt-4">
          <span className="text-xl">Direccion: </span>
          {empInfo?.direccion}
        </li>
      )}
      {empInfo?.email && (
        <li className="mt-4">
          <span className="text-xl">Email: </span>
          {empInfo?.email}
        </li>
      )}
    </ul>
  );
};

export default EmpInfo;
