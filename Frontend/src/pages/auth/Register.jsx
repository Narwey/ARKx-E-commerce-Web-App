import { useState } from 'react'
const Register = () => {
    const [Register , setRegister] = useState({firstName : '',lastName: '',email: '',username: '',password: '',role: ''})
    const handleRegister = (e) => {
        setRegister({...Register , [e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(Register);
        fetch("http://localhost:3000/v1/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Register),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
    }
    return(
        <form onSubmit={handleSubmit}>
            <input onChange={handleRegister} name='firstName' type='text' placeholder='Enter your first name'/><br/>
            <input onChange={handleRegister} name='lastName' type='text' placeholder='Enter your last name'/><br/>
            <input onChange={handleRegister} name='email' type='email' placeholder='Enter your email'/><br/>
            <input onChange={handleRegister} name='username' type='text' placeholder='Enter your username'/><br/>
            <input onChange={handleRegister} name='password' type='password' placeholder='Enter your password'/><br/>
            <input onChange={handleRegister} name='role' type='text' placeholder='Enter the role'/><br/>
            <button>Register</button>
        </form>
    )
}

export default Register ;
