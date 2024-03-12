import { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Cart from './components/cart/Cart'
import Checkout from './components/checkout/Checkout'
import Final from './components/final/Final'
import Create from './components/create/Create'
import AddressPage from './components/addresspage/AddressPage'
import ProductDetail from './components/productdetail/ProductDetail'
import Footer from './components/footer/Footer'



function App() {


  return <div className=''>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/final' element={<Final />} />
      <Route path='/create' element={<Create />} />
      <Route path='/addressDetails' element={<AddressPage />} />
      <Route path='/productDetail/:id' element={<ProductDetail />} />
    </Routes>
    <Footer />
  </div>
}

export default App
