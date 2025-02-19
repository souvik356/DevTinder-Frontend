import React from 'react'
import { Route, Routes } from 'react-router'
import Body from './components/Body'
import Profile from './components/Profile'
import Feed from './components/Feed'
import Login from './components/Login'
import Signup from './components/Signup'
<<<<<<< HEAD
import { Provider} from 'react-redux'
import appStore from './AppStore/store'
=======
import { Provider } from 'react-redux'
import store from './components/appStore/Store'
>>>>>>> efb2861615c702709a853f27c8b9d42a8f7b1f8b

const App = () => {
  return (
    <>
<<<<<<< HEAD
    <Provider store={appStore}>
=======
    <Provider store={store}>
>>>>>>> efb2861615c702709a853f27c8b9d42a8f7b1f8b
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