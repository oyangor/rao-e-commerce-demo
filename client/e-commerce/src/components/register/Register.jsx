import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/authSlice'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(false)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()
    try {
      if (confirmPassword !== password) {
        throw new Error('Password are not the same')
      }

      const res = await fetch('http://localhost:5000/auth/register', {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({ username, email, password })
      })

      if (res.status === 500) {
        throw new Error('User already registered')

      } else if (res.status === 404) {
        throw new Error('Wrong credentials')
        setError(true)
      }

      const data = await res.json()
      //console.log(data);
      dispatch(register(data)) //object with others and token
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
        <h2 className="text-2xl font-bold text-gray-800 ml-[50px] mb-[20px] ">Register</h2>
        <form className='flex flex-col gap-5' onSubmit={handleRegister}>
          <label htmlFor="username" >
            <input required type="text" id='username' placeholder='Enter Username' className='rounded-xl p-3 placeholder:italic' onChange={(e) => setUsername(pev => e.target.value)} />
          </label>
          <label htmlFor="email" >
            <input required type="email" id='email' placeholder='Enter email' className='rounded-xl p-3 placeholder:italic' onChange={(e) => setEmail(pev => e.target.value)} />
          </label>
          <label htmlFor="password" >
            <input required type="password" id='password' placeholder='Enter Password' className='rounded-xl p-3 placeholder:italic' onChange={(e) => setPassword(pev => e.target.value)} />
          </label>
          <label htmlFor="confirmpassword" >
            <input required type="password" id='confirmpassword' placeholder='Confirm Password' className='rounded-xl p-3 placeholder:italic' onChange={(e) => setConfirmPassword(pev => e.target.value)} />
          </label>
          <button type="submit" className='bg-blue-700 rounded-xl text-white py-y w-auto md:70px  hover:bg-blue-500' onClick={handleRegister}>Register</button>
          <Link to='/login'>
            Already have an account? <span><i><u className='hover:text-gray-600'>login</u></i></span>
          </Link>
        </form>
        {
          error && <div className='h-[70px] w-[250px] align-middle rounded-lg py-3 px-5 bg-red-900  text-white absolute top-20 right-20'>User already registered! Try again</div>
        }
      </div>
    </div>
  )
}

export default Register