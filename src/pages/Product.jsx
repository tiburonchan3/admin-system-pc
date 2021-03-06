/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Modal from "../components/global/modal/Modal";
import Form from "../components/product/Form";
import { MarkService } from "../services/mark.service";
import { CategoryService } from "../services/category.service";
import { ProviderService } from "../services/provider.service";
import { ProductService } from "../services/product.service";
import Table from "../components/product/Table";
import Pagination from "../components/global/Pagination";
import { toast } from "react-toastify";

const Product = ({ showModal, setShowModal }) => {
  const [marks, setMarks] = useState(null);
  const [categories, setCategories] = useState(null);
  const [reload, setReload] = useState(false);
  const [providers, setProviders] = useState(null);
  const [products, setProducts] = useState(null);
  const [rangePag, setRangePag] = useState(null);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    nextPage: 0,
    prevPage: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const markService = new MarkService();
  const categoryService = new CategoryService();
  const providerService = new ProviderService();
  const productService = new ProductService();
  const range = (start, end, length = end - start + 1) => {
    setRangePag(Array.from({ length }, (_, i) => start + i));
  };
  const getValues = () => {
    markService
      .getMarks()
      .then((res) => {
        if (res.ok) {
          setMarks(res.marca);
          return;
        }
        toast.warning("No hay marcas disponibles");
      })
      .catch(() => {
        toast.error("Ah sucedido un error inesperado");
      });
    categoryService
      .getCategories()
      .then((res) => {
        if (res.ok) {
          setCategories(res.categoria);
          return;
        }
        toast.warning("No hay categorias disponibles");
      })
      .catch(() => {
        toast.error("Ah sucedido un error inesperado");
      });
    providerService
      .getProviders()
      .then((res) => {
        if (res.ok) {
          setProviders(res.proveedor);
          return;
        }
        toast.warning("No hay proveedores disponibles");
      })
      .catch(() => {
        toast.error("Ah sucedido un error inesperado");
      });
  };
  const getProducts = (page = 1, search = "") => {
    productService.showProducts(page, search).then((res) => {
      setProducts(res.producto);
      setPagination({
        nextPage: res.nextPage,
        prevPage: res.prevPage,
        currentPage: res.currentPage,
        totalPages: res.totalPages,
      });
      range(1, res.totalPages);
    });
  };
  useEffect(() => {
    getValues();
    setReload(false);
    getProducts(1, search);
    return;
  }, [reload || search]);
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-4">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Listado de Productos
            </h2>
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="border p-1 rounded w-96 mt-4"
              placeholder="Escribe para filtrar los productos"
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
              title="Agregar Producto"
            >
              <Form
                setShowModal={setShowModal}
                marks={marks}
                categories={categories}
                providers={providers}
                setReload={setReload}
                textButton="Agregar"
              />
            </Modal>
          </div>
          <Table
            setShowModal={setShowModal}
            showModal={showModal}
            setReload={setReload}
            products={products}
            marks={marks}
            categories={categories}
            providers={providers}
          />
          {pagination?.totalPages > 1 && (
            <Pagination
              method={getProducts}
              pagination={pagination}
              rangePag={rangePag}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
