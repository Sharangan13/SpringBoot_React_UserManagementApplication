import React, { useEffect, useState } from 'react'
import axios  from "axios";

export default function Home() {

     const [users,setUsers]=useState([]);

    useEffect(()=>{
        loadUser();
    

    },[]);

    const loadUser=async ()=>{

     try{const result= await axios.get("http://localhost:8080/users");
        setUsers(result.data);
      
    }catch (error) {
        console.error("Error fetching users:", error);
    }
    finally{
      console.log("Print anything");
    }
        
    };

  return (
    <div className='container py-3'>
        <table className="table  shadow">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">User Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {
      users.map((user,index)=>(

      <tr key={user.id}>
      <th scope="row" >{index+1}</th>
      <td>{user.userName}</td>
      <td>{user.email}</td>
      <td>{user.phoneNumber}</td>

      <button className='btn btn-info mx-3 my-1'>update</button>
      <button className='btn btn-danger mx-3 my-1'>Delete</button>
    </tr>

      ))
    }
    
    
  </tbody>
</table>
    </div>
  )
}
