import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Body from './components/Body'
import Profile from './components/Profile'
import Feed from './components/Feed'
import Login from './components/Login'
import Signup from './components/Signup'
import { Provider } from 'react-redux'
import store from './components/appStore/Store'
import Connections from './components/Connections'
import Requests from './components/Requests'
import Chat from './components/Chat'

const App = () => {
  return (
    <>
    <Provider store={store}>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path='/chat/:targetUserId' element={<Chat/>}/>
             </Route>
          </Routes>
    </Provider>
    </>
  )
}

export default App