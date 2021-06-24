import React from "react";
import TDComponent from "../global/tables/TDComponent";
import THComponent from "../global/tables/THComponent";
import moment from "moment";
import 'moment/locale/es';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

const Table = ({ orders }) => {
  console.log(orders)
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <THComponent name="ID" />
              <THComponent name="Fecha de la orden" />
              <THComponent name="Cliente" />
              <THComponent name="Descuento" />
              <THComponent name="Total a pagar" />
              <THComponent name="Estado de la orden" />
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order.id}>
                  <TDComponent name={order.id} />
                  <TDComponent name={moment(order.fecha_Orden).calendar()} />
                  <TDComponent
                    name={order.cliente.nombre + " " + order.cliente.apellido}
                  />
                  <TDComponent name={"$" + order.TotalDesc} />
                  <TDComponent name={"$" + order.PrecioTotal} />
                  <TDComponent>
                    {(order.status === 1 && (
                      <div>
                        <FontAwesomeIcon
                          className="text-green-500"
                          icon={faCheck}
                        />
                        <span className="ml-2">Completada</span>
                      </div>
                    )) ||
                      (order.status === 0 && (
                        <div>
                          <FontAwesomeIcon
                            className="text-gray-500"
                            icon={faClock}
                          />
                          <span className="ml-2">Pendiente</span>
                        </div>
                      )) ||
                      (order.status === 2 && (
                        <div>
                          <FontAwesomeIcon
                            className="text-blue-500"
                            icon={faPaypal}
                          />
                          <span className="ml-2">Completada</span>
                        </div>
                      ))}
                  </TDComponent>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
