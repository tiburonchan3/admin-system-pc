export const isEmptyProduct = (product) => {
  if (
    product.categoria &&
    product.marca &&
    product.nombre_producto &&
    product.proveedor &&
    product.codigo_producto &&
    product.descripcion
  )
    return true;
  return false;
};
