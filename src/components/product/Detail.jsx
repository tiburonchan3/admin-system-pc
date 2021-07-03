import React from "react";
import { ProductService } from "../../services/product.service";
import Barcode from 'react-barcode';

const Detail = ({ product,setShowDetail }) => {
  const productService = new ProductService();
  return (
    <div className="w-full grid grid-cols-2">
      <div className="w-96">
        <p>
          <span className="uppercase text-md font-semibold">Nombre:</span>{" "}
          {product?.nombreProducto}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Marca:</span>{" "}
          {product?.marca.marca}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Proveedor:</span>{" "}
          {product?.proveedor.nombre_proveedor}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Categoria:</span>{" "}
          {product?.categoria.categoria}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Precio:</span>{" "}
          {product?.costo_standar}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Descuento:</span>{" "}
          {product?.descuento}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Stock:</span>{" "}
          {product?.catidad_por_unidad}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Estado:</span>{" "}
          {product?.status ? "Activo" : "Inactivo"}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Descripcion:</span>{" "}
          {product?.descripcion}
        </p>
        <p className="mt-2">
          <span className="uppercase text-md font-semibold">Codigo:</span>{" "}
        </p>
        <div className="">
       <Barcode width={1} fontSize={13} height={65} value={product?.codigo_Producto} />
       </div>
      </div>
      <div className="w-96">
        <img
          src={productService.showImage(product?.image)}
          alt="none"
          className="w-60"
        />
        <button className="mt-20 bg-red-400 text-white p-1 px-4 rounded">
            Eliminar
        </button>
        <button className="mt-20 bg-green-500 text-white p-1 px-4 rounded ml-4">
            Desactivar
        </button>
      </div>
    </div>
  );
};

export default Detail;
