import { useState, useEffect } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import {
  filterDates,
  reduceDes,
  reduceTotal,
  setOptionTitle,
} from "../../utils/reducers";
import moment from "moment";
import "moment/locale/es";

const NewPDFReport = ({ sales, option, show }) => {
  const [filteredSales, setFilteredSales] = useState();
  const [descTotal, setdescTotal] = useState();
  const [total, setTotal] = useState();
  const [title, setTitle] = useState();
  const getFilterSales = (sales) => {
    setTitle(setOptionTitle(Number(option)));
    if (Number(option) !== 0) {
      setFilteredSales(filterDates(Number(option), sales));
      setTotal(reduceTotal(filterDates(Number(option), sales)));
      setdescTotal(reduceDes(filterDates(Number(option), sales)));
    } else {
      setFilteredSales(sales);
      setTotal(reduceTotal(sales));
      setdescTotal(reduceDes(sales));
    }
    console.clear();
  };
  useEffect(() => {
    return getFilterSales(sales);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sales, show, option]);

  const styles = StyleSheet.create({
    body: {
      padding: 10,
    },
    table: {
      display: "table",
      marginTop: 40,
      width: "auto",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
      display: "table-row",
    },
    tableRowHeader: {
      margin: "auto",
      flexDirection: "row",
      display: "table-row",
      backgroundColor: "#eee",
    },
    tableColHeader: {
      display: "table-cell",
      padding: 10,
      width: "25%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCol: {
      display: "table-cell",
      width: "25%",
      borderStyle: "solid",
      borderColor: "#bfbfbf",
      borderWidth: 1,
      borderLeftWidth: 0,
      padding: 10,
      borderTopWidth: 0,
    },
    tableCellHeader: {
      margin: "auto",
      fontSize: 12,
      color: "#4B4B49",
      fontWeight: 500,
    },
    tableCell: {
      fontSize: 11,
    },
    title: {
      fontSize: 30,
      fontWeight: 600,
      marginBottom: 20,
      marginTop: 20,
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    detailView:{
        display: "flex",
    },
    detailTitle: {
        fontSize:13,
      fontWeight: 500,
    },
    detailContent: {
        fontSize:12,
      marginLeft: 10,
    },
  });
  useEffect(() => {
    const clear = () => {
      console.clear();
    };
    clear();
    return;
  }, [filteredSales]);
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.detailView}>
            <Text style={styles.detailTitle}>Ventas Totales: {filteredSales && filteredSales.length}</Text>
          </View>
          <View style={styles.detailView}>
            <Text style={styles.detailTitle}>Descuento total:  ${total && descTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.detailView}>
            <Text style={styles.detailTitle}>Total Vendido: ${total && total.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Fecha de la compra</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Total</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Descuento</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Estado de la compra</Text>
            </View>
          </View>
          {filteredSales &&
            filteredSales?.map((sale, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {moment(sale.fecha_Orden).format("MMMM Do YYYY, h:mm:ss a")}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>${sale.PrecioTotal}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>${sale.TotalDesc}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {(sale.status === 0 && "Pendiente") ||
                      (sale.status === 1 && "Completada") ||
                      (sale.status === 2 && "Realizada con paypal")}
                  </Text>
                </View>
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
};

export default NewPDFReport;
