import React from 'react'
import { useLocation } from 'react-router-dom'

function User() {
    const location=useLocation()
    console.log(location.state);
  return (
    <>
    {location.state!=null ?( <div className='user-main' >

<div className='user-div' >
 <h1>Welcome {location.state.name}</h1>
 <h2>Your Email :{location.state.email} </h2>
 <h2>Your Phone :{location.state.phone} </h2>
 <h2>Your Address :{location.state.address} </h2>
</div>
</div>):'404 not found'}
   
    </>
  )
}

export default User
