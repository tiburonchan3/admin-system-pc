import {useState,useEffect} from "react";
import "./styles/home.styles.scss";
import LineChart from "../components/home/LineChart";
import Layout from "../layout/Layout";
import { OrderService } from "../services/order.service";

const Home = () => {
  const ordService = new OrderService()
  const [sales, setSales] = useState()
  const getOrders = ()=>{
    ordService.filterDates().then(res=>{setSales(res.orders)})
  }
  useEffect(() => {
    return getOrders()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Layout>
      <LineChart sales={sales} />
    </Layout>
  );
};

export default Home;
