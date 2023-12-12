import {  useState } from "react";
import "./orders.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query"; 

const columns: GridColDef[] = [
  // { field: "_id", headerName: "ID", width: 90 },
  {
    field: "customerFirstName",
    type: "string",
    headerName: "customerFirstName",
    width: 200,
  },
  {
    field: "customerLastName",
    type: "string",
    headerName: "customerLastName",
    width: 200,
  },
  {
    field: "itemsTotal",
    type: "Number",
    headerName: "itemsTotal",
    width: 200,
  },
  {
    field: "status",
    type: "string",
    headerName: "status",
    width: 200,
  },
];

const Orders = () => {
  const [open, setOpen] = useState(false);
  const [productOrder , setProductOrder] = useState({});
  const [managerData , setManagerData] = useState([]);
  
  const addOrders = (Order:any) => {
    setProductOrder([...productOrder , Order]);
  // TEST THE API
  }
  const { isLoading, data } = useQuery({
    queryKey: ["allorders"],
    queryFn: () =>
      fetch("http://localhost:4000/v1/orders").then(
        (res) => res.json()
      ),
  });

  return (
    <div className="products">
      <div className="info">
        <h1>Orders</h1>
        <button className="button" onClick={() => setOpen(true)}>Add New Orders</button>
      </div>
      {/* <DataTable slug="products" columns={columns} rows={products} /> */}
      {/* TEST THE API */}

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="orders" columns={columns} rows={data.data} />
      )}
      {open && <Add slug="orders" columns={columns} setOpen={setOpen} addOrder={addOrders} />}
    </div>
  );
};

export default Orders;
