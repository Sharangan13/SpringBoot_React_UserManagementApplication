import React, { useEffect, useState } from 'react'
import axios  from "axios";
import { Link, useParams } from 'react-router-dom';

export default function Home() {

     const [users,setUsers]=useState(null);
     const [showSuccessMessage, setShowSuccessMessage] = useState(false);
     const [search,setSearch]=useState("")

    useEffect(()=>{
        loadUser();
    

    },[]);

    

    const deleteUser = async (id) => {
      const confirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (!confirmed) {
        return;
      }else{
        
      try {
        await axios.delete(`http://localhost:8080/user/${id}`);
        loadUser();
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 1200);
      } catch (err) {
        console.log.error(err);
      }
    }}

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

    if (!users) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh',fontSize: '34px' }}>
          <div>Loading...</div>
        </div>
      );
    }
    
    else{
  return (
    <div className="container py-3">
      {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
          User Deleted successfully!
        </div>
      )}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="row align-items-center"
      >
        <div className="col ">
          <input
            className="form-control  my-1"
            value={search}
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search user name"
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-success my-1">Search</button>
        </div>
      </form>
      <div className="container py-4">
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
            {users.filter((user) => {
              return user.userName.toLowerCase().includes(search.toLowerCase());
            }).length == 0 ? (
              <tr>
                <td colSpan="5" className="text-center" style={{ color: 'red', fontSize:"20px"}}>
                  No data available
                </td>
              </tr>
            ) : (
              users
                .filter((user) => {
                  return user.userName
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })
                .map((user, index) => (
                  <tr key={user.id}>
                    <th>{user.id}</th>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>
                    <Link
                      className="btn btn-outline-info mx-3 my-1"
                      to={`/edituser/${user.id}`}
                    >
                      update
                    </Link>

                    <button
                      className="btn btn-outline-danger mx-3 my-1"
                      onClick={() => deleteUser(user.id)}
                      key={user.id}
                    >
                      Delete
                    </button>

                    <Link
                      className="btn btn-outline-dark mx-3 my-1"
                      to={`/showuser/${user.id}`}
                    >
                      more details
                    </Link>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );}
}
