import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from './appStore/userSlice'
import { useNavigate } from 'react-router'
import { BASE_URL } from './utils/Constants'
import toast from 'react-hot-toast'

const Login = () => {
     const [emailID,setEmailId] = useState('')
     const [password,setPassword] = useState('')
     const [error,setError] = useState('')
     const dispatch = useDispatch()
     const navigate = useNavigate()
    //  console.log(data);

    const handleForm = async () => {
      try {
    
        const response = await axios.post(`${BASE_URL}/login`, {
          emailID,
          password
        }, { withCredentials: true });

        console.log(response.data.error)
    
        if (response.data.error) {
          toast.error(response.data.message || "Login failed");
          return;
        }
    
        if (response.data.success) {
          toast.success(response.data.message || "Login successful");
          setEmailId('');
          setPassword('');
          dispatch(addUser(response.data.data));
          navigate('/feed');
        }
      } catch (error) {
        console.error(error.response?.data || error.message); // Debugging
        setError(error.response?.data?.message || "Something went wrong. Please try again.")
        // Show the error message in toast
        toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
      }
    };
    

  return (
    <>
     <div className='flex items-center justify-center mt-[6rem]'>
     <div className="card bg-base-300 w-96 shadow-xl">
      
     <div className="card-body gap-8">
      <h1 className='text-center'>Login</h1>
       <input name='emailID' value={emailID} onChange={(e)=>setEmailId(e.target.value)} type='text' className='p-2 outline-none rounded' placeholder='Enter your email' />
       <input name="password" value={password} onChange={(e)=>setPassword(e.target.value)} type='text' className='p-2 outline-none rounded' placeholder='Enter your password'/>
    <div className="card-actions justify-center items-center flex-col">
    {
        <h2 className='text-red-500'>{error}</h2>
      }
      <button onClick={handleForm} className="btn btn-primary">Login</button>
    </div>
  </div>
</div>
     </div>
    </>
  )
}

export default Login