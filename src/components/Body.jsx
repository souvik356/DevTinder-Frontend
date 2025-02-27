import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from './utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './appStore/userSlice'

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector(state => state.user.value)
  console.log('user from store',userData);
  const fetchUser = async()=>{
    try {
      const response = await axios.get(`${BASE_URL}/profile/view`,{
        withCredentials : true
      })
      console.log('response',response.data.data);
      if(response.data.success){
         dispatch(addUser(response.data.data))
      }
    } catch (error) {
      if(error.status === 401){
      navigate('/')
      }
      console.log(error.message || error)
    }
  }

  useEffect(()=>{
     fetchUser()
  },[])

  return (
    <div>
    <NavBar />
     <Outlet />
    <Footer />
    </div>
  )
}

export default Body