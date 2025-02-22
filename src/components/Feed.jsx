import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from './appStore/feedSlice'
import { BASE_URL } from './utils/Constants'
import UserCard from './UserCard'

const Feed = () => {
    const feed = useSelector(state => state.feed.value)
    console.log(feed);
    const dispatch = useDispatch()
    const getFeed = async()=>{
        const response = await axios.get(`${BASE_URL}/user/feed`,{
          withCredentials : true
        })
        console.log('response from feed API',response);
        dispatch(addFeed(response.data))
    }
    useEffect(()=>{
        getFeed()
    },[])

    if(feed.length === 0){
      return (<div className='pt-[5rem]'>
        <h1 className='text-center font-bold'>No User Available</h1>
      </div>)
    }
  return (
    feed &&<div className='mt-[5rem] flex items-center justify-center'>
      
      <UserCard user ={feed[0]}/>
    </div>
  )
}

export default Feed