import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../redux/authSlice'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const res = await fetch('https://rao-e-commerce-demo.onrender.com/auth/login', {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      if (res.status === 500 || res.status === 404) {
        throw new Error('Wrong credentials')
        setError(true)
      }

      const data = await res.json()
      //console.log(data);
      dispatch(login(data))
      navigate('/')

    } catch (error) {
      console.error(error)
      setError(true)
      setTimeout(() => { setError(prev => false) }, 2500)
    }
  }

  return (
    <div className="fixed inset-0 z-10 overflow-hidden flex items-center justify-center bg-aqua flex-col">
      <div className='bg-white rounded-md p-10'>
        <h2 className="text-2xl font-bold text-gray-800 ml-[50px] mb-[20px] ">Login</h2>
        <form className='flex flex-col gap-5' onSubmit={handleLogin}>
          <label htmlFor="email" >
            <input required type="email" id='email' placeholder='Enter Email' className='rounded-xl p-3 placeholder:italic' onChange={(e) => setEmail(pev => e.target.value)} />
          </label>
          <label htmlFor="password" >
            <input required type="password" id='password' placeholder='Enter Password' className='rounded-xl p-3 placeholder:italic' onChange={(e) => setPassword(pev => e.target.value)} />
          </label>
          <button type="submit" className='bg-blue-700 rounded-xl text-white py-y w-auto md:70px  hover:bg-blue-500' onClick={handleLogin}>Login</button>
          <Link to='/register'>
            Don't have an account?<p><u className='hover:text-gray-600'>Register now!</u></p>
          </Link>
        </form>
        {
          error && <div className='h-[70px] w-[250px] align-middle rounded-lg py-3 px-5 bg-red-900  text-white absolute top-20 right-20'>Wrong Credentials! Try again</div>
        }
      </div>
    </div>
  )
}

export default Login