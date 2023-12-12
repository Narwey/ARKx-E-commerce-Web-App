import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  
  {
    field: "img",
    headerName: "Avatar",
    width: 60,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 80,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last name",
    width: 100,
  },
  {
    field: "username",
    type: "string",
    headerName: "username",
    width: 100,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "role",
    type: "string",
    headerName: "Role",
  },
  {
    field: "creationDate",
    headerName: "creationDate",
    width: 200,
    type: "string",
  },  
  {
    field: "active",
    headerName: "Active",
    width: 200,
    type: "boolean",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);
  const [userData , setUserData] = useState({});
  // to add a user 

  const addUser = (user:any) => {
      setUserData([...userData , user]);
  }

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
    queryKey: ["allusers"],
    queryFn: () =>
      fetch("http://localhost:4000/v1/users").then(
        (res) => res.json()
      ),
  });

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button className="button" onClick={() => setOpen(true)}>Add New User</button>
      </div>
      {/* TEST THE API */}
      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data.data} />
      )}
      {open && <Add slug="users" columns={columns} setOpen={setOpen} addUser={addUser} />}
    </div>
  );
};

export default Users;
