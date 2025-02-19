import React from 'react'
import { Route, Routes } from 'react-router'
import Body from './components/Body'
import Profile from './components/Profile'
import Feed from './components/Feed'
import Login from './components/Login'
import Signup from './components/Signup'
import { Provider } from 'react-redux'
import store from './components/appStore/Store'

const App = () => {
  return (
    <>
    <Provider store={store}>
    <Routes>
      <Route path='/' element={<Body/>}>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/feed' element={<Feed/>} />
        <Route path='/signup' element={<Signup/>} />
      </Route>
    </Routes>
    </Provider>
    </>
  )
}

export default App