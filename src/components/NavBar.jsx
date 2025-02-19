import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'

const NavBar = () => {
    const user = useSelector(state => state.user.value)
    // console.log(user);
  return (
    <div className="navbar bg-base-300 fixed top-0 z-50 h-[4 rem]">
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
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>

      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to='/profile' className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
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