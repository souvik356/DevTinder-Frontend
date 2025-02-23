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

const App = () => {
  return (
    <>
    <Provider store={store}>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Login />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
             </Route>
          </Routes>
    </Provider>
    </>
  )
}

export default App