import {useState,useEffect} from "react";
import "./styles/home.styles.scss";
import LineChart from "../components/home/LineChart";
import Layout from "../layout/Layout";
import { OrderService } from "../services/order.service";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const ordService = new OrderService()
  const [sales, setSales] = useState()
  const ctx = useAuth()
  const getOrders = ()=>{
    ordService.filterDates().then(res=>{setSales(res.orders)})
  }
  useEffect(() => {
    return getOrders()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
    {typeof ctx.auth === "undefined" && <p>Cargando...</p>}
     <Layout>
      <LineChart sales={sales} />
    </Layout>
    </>
   
  );
};

export default Home;
