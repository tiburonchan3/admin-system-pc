import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import NewPDFReport from "./reports/NewPDFReport";
import { OrderService } from "../services/order.service";
import { PDFDownloadLink } from "@react-pdf/renderer";
const Reports = () => {
  const ordService = new OrderService();
  const [option, setOption] = useState(0);
  const [totalSales, setTotalSales] = useState();
  const [show, setshow] = useState(false);
  const showDocument = () => {
    setshow(true);
  };
  useEffect(() => {
    const getOrders = () => {
      ordService.filterDates().then((res) => {
        const completed = res.ordenes?.map((order)=>order).filter(order=>order.status !== 0);
        setTotalSales(completed)
      });
    };
    getOrders();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <div className="p-10">
        <div className="w-full">
          <label className="font-semibold">Opciones para generar reporte</label>
          <select
            onChange={(e) => setOption(e.currentTarget.value)}
            className="border px-10 ml-4"
          >
            <option disabled selected>
              Selecciona una opcion
            </option>
            <option value={0}>Todas las ventas</option>
            <option value={1}>Enero</option>
            <option value={2}>Febrero</option>
            <option value={3}>Marzo</option>
            <option value={4}>Abril</option>
            <option value={5}>Mayo</option>
            <option value={6}>Junio</option>
            <option value={7}>Julio</option>
            <option value={8}>Agosto</option>
            <option value={9}>Septiembre</option>
            <option value={10}>Octubre</option>
            <option value={11}>Noviembre</option>
            <option value={12}>Diciembre</option>
          </select>
          {!show && (
            <button
              onClick={showDocument}
              className="bg-green-500 text-white ml-10 px-8 rounded py-1 font-semibold"
            >
              Generar
            </button>
          )}
        </div>
        {show && (
          <>
            <NewPDFReport show={show} sales={totalSales} option={option} />
           <div className="mt-8">
           <PDFDownloadLink
          document={<NewPDFReport show={show} sales={totalSales} option={option} />}
          fileName={`Report-${Date.now()}.pdf`}
          style={{
            textDecoration: "none",
            padding: "10px",
            fontWeight:500,
            borderRadius:10,
            color: "#fff",
            backgroundColor: "#00b9ae",
          }}
        >
          {() =>
           "Descargar Pdf"
          }
        </PDFDownloadLink>
           </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Reports;
