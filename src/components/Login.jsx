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
     const [firstName,setFirstName] = useState('')
     const [lastName,setLastName] = useState('')
     const [error,setError] = useState('')
     const [isSignUp,setIsSignUp] = useState(false)
     const dispatch = useDispatch()
     const navigate = useNavigate()
    //  console.log(data);

    const handleLogin = async () => {
      try {
        setError('')
        const response = await axios.post(`${BASE_URL}/login`, {
          emailID,
          password
        }, { withCredentials: true });

        // console.log(response.data.error)
    
        if (response.data.error) {
          toast.error(response.data.message || "Login failed");
          return;
        }
    
        if (response.data.success) {
          toast.success(response.data.message || "Login successful");
          setEmailId('');
          setPassword('');
          dispatch(addUser(response.data.data));
          navigate('/');
        }
      } catch (error) {
        console.error(error.response?.data || error.message); // Debugging
        setError(error.response?.data?.message || "Something went wrong. Please try again.")
        // Show the error message in toast
        toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
      }
    };

    const handleRegister = async ()=>{
       try {
        const response = await axios.post(`${BASE_URL}/signup`,{
          firstName,
          lastName,
          emailID,
          password
         },{ withCredentials:true })
         if(response.data.success){
          setIsSignUp(false)
         }
       } catch (error) {
        setError(error?.data?.message || "something went wrong")
       }
    }
    
  return (
    <>
     <div className='flex items-center justify-center pt-[5rem] pb-[5rem]'>
     <div className="card bg-base-300 w-96 shadow-xl">
      
     <div className="card-body gap-4">
      <h1 className='text-center font-bold'>{isSignUp ? "Register" : "Login"}</h1>
      {
        isSignUp &&(<>
          <input onChange={(e)=>setFirstName(e.target.value)} type='text' className='border  focus:border-yellow-400 p-2 outline-none rounded' placeholder='Enter your first name' />
          <input onChange={(e)=>setLastName(e.target.value)} type='text' className='border  focus:border-yellow-400 p-2 outline-none rounded' placeholder='Enter your last name' />
        </>)
      }
       <input name='emailID' value={emailID} onChange={(e)=>setEmailId(e.target.value)} type='text' className='p-2 border  focus:border-yellow-400 outline-none rounded' placeholder='Enter your email' />
       <input name="password" value={password} onChange={(e)=>setPassword(e.target.value)} type='password' className='p-2 border  focus:border-yellow-400 outline-none rounded' placeholder='Enter your password'/>
    <div className="card-actions justify-center items-center flex-col">
    {
        <h2 className='text-red-500'>{error}</h2>
      }
      <button onClick={isSignUp ? handleRegister:handleLogin} className="btn btn-primary">{isSignUp? "Sign-Up":"Login"}</button>
      <h1 onClick={()=>setIsSignUp(!isSignUp)} className='mt-4 cursor-pointer font-semibold'>{isSignUp ? "Already an User ? Login now...!!": "Not an User ? Sign-up here ..!!"}</h1>
    </div>
  </div>
</div>
     </div>
    </>
  )
}
 
export default Login;
