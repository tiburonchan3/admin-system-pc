import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { OrderService } from "../services/order.service";
import Table from "../components/sales/Table";
import io from "socket.io-client";
import {toast} from "react-toastify"

const Sales = () => {
  const [orders, setOrders] = useState();
  const [reload, setReload] = useState(false);
  const [sum, setsum] = useState(0);
  const orderService = new OrderService();
  const serverURL = "localhost:5000/";
  const socket = io(serverURL, {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Servidor Connectado");
  });
  socket.on("reload", () => {
    setReload(true)
  });
  socket.on("disconnect",() =>{
    console.log("Servidor desconectado");
  })
  const getOrders = () => {
     orderService.getOrders().then(res=>{
       console.log(res)
            if(res.ok){
                setOrders(res.ordenes)
            }
        })
     setReload(false)
  };
  useEffect(() => {
   getOrders();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload,orders]);
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-4">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Listado de Ventas y Ordenes
            </h2>
            <input
              className="border p-1 rounded w-96 mt-4"
              placeholder="Escribe para filtrar las ordenes y ventas"
            />
            <button className="bg-global p-2 w-28 text-center text-semibold float-right text-white rounded-md font-semibold text-xs mr-14">
              Agregar
            </button>
            <Table orders={orders} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sales;
