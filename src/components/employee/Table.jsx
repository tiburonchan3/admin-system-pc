import React from "react";
import TDComponent from "../global/tables/TDComponent";
import THComponent from "../global/tables/THComponent";

const Table = ({ employees }) => {
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <THComponent name="Nombre" />
              <THComponent name="Apellido" />
              <THComponent name="Telefono" />
              <THComponent name="Direccion" />
              <THComponent name="Codigo de acceso" />
            </tr>
          </thead>
          <tbody>
            {employees?.map((emp, _) => (
              <tr key={emp.id}>
                <TDComponent name={emp.nombre} />
                <TDComponent name={emp.apellido} />
                <TDComponent name={emp.telefono}/>
                <TDComponent name={emp.direccion}/>
                <TDComponent name={emp.codeAccess}/>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
