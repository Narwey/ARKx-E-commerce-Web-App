import { useState } from 'react'
const Login = () => {
    const [Login , setLogin] = useState({username:'',password:''})
    const handleLogin = (e) => {
        setLogin({...Login , [e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/v1/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Login),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
    }
    return(
        <form onSubmit={handleSubmit}>
            <input onChange={handleLogin} name='username' type='text' placeholder='Enter userName'/>
            <input onChange={handleLogin} name='password' type='password' placeholder='Enter password'/>
            <button  type='submit'>Login</button>
        </form>
    )
}
export default Login ;