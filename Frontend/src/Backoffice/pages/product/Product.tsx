import Single from "../../components/single/Single"
import { useQuery } from "@tanstack/react-query";
import "./product.scss"

const Product = () => {
  const product_id = window.location.pathname.split('/products/')[1];
  const { isLoading, data } = useQuery({
    queryKey: ["product"],
    queryFn: () =>
      fetch(`http://localhost:4000/v1/products/p/${product_id}`).then(
        (res) => res.json()
      ),
  });
  
  return (
    <div className="product">
       {!isLoading && <Single slug="products" {...data.data}/>}
    </div>
  )
}

export default Product