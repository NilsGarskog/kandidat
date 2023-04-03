import React, { useState } from 'react'
import { useAuth } from '../context/authContext'

function validateEmailAddress(input) {
  var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  if (regex.test(input)) {
    return 1;
  } else {
    return -1;
  }
}

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoggingIn, setIsLogginIn] = useState(true)

  const { login, signUp, currentUser } = useAuth()
  console.log(currentUser)
  async function submitHandler() {
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    if (isLoggingIn) {
      try {
        await login(email, password)

      } catch (err) {
        setError('Incorrect email or password')

      }
      return
    }
    if (validateEmailAddress(email) === -1) {
      setError('Invalid Email')
      return
    }
    else if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    await signUp(email, password)


  }

  return (
    <div className='flex sm:flex-row flex-col p-10'>
      <div className=''>
        <h1 className='font-bold sm:text-xl sm:w-1/2  break-word '>Welcome to Travel Planner!<br></br> Finding the best way fit all of the activities and places you want to visit has never been easier.<br></br>  To get started, please sign in or register.</h1>
      </div>
      <div className='flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-2 sm:gap-4'>
        <h1 className='font-extrabold text-2xl sm:text-4xl select-none uppercase'>{isLoggingIn ? 'Login' : 'Register'}</h1>
        {error && <div className='w-full select-none max-w-[40ch] border-rose-400 text-rose-400 py-2 border border-solid text-center'>{error}</div>}
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Adress..." className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]'></input>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]'></input>
        <button onClick={submitHandler} className="w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full 
      after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900">
          <h2 className='relative z-20'>
            SUBMIT
          </h2></button>
        <h2 className="duration-300 hover:scale-110 cursor-pointer" onClick={() => setIsLogginIn(!isLoggingIn)}>{!isLoggingIn ? 'Login' : 'Register'}</h2>
      </div>
    </div>
  )
}
