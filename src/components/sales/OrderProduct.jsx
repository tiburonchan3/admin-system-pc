import { useState, useEffect } from "react";
import { ProductService } from "../../services/product.service";
import TDComponent from "../global/tables/TDComponent";

const OrderProduct = ({ item, setRemoveItem,loadOrders }) => {
  const [prod, setProd] = useState();
  const prdService = new ProductService();
  const getInfoProd = () => {
    prdService.getProductbyId(item.id).then((res) => {
      setProd(res.producto);
    });
  };
  useEffect(() => {
    return getInfoProd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item,loadOrders]);
  return (
    <tr>
      <TDComponent name={prod?.nombreProducto} />
      <TDComponent name={item.qt} />
      <TDComponent name={"$" + item.price} />
      <TDComponent>
        <button
          className="bg-red-500 text-white px-3"
          onClick={() => setRemoveItem(item)}
        >
          x
        </button>
      </TDComponent>
    </tr>
  );
};

export default OrderProduct;
