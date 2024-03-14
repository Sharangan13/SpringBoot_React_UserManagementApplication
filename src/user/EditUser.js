import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    userName: "",
    email: "",
    phoneNumber: ""
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { userName, email, phoneNumber } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/user/${id}`, user);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate("/")
    }, 1200);
     
  }

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border round p-4 mt-3 shadow'>
          <h2 className='text-center m-4'>Edit user</h2>
          
          {showSuccessMessage && (
            <div className="alert alert-success" role="alert">
              User updated successfully!
            </div>
          )}

          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3 text-start'>
              <label htmlFor='Name' className='form-label m-2 fw-bold fs-1.8' >User Name</label>
              <input
                type={"text"}
                className='form-control'
                placeholder='Enter the user name'
                name='userName'
                value={userName}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className='mb-3 text-start'>
              <label htmlFor='Email' className='form-label m-2 fw-bold fs-1.8' >Email</label>
              <input
                type={"text"}
                className='form-control'
                placeholder='Enter email address'
                name='email'
                value={email}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div className='mb-3 text-start'>
              <label htmlFor='PhoneNumber' className='form-label m-2 fw-bold fs-1.8' >Phone Number</label>
              <input
                type={"text"}
                className='form-control'
                placeholder='Enter the phone number'
                name='phoneNumber'
                value={phoneNumber}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <button type='submit' className='btn btn-outline-success'>Update</button>
            <Link className='btn btn-outline-danger mx-3' to="/">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  )
}
