import { useState } from "react";
import TDComponent from "../global/tables/TDComponent";
import THComponent from "../global/tables/THComponent";
import Modal from "../global/modal/Modal";
import Form from "./Form";

const Table = ({ users, showModal, setShowModal }) => {
  const [user, setUser] = useState();
  const send = (user) => {
    setShowModal(true);
    setUser(user);
  };
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <THComponent name="Nombre" />
              <THComponent name="Telefono" />
              <THComponent name="Direccion" />
              <THComponent name="Estado" />
              <THComponent name="N° de compras" />
              <THComponent name="Acciones" />
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, _) => (
                <tr key={user.id}>
                  <TDComponent
                    name={user.client.nombre + " " + user.client.apellido}
                  />
                  <TDComponent name={user?.telefono} />
                  <TDComponent name={user?.direccion} />
                  <TDComponent>
                    <label className="flex items-center">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={user.client.estado}
                          className="hidden"
                          value={user.client.estado}
                        />
                        <div className="toggle__line w-10 h-4 bg-gray-300 rounded-full shadow-inner "></div>
                        <div
                          className={
                            "toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 " +
                            (user.client.estado &&
                              "toggle__dot_active bg-green-400")
                          }
                        ></div>
                      </div>
                      <div className="ml-3 text-gray-700 font-medium">
                        {user.client.estado ? "Activo" : "Inactivo"}
                      </div>
                    </label>
                  </TDComponent>
                  <TDComponent
                    name={user.ordenes > 0 ? user.ordenes : "Sin compras"}
                  />
                  <TDComponent>
                    {user.ordenes > 0 && user.client.id !== 1 && (
                      <button
                        onClick={() => send(user.client)}
                        className="bg-global px-4 rounded text-white py-1 whitespace-nowrap"
                      >
                        Enviar cupon
                      </button>
                    )}
                  </TDComponent>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal title="Enviar cupon" showModal={showModal} setShowModal={setShowModal}>
        <Form user={user} />
      </Modal>
    </div>
  );
};

export default Table;
