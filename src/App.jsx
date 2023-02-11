import './styles/App.css'
import Products from './pages/Products'
import Homepage from './pages/Homepage'
import Product from './pages/Product'
import Card from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Routes, Route } from 'react-router-dom'
import Layout from './outlets/Layout'
import PrivateRoutes from './outlets/PrivateRoutes'
import AuthRoutesProvider from './outlets/AuthRoutesProvider'
import Registered from './pages/Registered'
import CheckEmail from './pages/CheckEmail'
import Logged from './pages/Logged'
import Profile from './pages/Profile'
import Orders from './components/profile/Orders'
import OrderDetails from './components/profile/OrderDetails'
import Favorites from './components/profile/Favorites'
import Info from './components/profile/Info'
import Address from './components/profile/Address'

import Checkout from './pages/Checkout'

function App() {

  return (
    <div className="App">

      <Routes>
        <Route path='https://tello.netlify.app' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:product' element={<Product />} />
          <Route element={<AuthRoutesProvider />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signup/success' element={<Registered />} />
            <Route path='/login/logged/:token' element={<Logged />} />
            <Route path='/login/checkEmail' element={<CheckEmail />} />
          </Route>
          <Route element={<PrivateRoutes />} >
            <Route path='/profile' element={<Profile />}>
              <Route path='/profile/orders' element={<Orders />} />
              <Route path='/profile/orders/:order' element={<OrderDetails/>} />
              <Route path='/profile/favorites' element={<Favorites />} />
              <Route path='/profile/info' element={<Info />} />
              <Route path='/profile/address' element={<Address />} />
            </Route>
            <Route path='/card' element={<Card />} />
            <Route path='/checkout' element={<Checkout />} />
          </Route>
        </Route>
      </Routes>

    </div>
  )
}

export default App
