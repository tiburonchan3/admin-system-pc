import React, { useState } from "react";
import TDComponent from "../global/tables/TDComponent";
import THComponent from "../global/tables/THComponent";
import { MarkService } from "../../services/mark.service";
import { confirmAlert } from "react-confirm-alert";
import DeleteAction from "../global/DeleteAction";
import Modal from "../global/modal/Modal";
import Form from "./Form";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Table = (props) => {
  const { auth } = useAuth();
  const { marks, setReload } = props;
  const service = new MarkService();
  const [mark, setMark] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const change = (id) => {
    const query = {
      id,
    };
    service.changeStatus(query).then((res) => {
      if (res.ok === true) {
        setReload(true);
        id = 0;
      } else {
        toast.error("Error en los datos");
      }
    });
  };
  const deleteMark = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteAction
            id={id}
            type="mark"
            onClose={onClose}
            setReload={setReload}
          />
        );
      },
    });
  };
  const click = (mark) => {
    setMark(mark);
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
              <THComponent name="Estado" />
              <THComponent name="Acciones" />
            </tr>
          </thead>
          <tbody>
            {marks && marks.length > 0 ? (
              marks.map((mark, index) => (
                <tr key={index}>
                  <TDComponent name={mark.id} />
                  <TDComponent name={mark.marca} />
                  <TDComponent>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={mark.status === 1 ? true : false}
                          className="hidden"
                          onChange={() => change(mark.id)}
                          value={mark.status}
                        />
                        <div className="toggle__line w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>
                        <div
                          className={
                            "toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 " +
                            (mark.status && "toggle__dot_active bg-green-400")
                          }
                        ></div>
                      </div>
                      <div className="ml-3 text-gray-700 font-medium">
                        {mark.status ? "Activo" : "Inactivo"}
                      </div>
                    </label>
                  </TDComponent>
                  <TDComponent>
                    <button
                      onClick={() => click(mark)}
                      className="bg-global p-2 text-xs w-20 rounded mr-4 text-white font-semibold"
                    >
                      Editar
                    </button>
                    {auth.role === "admin" && (
                      <button
                        onClick={() => deleteMark(mark.id)}
                        className="bg-red-400 p-2 text-xs w-20 rounded text-white font-semibold"
                      >
                        Eliminar
                      </button>
                    )}
                  </TDComponent>
                </tr>
              ))
            ) : (
              <p className="p-5">No hay registros para mostrar</p>
            )}
          </tbody>
        </table>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          title="Editar Marca"
        >
          <Form
            oldMark={mark}
            setReload={setReload}
            setShowModal={setShowModal}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Table;
