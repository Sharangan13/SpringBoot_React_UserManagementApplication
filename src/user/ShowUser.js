import React, { useState, useEffect } from 'react';
import {useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ShowUser() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]); 

  
  if (!user) {
    return <div>Loading...</div>;
  }

 
  const { userName, email, phoneNumber } = user;

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border round p-4 mt-3 shadow'>
          <h2 className='text-center m-4'>Employee Details</h2>

          <form>
            <div className='mb-3 text-start'>
              <label htmlFor='Name' className='form-label m-2 fw-bold fs-1.8'>
                User Name
              </label>
              <input
                type='text'
                className='form-control'
                name='userName'
                value={userName}
                disabled 
              />
            </div>

            <div className='mb-3 text-start'>
              <label htmlFor='Email' className='form-label m-2 fw-bold fs-1.8'>
                Email
              </label>
              <input
                type='text'
                className='form-control'
                name='email'
                value={email}
                disabled 
              />
            </div>

            <div className='mb-3 text-start'>
              <label htmlFor='PhoneNumber' className='form-label m-2 fw-bold fs-1.8'>
                Phone Number
              </label>
              <input
                type='text'
                className='form-control'
                name='phoneNumber'
                value={phoneNumber}
                disabled 
              />
            </div>

            <Link className='btn btn-outline-success mx-3' to='/'>
              Done
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
