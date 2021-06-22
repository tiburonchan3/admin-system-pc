export const filterDates = (mo, sales) => {
  const year = new Date();
  const yr = year.getFullYear();
  const initial = `${yr}-${mo}-02`;
  const final = `${yr}-${mo + 1}-01`;
  const dti = new Date(initial);
  const dtf = new Date(final);
  const salesfilter =
    sales &&
    sales.filter(
      (sale) =>
        new Date(sale.fecha_Orden) >= dti && new Date(sale.fecha_Orden) <= dtf
    );
  return salesfilter;
};

export const setOptionTitle = (op) => {
  switch (op) {
    case 0:
      return "Todas las ventas"
    case 1:
      return "Ventas del mes de Enero";
    case 2:
      return "Ventas del mes de Febrero";
    case 3:
      return "Ventas del mes de Marzo";
    case 4:
      return "Ventas del mes de Abril";
    case 5:
      return "Ventas del mes de Mayo";
    case 6:
      return "Ventas del mes de Junio";
    case 7:
      return "Ventas del mes de Julio";
    case 8:
      return "Ventas del mes de Agosto";
    case 9:
      return "Ventas del mes de Septiembre";
    case 10:
      return "Ventas del mes de Octubre";
    case 11:
      return "Ventas del mes de Noviembre";
    case 12:
      return "Ventas del mes de Diciembre";
    default:
      break;
  }
};
export const reduceDes = (sales)=>{
  const redDesc = sales.map((sale)=>sale.TotalDesc).reduce((a,b)=>Number(a) + Number(b) ,0)
  return redDesc;
}

export const reduceTotal = (sales)=>{
  const redDesc = sales.map((sale)=>sale.PrecioTotal).reduce((a,b)=>Number(a) + Number(b),0)
  return redDesc;
}