import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { BASE_URL } from './utils/Constants'
import { removeUser } from './appStore/userSlice'

const NavBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.value)
    // console.log(user);
    const handleLogout = async()=>{
      try {
        const response = await axios.post(`${BASE_URL}/logout`,{},{
            withCredentials : true
          })
          if(response.data.success){
            dispatch(removeUser('null'))
            navigate('/login')
          }
      } catch (error) {
         console.error(error.message || error)
      }
    }
  return (
    <div className="navbar bg-base-300 fixed top-0 h-[4 rem] z-50">
  <div className="flex-1">
    <Link to="/feed" className="btn btn-ghost text-xl">😎DevTinder</Link>
  </div>
  <div className="flex-none gap-2 mx-5">
    {user && (<div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className=" avatar gap-6 flex items-center">
       <p>Welcome {user.firstName}</p>
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoURL} />
        </div>

      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to='/profile' className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to='/connections'>Connections</Link></li>
        <li><Link to='/requests'>Request</Link></li>
        <li  onClick={handleLogout}><a>Logout</a></li>
      </ul>
    </div>)}
  </div>
</div>
  )
}

export default NavBar