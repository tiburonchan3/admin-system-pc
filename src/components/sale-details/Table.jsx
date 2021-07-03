import React from "react";
import TDComponent from "../global/tables/TDComponent";
import THComponent from "../global/tables/THComponent";
import moment from "moment";
import "moment/locale/es";

const Table = ({ details }) => {
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <THComponent name="ID" />
              <THComponent name="Producto" />
              <THComponent name="Cantidad" />
              <THComponent name="Descuento" />
              <THComponent name="Total" />
              <THComponent name="Fecha" />
            </tr>
          </thead>
          <tbody>
            {details &&
              details.map((detail) => (
                <tr key={detail.id}>
                    <TDComponent name={detail.id}/>
                    <TDComponent name={detail.producto.nombreProducto}/>
                    <TDComponent name={detail.cantidad}/>
                    <TDComponent name={"$"+detail.descuento.toFixed(2)}/>
                    <TDComponent name={"$"+detail.totalUnidad}/>
                    <TDComponent name={moment(detail.fecha).calendar()}/>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
