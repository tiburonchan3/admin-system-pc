/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "../components/global/modal/Modal";
import Pagination from "../components/global/Pagination";
import Form from "../components/mark/Form";
import Table from "../components/mark/Table";
import Layout from "../layout/Layout";
import { MarkService } from "../services/mark.service";

const Mark = ({ showModal, setShowModal }) => {
  const mark_service = new MarkService();
  const [marks, setMarks] = useState(null);
  const [reload, setReload] = useState(false);
  const [rangePag, setRangePag] = useState(null);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    nextPage: 0,
    prevPage: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const range = (start, end, length = end - start + 1) => {
    setRangePag(Array.from({ length }, (_, i) => start + i));
  };
  const getMarks = (page = 1, search = "") => {
    mark_service
      .showMarks(page, search)
      .then((res) => {
        setMarks(res.marcas);
        setPagination({
          nextPage: res.nextPage,
          prevPage: res.prevPage,
          currentPage: res.currentPage,
          totalPages: res.totalPages,
        });
        range(1, res.totalPages);
      })
      .catch(() => {
        toast.error("Ah ocurrido un error inesperado")
      });
  };
  useEffect(() => {
    getMarks(pagination.currentPage || pagination.nextPage || 1, search);
    setReload(false);
    return;
  }, [reload || search]);
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-4">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Listado de Marcas
            </h2>
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="border p-1 rounded w-96 mt-4"
              placeholder="Escribe para filtrar las marcas"
            />
            <button
              onClick={() => setShowModal(true)}
              className="bg-global p-2 w-28 text-center text-semibold float-right text-white rounded-md font-semibold text-xs mr-14"
            >
              Agregar
            </button>
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              title="Agregar Marca"
            >
              <Form setReload={setReload} setShowModal={setShowModal} />
            </Modal>
          </div>
          <Table marks={marks} setReload={setReload} />
          {pagination.totalPages && pagination.totalPages > 1 && (
            <Pagination
              method={getMarks}
              pagination={pagination}
              rangePag={rangePag}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Mark;
