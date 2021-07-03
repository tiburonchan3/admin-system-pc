import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "../components/sale-details/Table";
import Layout from "../layout/Layout";
import { OrderService } from "../services/order.service";

const SaleDetails = () => {
  const { id } = useParams();
  const ordService = new OrderService()
  const [details, setDetails] = useState()
  const getOrderDetail = ()=>{
    const query = {
        orden:id
    }
    ordService.getOrderDetails(query).then(res=>{
        if(res.ok){
            setDetails(res.ordenesD)
        }
    })
  }
  useEffect(() => {
    return getOrderDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  console.log(id);
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8">
        <span className="text-2xl font-semibold leading-tight">
          Detalles de la orden
        </span>
        <Table details={details}/>
      </div>
    </Layout>
  );
};

export default SaleDetails;
