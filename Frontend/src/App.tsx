import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import Home from "./Backoffice/pages/home/Home";
import Users from "./Backoffice/pages/users/Users";
import Customers from "./Backoffice/pages/customers/customers";
import Products from "./Backoffice/pages/products/Products";
import Orders from "./Backoffice/pages/orders/orders";
import Category from "./Backoffice/pages/category/category";
import Subcategory from "./Backoffice/pages/subcategories/subcategories";
import User from "./Backoffice/pages/user/User";
import Product from "./Backoffice/pages/product/Product";

import LandingPage from "./Frontoffice/Pages/Home/LandingPage";
import Signup from "./Frontoffice/Components/Signup";
import ProductsSecond from "./Frontoffice/Pages/Shop/Products";
import About from "./Frontoffice/Components/About";
import ShoppingCart from "./Frontoffice/Components/ShoppingCart";
import ProductDetails from "./Frontoffice/Pages/Shop/ProductDetails";

import Navbar from "./Backoffice/components/navbar/Navbar";
import Footer from "./Backoffice/components/footer/Footer";
import Menu from "./Backoffice/components/menu/Menu";
import Login from "./Backoffice/pages/login/Login";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/global.scss';

const queryClient = new QueryClient();


function App() {

  const isInSecondApp = window.location.pathname.startsWith('/second-app');
  return (
    <Router>
      {!isInSecondApp && <Navbar />}
      <div className={!isInSecondApp ? "container" : ""}>
        <div className={isInSecondApp ? "menuContainer" : ""}>
          {!isInSecondApp && <Menu />}
        </div>
        <div className={!isInSecondApp ? "contentContainer" : ""}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/category" element={<Category />} />
              <Route path="/subcategory" element={<Subcategory />} />
              <Route path="/users/:_id" element={<User />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/second-app" element={<LandingPage />} />
              <Route path="/second-app/signup" element={<Signup />} />
              <Route path="/second-app/about" element={<About />} />
              <Route path="/second-app/products" element={<ProductsSecond />} />
              <Route path="/second-app/shoppingcart" element={<ShoppingCart />} />
              <Route path="/second-app/productdetails/:id" element={<ProductDetails />} />
            </Routes>
          </QueryClientProvider>
        </div>
      </div>
      {!isInSecondApp &&<Footer />}
    </Router>
  );
}

export default App;
