import React, { useState } from "react";
import TDComponent from "../global/tables/TDComponent";
import THComponent from "../global/tables/THComponent";
import { confirmAlert } from "react-confirm-alert";
import DeleteAction from "../global/DeleteAction";
import { ProviderService } from "../../services/provider.service";
import Modal from "../global/modal/Modal";
import Form from "./Form";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Table = (props) => {
  const { auth } = useAuth();
  const { providers, setReload } = props;
  const [provider, setProvider] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const providerService = new ProviderService();
  const change = (id) => {
    const query = {
      id,
    };
    providerService.changeStatus(query).then((res) => {
      if (res.ok === true) {
        setReload(true);
        id = 0;
      } else {
        toast.error("Error en los datos")
      }
    });
  };
  const deleteProvider= (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteAction
            id={id}
            type="provider"
            onClose={onClose}
            setReload={setReload}
          />
        );
      },
    });
  };
  const forUpdate = (provider) => {
    setProvider(provider);
    setShowModal(!showModal);
  };
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <THComponent name="ID" />
              <THComponent name="Nombre" />
              <THComponent name="Email" />
              <THComponent name="Telefono" />
              <THComponent name="Direccion" />
              <THComponent name="Estado" />
              <THComponent name="Acciones" />
            </tr>
          </thead>
          <tbody>
            {providers?.map((provider, index) => (
              <tr key={index}>
                <TDComponent name={provider.id} />
                <TDComponent name={provider.nombre_proveedor} />
                <TDComponent name={provider.email} />
                <TDComponent name={provider.telefono} />
                <TDComponent name={provider.direccion} />
                <TDComponent>
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={provider.status === 1 ? true : false}
                        className="hidden"
                        onChange={() => change(provider.id)}
                        value={provider.status}
                      />
                      <div className="toggle__line w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>
                      <div
                        className={
                          "toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 " +
                          (provider.status && "toggle__dot_active bg-green-400")
                        }
                      ></div>
                    </div>
                    <div className="ml-3 text-gray-700 font-medium text-xs">
                      {provider.status ? "Activo" : "Inactivo"}
                    </div>
                  </label>
                </TDComponent>
                <TDComponent>
                  <button
                    onClick={() => forUpdate(provider)}
                    className="bg-global p-1 text-xs w-16 rounded mr-4 text-white font-semibold"
                  >
                    Editar
                  </button>
                  {auth.role === "admin" && (
                    <button
                      onClick={() => deleteProvider(provider.id)}
                      className="bg-red-400 p-1 text-xs w-16 rounded text-white font-semibold"
                    >
                      Eliminar
                    </button>
                  )}
                </TDComponent>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          title="Editar Marca"
        >
          <Form
            oldProvider={provider}
            setReload={setReload}
            setShowModal={setShowModal}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Table;
