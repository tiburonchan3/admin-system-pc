import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { OrderService } from "../../services/order.service";
import { removeOrderItem } from "../../utils/orders";
import THComponent from "../global/tables/THComponent";
import OrderProduct from "./OrderProduct";

const OrderProductList = ({ items, loadOrders, setLoadOrders,setReload,setShowModal }) => {
  const [removeItem, setRemoveItem] = useState();
  const [itemsProducts, setItemsProducts] = useState([]);
  const ordService = new OrderService()
  const saveOrder = ()=>{
    ordService.saveLocalOrder(itemsProducts).then(res=>{
      if(res.ok){
        toast.success("Se guardo la orden con exito!")
        setReload(true)
        setShowModal(false)
        return;
      }
      toast.error("Error al intentar guardar la orden!!")
      return;
    })
  }
  useEffect(() => {
    setItemsProducts(items);
    setLoadOrders(false);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, loadOrders]);

  useEffect(() => {
    setItemsProducts(removeOrderItem(removeItem, items));
    setLoadOrders(true);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeItem]);
  return (
    <>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto mt-10">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <THComponent name="Producto" />
                <THComponent name="Cantidad" />
                <THComponent name="Precio" />
                <THComponent name="Opcion" />
              </tr>
            </thead>
            <tbody>
              {itemsProducts?.map((itm) => (
                <OrderProduct
                  loadOrders={loadOrders}
                  setRemoveItem={setRemoveItem}
                  key={itm.id}
                  item={itm}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {itemsProducts?.length > 0 && <button onClick={saveOrder} className="bg-green-500 rounded px-4 py-1 text-white">Guardar orden</button>}
    </>
  );
};

export default OrderProductList;
