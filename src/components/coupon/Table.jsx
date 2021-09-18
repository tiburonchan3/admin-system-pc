import React from "react";
import useAuth from "../../hooks/useAuth";
import TDComponent from "../global/tables/TDComponent";
import THComponent from "../global/tables/THComponent";
import Warn from "../../assets/warn.svg";
import moment from "moment";
import {confirmAlert} from 'react-confirm-alert';
import DeleteAction from "../global/DeleteAction";

const Table = ({ coupons,setReload }) => {
  const ctx = useAuth();
  const { auth } = ctx;
  const deleteCoupon = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteAction
            id={id}
            type="coupon"
            onClose={onClose}
            setReload={setReload}
          />
        );
      },
    });
  };
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <THComponent name="Codigo" />
              <THComponent name="Descuento" />
              <THComponent name="Fecha de expiracion" />
              <THComponent name="Estado" />
              <THComponent name="Acciones" />
            </tr>
          </thead>
          <tbody>
            {coupons && coupons.length ?
              coupons.map((cp, _) => (
                <tr key={cp.id}>
                  <TDComponent name={cp.codigo} />
                  <TDComponent name={`${Number(cp.descuento)}%`} />
                  <TDComponent>
                    {new Date(cp.fechaExp) < Date.now() && (
                      <img src={Warn} alt="none" className="w-6" />
                    )}
                    <span className="mt-1 ml-2">
                      {moment(cp.fechaExp).calendar()}
                    </span>
                  </TDComponent>
                  <TDComponent>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          readOnly
                          checked={cp.status === 1 ? true : false}
                          className="hidden"
                          value={cp.status}
                        />
                        <div className="toggle__line w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>
                        <div
                          className={
                            "toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 " +
                            (cp.status && "toggle__dot_active bg-green-400")
                          }
                        ></div>
                      </div>
                      <div className="ml-3 text-gray-700 font-medium">
                        {cp.status ? "Activo" : "Inactivo"}
                      </div>
                    </label>
                  </TDComponent>
                  <TDComponent>
                    {auth.role === "admin" && (
                      <button
                          onClick={() => deleteCoupon(cp.id)}
                        className="bg-red-400 p-2 text-xs w-20 rounded text-white font-semibold"
                      >
                        Eliminar
                      </button>
                    )}
                  </TDComponent>
                </tr>
              )) : <p className="p-5">No hay registros disponibles</p>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
