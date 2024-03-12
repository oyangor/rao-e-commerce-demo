import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authSlice'
import Cart from '../cart/Cart'
import { toggleShowCart } from '../../redux/cartSlice'


function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showCart, products } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
    // console.log(user);
  }

  const handleToggleCart = () => {

    dispatch(toggleShowCart())

  }

  return (
    <div className=' p-2 h-[75px] w-[100%] border-b border-solid border-gray-500'>
      <div className="h-[100%] w-[100%] flex items-center justify-between">
        <Link to='/' className='left '>
          <h1 className="text-black text-3xl font-bold  hover:border-dotted ">RAO BUY&SELL</h1>
        </Link>
        <div className="flex items-center gap-[20px] ">
          <Link to='/create' className='createBtn text-[20px] '>
            Create
          </Link>
          <span className='text-[20px] italic capitalize cursor-default'>{user?.username}</span>
          <span className="logoutBtn text-[20px] hover:text-[#666] transition-all duration-150 cursor-pointer" onClick={handleLogout}>Logout</span>
          <div className="cartContainer relative text-lg cursor-pointer" onClick={handleToggleCart}>
            <AiOutlineShoppingCart />
            {/* <Link to='/cart'>
              
            </Link> */}
            <span className="cartNumber absolute top-[-0.75rem] right-[-0.75rem] w-4 h-4 rounded-full bg-blue-900 text-white flex items-center justify-center">
              {products?.length}
            </span>
          </div>

        </div>
        {showCart && <Cart />}
      </div>
    </div>
  )
}

export default Navbar