import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import UserCard from './UserCard'

const Profile = () => {
  const user = useSelector(state => state.user.value)
  return (
    <div className='pt-[4rem] pb-[3rem] flex items-center justify-center'>
      <EditProfile user={user}/>
    </div>
  )
}

export default Profile