import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import React ,{ useState } from "react"; 
import axios from "axios";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addUser: (user:any)=> any;
  addProduct:(product:any)=>any;
  addCustomer:(customer:any)=>any;
  addOrder:(order:any)=>any;
  
};

const edit = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    props.setOpen(false);

    try {
      const formData = new FormData(e.currentTarget);
      
      const response = await axios.post(`http://localhost:4000/v1/${props.slug}s`, formData , {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
      
      if (!response) {
        throw new Error("Failed to add item");
      }
      props.addCustomer(response.data.data);
      props.addUser(response.data.data);
      props.addProduct(response.data.data);
      props.addOrder(response.data.data);
      

      props.setOpen(false);
      // Handle query invalidation or any other actions upon success
    } catch (error) {
      console.error("Error adding item:", error);
      // Handle error or display an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add">
      <div className="modal">
      <span className="close" onClick={() => props.setOpen(false)}>
          X
      </span>{props.slug === "user" || props.slug === "customer" || props.slug === "productt" ?(
        <h1>Add new {props.slug}</h1>) :null}
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "_id" && item.field !== "img" && item.field !== "creationDate" && item.field !== "active" && item.field !== "validAccount")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input type={column.type} name={column.field} placeholder={column.field} />
              </div>
            ))} {props.slug === "user" || props.slug === "customer" ? (
              <div className="item">
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter your password" />
              </div>
            ) : null}            
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default edit;
