import "./topBox.scss"
import { useState } from "react"
import axios from "axios"

const TopBox = () => {

  const [topDealCustomers , setTopDealCustomers] = useState([])
  axios.get("http://localhost:4000/v1/customers").then((res)=>{
    setTopDealCustomers(res.data.data)
  })

  return (

    <div className="topBox">
      <h1>Top Customers</h1>
      <div className="list">
        {topDealCustomers.map(Customer=>(
          <div className="listItem" key={Customer._id}>
            <div className="user">
              <img src={Customer.img || "/noavatar.png"} alt="" />
              <div className="userTexts">
                <span className="username">{Customer.firstName}</span>
                <span className="email">{Customer.lastName}</span>
              </div>
            </div>
            <span className="amount">$2000</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBox