import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./subcategories.scss";
import { useEffect, useState } from "react";
import Add from "../../components/add/Add";
import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  
  {
    field: "subcategoryName",
    type: "string",
    headerName: "subcategory name",
    width: 500,
  },
  {
    field: "categoryName",
    type: "string",
    headerName: "category",
    width: 500,
    renderCell: (params) => {
      console.log(params.row)
        return <span>{params.row.category_sub.categoryName ? params.row.category_sub.categoryName : ""} </span>;
      },
  },
];

const subcategory = () => {
  const [open, setOpen] = useState(false);
  const [subcategoryData , setSubCategoryData] = useState([]);
  // to add a user 

  const addSubcategory = (subcategory : any) => {
    setSubCategoryData([...subcategoryData ,subcategory]);
  }

  
  const { isLoading, data } = useQuery({
    queryKey: ["allsubcategories"],
    queryFn: () =>
      fetch("http://localhost:4000/v1/subcategories").then(
        (res) => res.json()
      ),
  });

  useEffect(() => {
    if (data) {
      setSubCategoryData(data.data);
    }
},[data])

  console.log(subcategoryData);
  

  return (
    <div className="users">
      <div className="info">
        <h1>subcategories</h1>
        <button className="button" onClick={() => setOpen(true)}>Add New Subcategory</button>
      </div>
      {/* TEST THE API */}
      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="subcategories" columns={columns} rows={subcategoryData} />
      )}
      {open && <Add slug="subcategories" columns={columns} setOpen={setOpen} addSubcategory={addSubcategory} />}
    </div>
  );
};

export default subcategory;
