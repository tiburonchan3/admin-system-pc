import { useState } from "react";
import { ProductService } from "../../services/product.service";
import { setItemCart } from "../../utils/orders";
import OrderProductList from "./OrderProductList";
import { toast } from "react-toastify";

export default function Form({setReload,setShowModal}) {
  const [prods, setProds] = useState([]);
  const [items, setItems] = useState([]);
  const [loadOrders, setLoadOrders] = useState([]);
  const prdService = new ProductService();
  const change = (e) => {
    const search = e.currentTarget.value;
    prdService.searchProduct(search).then((res) => {
      const filterItem = res.productos?.filter((item)=>item.status !== false)
      setItems(filterItem);
    });
  };
  const addItem = (prd) => {
    console.log(prd)
    const newPrd = {
      id: prd.id,
      qt:1,
      price: Number(prd.costo_standar),
      original_price: Number(prd.costo_standar),
      stock:prd.catidad_por_unidad
    };
    const Order = setItemCart(newPrd, prods);
    console.log(Order)
    if(!Order){
     toast.error("Se ah agotado la existencia de este producto!!")
      return;
    }
    setProds(Order);
    setLoadOrders(true)
  };
  return (
    <div>
      <div className="flex">
        <div className="">
          <input
            onChange={(e) => change(e)}
            type="text"
            className="border w-full text-xs px-2 py-1 rounded"
            placeholder="escribe para buscar los productos"
          />
          <ul className="mt-2 mb-3">
            {items &&
              items.map((prd) => (
                <div key={prd.id} className="grid grid-cols-2 mb-3">
                  <li className="text-xs">{prd.nombreProducto}</li>
                  <button
                    onClick={() => addItem(prd)}
                    className="bg-blue-500 w-28 px-4 py-1 text-xs ml-5 float-right rounded text-white"
                  >
                    Agregar
                  </button>
                </div>
              ))}
          </ul>
          <div className="w-full border" />
          <OrderProductList setShowModal={setShowModal} setReload={setReload} loadOrders={loadOrders} setLoadOrders={setLoadOrders} items={prods}/>
        </div>
      </div>
    </div>
  );
}
