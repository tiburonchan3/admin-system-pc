import { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { filterDates } from "../../utils/reducers";
const LineChart = ({ sales }) => {
  const date = new Date();
  const [salesPerM, setSalesPerM] = useState({
    enero: 0,
    febrero: 0,
    marzo: 0,
    abril: 0,
    mayo: 0,
    junio: 0,
    julio: 0,
    agosto: 0,
    septiembre: 0,
    octubre: 0,
    noviembre: 0,
    diciembre: 0,
  });
  const filterDatesPerMonth = () => {
    const enero = filterDates(1, sales);
    const febrero = filterDates(2, sales);
    const marzo = filterDates(3, sales);
    const abril = filterDates(4, sales);
    const mayo = filterDates(5, sales);
    const junio = filterDates(6, sales);
    const julio = filterDates(7, sales);
    const agosto = filterDates(8, sales);
    const septiembre = filterDates(9, sales);
    const octubre = filterDates(10, sales);
    const noviembre = filterDates(11, sales);
    const diciembre = filterDates(12, sales);
    setSalesPerM({
      enero: enero?.length,
      febrero: febrero?.length,
      marzo: marzo?.length,
      abril: abril?.length,
      mayo: mayo?.length,
      junio: junio?.length,
      julio:julio?.length,
      agosto:agosto?.length,
      septiembre:septiembre?.length,
      octubre:octubre?.length,
      noviembre:noviembre?.length,
      diciembre:diciembre?.length
    });
  };
  useEffect(() => {
    return filterDatesPerMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sales]);
  const ref = useRef("chart");
  const data = {
    labels: [
      "En",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    datasets: [
      {
        label: "# de ventas",
        data: [
          salesPerM.enero,
          salesPerM.febrero,
          salesPerM.marzo,
          salesPerM.abril,
          salesPerM.mayo,
          salesPerM.junio,
          salesPerM.julio,
          salesPerM.agosto,
          salesPerM.septiembre,
          salesPerM.octubre,
          salesPerM.noviembre,
          salesPerM.noviembre,
        ],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div>
      <h2>Ventas {date.getFullYear()}</h2>
      <Line ref={ref} data={data} options={options} />
      <div className="mt-9 p-10">
        <span className="text-4xl">Ventas Mensuales</span>
        <ul className="mt-4">
          <li className="text-sm"><span className="font-semibold text-lg mr-2">Enero:</span> {salesPerM.enero}</li>
          <li className="text-sm"><span className="font-semibold text-lg mr-2">Febrero:</span> {salesPerM.febrero}</li>
          <li className="text-sm"><span className="font-semibold text-lg mr-2">Marzo:</span> {salesPerM.marzo}</li>
          <li className="text-sm"><span className="font-semibold text-lg mr-2">Abril:</span> {salesPerM.abril}</li>
          <li className="text-sm"><span className="font-semibold text-lg mr-2">Mayo:</span> {salesPerM.mayo}</li>
          <li className="text-sm"><span className="font-semibold text-lg mr-2">Junio:</span> {salesPerM.junio}</li>
          <li className="text-sm"><span className="font-semibold text-lg mr-2">Julio:</span> {salesPerM.julio}</li>
          <li className="text-sm"><span className="font-semibold text-lg mr-2">Agosto:</span> {salesPerM.agosto}</li>
          <li className="text-sm"><span className="font-semibold text-lg mr-2">Septiembre:</span> {salesPerM.septiembre}</li>
          <li className="text-sm"><span className="font-semibold text-lg mr-2">Octubre:</span> {salesPerM.octubre}</li>
          <li className="text-sm"><span className="font-semibold text-lg mr-2">Noviembre:</span> {salesPerM.noviembre}</li>
          <li className="text-sm"><span className="font-semibold text-lg mr-2">Diciembre:</span> {salesPerM.diciembre}</li>
        </ul>
      </div>
    </div>
  );
};

export default LineChart;
