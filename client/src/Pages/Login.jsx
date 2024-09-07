import React, { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

function Login() {
  const nav=useNavigate()
  const location=useLocation()
    const [password,setPassword]=useState()
    const [email,setEmail]=useState()

    const handleSubmit=async (e)=>{
        
        e.preventDefault()
       try {
        const res=await axios.post('/api/v1/auth/login',{email,password})
       
        if(res && res.data.success ){
            window.alert(res.data.message)
            console.log(res.data.user);
            nav('/user',{state:res.data.user})
        }
       
       
       } catch (error) {
        window.alert("Login Failed")
       }
        
           
        
    }

    const toRegiser=()=>{
        nav('/')
    }
  return (
    <div>

    <form action="" onSubmit={handleSubmit} >
      <div className="register">
        <h1>Login</h1>

    <div className="informations">
      
      <label htmlFor="">E-mail</label>
      <br />
      <input
      value={email} onChange={(e)=>setEmail(e.target.value)}
        name="email"
        placeholder="Your Email"
        title="Your Email"
        type="email"
      />
      <br />
      <label htmlFor="">Password</label>
      <br />
      <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
      <label htmlFor="">Phone</label>
      <br />
      
    </div>
    <button className="create" >Login</button>
      </div>


    </form>
    <a onClick={toRegiser} className="return-store">
           Go To Register
          </a>
    </div>
  )
}

export default Login
