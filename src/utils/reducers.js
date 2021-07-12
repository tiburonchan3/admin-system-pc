export const filterDates = (initialDate, finalDate, sales) => {
  const salesfilter =
    sales &&
    initialDate &&
    finalDate &&
    sales.filter(
      (sale) =>
        new Date(sale.fecha_Orden).valueOf() >=
          new Date(initialDate).valueOf() &&
        new Date(sale.fecha_Orden).valueOf() <= new Date(finalDate).valueOf()
    );
  return salesfilter;
};
export const reduceDes = (sales) => {
  const redDesc = sales
    .map((sale) => sale.TotalDesc)
    .reduce((a, b) => Number(a) + Number(b), 0);
  return redDesc;
};

export const reduceTotal = (sales) => {
  const redDesc = sales
    .map((sale) => sale.PrecioTotal)
    .reduce((a, b) => Number(a) + Number(b), 0);
  return redDesc;
};
export const reduceGain = (sales) => {
  const redGain = sales
    .map((sale) => sale.BeneficioVenta)
    .reduce((a, b) => Number(a) + Number(b), 0);
  return redGain;
};
