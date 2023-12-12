import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./category.scss";
import { useEffect, useState } from "react";
import Add from "../../components/add/Add";
import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  {
    field: "categoryName",
    type: "string",
    headerName: "category name",
    width: 500,
  },
  {
    field: "active",
    type: "boolean",
    headerName: "status",
    width: 500,
  },
];

const Category = () => {
  const [open, setOpen] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  // to add a user

  // // to handle delete a user
  // const handleDelete = async (id: number) => {
  //   try {
  //     const response = await fetch(`http://localhost:4000/v1/users/${id}`, {
  //       method: 'DELETE',
  //     });
  //     setUserData(userData.filter((user)=>{
  //       return user._id !== id ;
  //     }))

  //     if (!response.ok) {
  //       throw new Error('Failed to delete the user');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //   }
  // };
  const { isLoading, data } = useQuery({
    queryKey: ["allCategory"],
    queryFn: () =>
      fetch("http://localhost:4000/v1/categories").then((res) => res.json()),
  });

  useEffect(() => {
    if (data) {
      setCategoryData(data.data);
    }
  },[data]);

  const addCategory = (category: any) => {
    console.log("category", category);
    setCategoryData([...categoryData, category]);
  };

  return (
    <div className="users">
      <div className="info">
        <h1>Categories</h1>
        <button className="button" onClick={() => setOpen(true)}>Add New Category</button>
      </div>
      {/* TEST THE API */}
      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="categories" columns={columns} rows={categoryData} />
      )}
      {open && (
        <Add
          slug="categories"
          columns={columns}
          setOpen={setOpen}
          addCategory={addCategory}
        />
      )}
    </div>
  );
};

export default Category;
