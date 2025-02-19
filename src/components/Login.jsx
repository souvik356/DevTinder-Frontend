import React, { useState } from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { addUser } from "../AppStore/userSlice";

const Login = () => {
  const [emailID,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:7777/login',{
        emailID,
        password
      },{ withCredentials : true})
      
      if(response.data.success){
        // console.log(response.data.data);
        dispatch(addUser(response.data.data))
        setEmail('')
        setPassword('')
      }
       
    } catch (error) {
      console.error(error || error.message)
    }
  }
  return (
    <>
      <div className="mt-[6rem] flex items-center justify-center p-6">
        <div className="card  card-compact bg-base-300 w-96 shadow-xl">
          <div className="card-body gap-8">
            <h1 className="card-title">Login</h1>
            <input
              type="text"
              className="p-2 outline-none rounded-lg"
              placeholder="Enter your email"
              value={emailID}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <input
              type="text"
              className="p-2 outline-none rounded-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <div className="card-actions justify-center">
              <button onClick={handleSubmit} className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
