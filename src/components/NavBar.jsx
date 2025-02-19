import React from 'react'
import { useSelector } from 'react-redux'

const NavBar = () => {
  const user = useSelector(state => state.user)
  console.log('user from store',user.value.firstName);
  
  return (
    <div className="navbar bg-base-300 fixed top-0 z-50">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">😎DevTinder</a>
  </div>
  <div className="flex-none gap-2 mx-5">
    { user.value.firstName && (<div className="dropdown flex items-center gap-4 dropdown-end">
    <p>Welcome {user.value.firstName}</p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.value.photoURL} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>)}
  </div>
</div>
  )
}

export default NavBar