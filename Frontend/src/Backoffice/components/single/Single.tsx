import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./single.scss";

const Single = (props) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState({
    active: props.active,
    price: props.price,
    product_image: null, // Initialize product_image as null
    product_name: props.productName,
    short_description: props.shortDescription,
    sku: props.sku,
    subcategory: props.subcategoryName,
  });
  const [formData, setFormData] = useState({
    active: props.active,
    email: props.email,
    firstName: props.firstName,
    lastName: props.lastName,
    role: props.role,
  });

  const handleFileChange = (e) => {
    setProducts({ ...products, product_image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    if (props.slug === "products") {
      if (products.product_image) {
        data.append('product_image', products.product_image);
      }
      Object.keys(products).forEach((key) => {
        if (key !== 'product_image' && products[key] !== null) {
          data.append(key, products[key]);
        }
      });
    } else {
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
    }

    fetch(`http://localhost:4000/v1/${props.slug}/${props._id}`, {
      method: 'PUT',
      body: data,
    })
    .then((response) => response.json())
    .then((data) => {
      navigate(props.slug === "users" ? "/users" : "/products");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <div className="details">
      {props.slug === "products" ? (
        <form onSubmit={handleSubmit}>
          <div className="productStyle">
            <label htmlFor="sku">SKU:</label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={products.sku}
              onChange={(e) =>
                setProducts({ ...products, sku: e.target.value })
              }
            />
          </div>
          <div className="productStyle">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={products.product_name}
              onChange={(e) =>
                setProducts({ ...products, product_name: e.target.value })
              }
            />
          </div>
          <div className="productStyle">
            <label htmlFor="subcategoryName">Subcategory Name:</label>
            <input
              type="text"
              id="subcategoryName"
              name="subcategoryName"
              value={products.subcategory}
              onChange={(e) =>
                setProducts({ ...products, subcategory: e.target.value })
              }
            />
          </div>
          <div className="productStyle">
            <label htmlFor="shortDescription">Short Description:</label>
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              value={products.short_description}
              onChange={(e) =>
                setProducts({ ...products, short_description: e.target.value })
              }
            />
          </div>
          <div className="productStyle">
            <label htmlFor="productImage">Product Image:</label>
            <input
              type="file"
              id="productImage"
              name="productImage"
              accept="image/*"
              onChange={
                handleFileChange
              }
            />
          </div>
          <div className="productStyle">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={products.price}
              onChange={(e) =>
                setProducts({ ...products, price: e.target.value })
              }
            />
          </div>
          <div className="productStyle">
            <label htmlFor="active">Active:</label>
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={products.active}
              onChange={(e) =>
                setProducts({ ...products, active: e.target.checked })
              }
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      ) : null}
      {props.slug === "users" ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="active">Active:</label>
          <input
            type="checkbox"
            id="active"
            name="active"
            checked={formData.active}
            onChange={(e) => {
              setFormData({ ...formData, active: e.target.checked });
            }}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />

          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => {
              setFormData({ ...formData, firstName: e.target.value });
            }}
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => {
              setFormData({ ...formData, lastName: e.target.value });
            }}
          />

          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={(e) => {
              setFormData({ ...formData, role: e.target.value });
            }}
          />

          <input type="submit" value="Submit" />
        </form>
      ) : null}
    </div>
  );
};

export default Single;
