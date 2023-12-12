import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./customers.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "creationDate",
    headerName: "creationDate",
    width: 200,
    type: "string",
  },
  {
    field: "validAccount",
    headerName: "validAccount",
    width: 150,
    type: "boolean",
  },
  {
    field: "active",
    headerName: "Active",
    width: 150,
    type: "boolean",
  },
];

const Customers = () => {
  const [open, setOpen] = useState(false);
  const [customerData , setCustomerData] = useState({});
  
  const addCustomer = (customer:any) => {
      setCustomerData([...customerData , customer]);
  }
  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allcustomers"],
    queryFn: () =>
      fetch("http://localhost:4000/v1/customers").then(
        (res) => res.json()
      ),
  });

  return (
    <div className="costumers">
      <div className="info">
        <h1>Customers</h1>
      </div>
      {/* TEST THE API */}
      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="customers" columns={columns} rows={data.data} />
      )}
      {open && <Add slug="customer" columns={columns} setOpen={setOpen} addCustomer={addCustomer} />}
    </div>
  );
};

export default Customers;
