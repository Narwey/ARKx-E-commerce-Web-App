import Single from "../../components/single/Single"
import { useQuery } from "@tanstack/react-query";
import "./user.scss"

const User = () => {
  const user_id = window.location.pathname.split('/users/')[1] ;
  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch(`http://localhost:4000/v1/users/${user_id}`).then(
        (res) => res.json()
      ),
  });
  
  
  return (
    <div className="user">
     {!isLoading && <Single slug="users" {...data.data}/>}
    </div>
  )
}

export default User