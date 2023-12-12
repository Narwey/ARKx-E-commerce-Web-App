import { useEffect, useState } from "react";
import "./Products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query"; 

const columns: GridColDef[] = [
  
  {
    field: "product_image",
    headerName: "Image",
    width: 80,
    renderCell: (params) => {
      return <img src={`http://localhost:4000/uploads/${params.row.product_image}`|| "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "sku",
    type: "string",
    headerName: "Sku",
    width: 50,
  },
  {
    field: "product_name",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "categoryName",
    type: "string",
    headerName: "Category",
    width: 200,
    renderCell: (params) => {
      return <span>{params.row.subcategory.category.categoryName ? params.row.subcategory.category.categoryName : ""} </span>;
    },
  },
  
  {
    field: "short_description",
    headerName: "Description",
    type: "string",
    width: 300,
  },
  
  {
    field: "price",
    headerName: "Price",
    width: 80,
    type: "Number",
  },
  {
    field: "active",
    headerName: "Status",
    width: 100,
    type: "boolean",
  },

];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [productData , setProductData] = useState([]);
  // const [testData , setTestData] = useState([{}]);
  
  const addProduct = (product:any) => {
      setProductData([...productData , product]);
  // TEST THE API
  }
  
  const { isLoading, data } = useQuery({
    queryKey: ["allproducts"],
    queryFn: () =>
      fetch("http://localhost:4000/v1/products").then(
        (res) => res.json()
      ),
  })
  
  console.log("product", data);
  
  
  useEffect(() => {
    if (data) {
      setProductData(data);
    }
  }, [data]);
  

// console.log(testData);
  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button className="button" onClick={() => setOpen(true)}>Add New Products</button>
      </div>
      {/* <DataTable slug="products" columns={columns} rows={products} /> */}
      {/* TEST THE API */}

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="products" columns={columns} rows={productData} />
      )}
      {open && <Add slug="products" columns={columns} setOpen={setOpen} addProduct={addProduct} />}
    </div>
  );
};

export default Products;
