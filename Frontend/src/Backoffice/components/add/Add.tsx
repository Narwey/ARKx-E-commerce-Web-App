import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";

type Category = {
  _id: string;
  categoryName: string;
};

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addUser: (user: any) => any;
  addProduct: (product: any) => any;
  addCustomer: (customer: any) => any;
  addOrder: (order: any) => any;
  addCategory: (category: any) => any;
  addSubcategory: (subcategory: any) => any;
};

const Add = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedRole, setSelectedRole] = useState("manager");

  console.log("selectedCategory", selectedCategory);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/v1/categories"); // Replace with your API endpoint
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    props.setOpen(false);
    const formData = new FormData(e.currentTarget);

    const response = await axios.post(
      `http://localhost:4000/v1/${props.slug}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!response) {
      throw new Error("Failed to add item");
    }

    console.log("response", response.data);

    try {
      switch (props.slug) {
        case "users":
          props.addUser(response.data.data);
          break;
        case "products":
          props.addProduct(response.data.data);
          break;
        case "categories":
          props.addCategory(response.data);
          break;
        case "subcategories":
          const subcategoryWithCategory = {
            ...response.data,
            category: selectedCategory,
            category_sub: {
              _id: selectedCategory,
              categoryName: categories.find((c) => c._id === selectedCategory)
                ?.categoryName,
            }, //
          };
          console.log("subcategoryWithCategory", subcategoryWithCategory);
          props.addSubcategory(subcategoryWithCategory);
          break;
        default:
          break;
      }

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
        </span>
        {props.slug === "users" ||
        props.slug === "customers" ||
        props.slug === "products" ||
        props.slug === "categories" ||
        props.slug === "subcategories" ? (
          <h1>Add new {props.slug}</h1>
        ) : null}
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter(
              (item) =>
                item.field !== "_id" &&
                item.field !== "img" &&
                item.field !== "creationDate" &&
                item.field !== "active" &&
                item.field !== "validAccount" &&
                item.field !== "categoryName" &&
                item.field !== "role"
            )
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input
                  type={column.type}
                  name={column.field}
                  placeholder={column.field}
                />
              </div>
            ))}
          <div className="item">
            {props.slug === "users" ? (
              <>
                <label htmlFor="role">Role</label>
                <select
                  name="role"
                  id="role"
                  value={selectedRole} // make sure you have a state variable to hold the selected value
                  onChange={(e) => setSelectedRole(e.target.value)} // update the state when the selection changes
                >
                  {/* Your option elements go here */}
                </select>
              </>
            ) : null}
          </div>

          {props.slug === "products" ? (
            <div className="item">
              <label>subcategory</label>
              <input
                type="text"
                name="subcategory"
                placeholder="Enter your subcategory"
              />
            </div>
          ) : null}
          {props.slug === "subcategories" ? (
            <div className="item">
              <label htmlFor="category">Categories</label>
              <select
                name="category"
                id="category"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
              >
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.categoryName}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          {props.slug === "categories" ? (
            <>
              <div className="item">
                <label>CategoryName</label>
                <input
                  type="text"
                  name="categoryName"
                  placeholder="Enter your CategoryName"
                />
              </div>
            </>
          ) : null}
          {props.slug === "users" ? (
            <>
              <div className="item">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
              </div>
            </>
          ) : null}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
