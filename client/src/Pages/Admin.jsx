import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
function Admin() {
    const location=useLocation()
    console.log(location);
    const[data,setData]=useState([])
    console.log(data);
    useEffect(() => {
        fetch('http://localhost:7000/api/users')
          .then(response => response.json())
          .then(data => setData(data))
            
          .catch(error => console.error('Error fetching users:', error));
      }, []);
  return (
    <>
    {location.state !=null ?(<div className='admin-page' >
      <h1>Welcome Admin</h1>
      <h1>Registered Users Are</h1>
      {data.map((val)=>{
        return(
            <>
            <div className='user-div' >

            <h3>User Name : {val.name}</h3>
            <h3>User Email : {val.email}</h3>
            <h3>User Phone : {val.phone}</h3>
            <h3>User Address : {val.address}</h3>
            </div>
            </>
        )
      })}
    </div>):'404 not found'}
    
    </>
  )
}

export default Admin
