import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { OrderService } from "../services/order.service";
import Table from "../components/sales/Table";
import io from "socket.io-client";
import Pagination from "../components/global/Pagination";
import Modal from "../components/global/modal/Modal";
import Form from "../components/sales/Form";

const Sales = ({ showModal, setShowModal }) => {
  const [orders, setOrders] = useState();
  const [reload, setReload] = useState(false);
  const [rangePag, setRangePag] = useState(null);
  const [pagination, setPagination] = useState({
    nextPage: 0,
    prevPage: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const range = (start, end, length = end - start + 1) => {
    setRangePag(Array.from({ length }, (_, i) => start + i));
  };
  const orderService = new OrderService();
  const serverURL = "https://systempcs.herokuapp.com";
  const socket = io(serverURL, {
    withCredentials: true,
  });

  const getOrders = (page = 1) => {
    orderService.getOrders(page).then((res) => {
      if (res.ok) {
        setOrders(res.ordenes);
        setPagination({
          nextPage: res.nextPage,
          prevPage: res.prevPage,
          currentPage: res.currentPage,
          totalPages: res.totalPages,
        });
        range(1, res.totalPages);
      }
    });
    setReload(false);
  };

  useEffect(() => {
    socket.on("connect", () => {});
    socket.on("reload", () => {
      getOrders();
    });
    return () => {
      socket.on("disconnect", () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return getOrders(
      pagination.currentPage || pagination.nextPage || 1
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-4">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Listado de Ventas y Ordenes
            </h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-global p-2 w-28 text-center text-semibold float-right text-white rounded-md font-semibold text-xs mr-14"
            >
              Agregar
            </button>
            <Modal
              setShowModal={setShowModal}
              showModal={showModal}
              title="Agregar"
            >
              <Form setReload={setReload} setShowModal={setShowModal}/>
            </Modal>
            <Table orders={orders} setReload={setReload} />
            {pagination.totalPages && pagination.totalPages > 1 && (
              <Pagination
                method={getOrders}
                pagination={pagination}
                rangePag={rangePag}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sales;
