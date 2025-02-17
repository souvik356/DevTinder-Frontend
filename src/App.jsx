import React from 'react'
import { Route, Routes } from 'react-router'
import Body from './components/Body'
import Profile from './components/Profile'
import Feed from './components/Feed'
import Login from './components/Login'
import Signup from './components/Signup'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Body/>}>
        <Route path='profile' element={<Profile/>}/>
        <Route path='feed' element={<Feed/>} />
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>} />
      </Route>
    </Routes>
    </>
  )
}

export default App