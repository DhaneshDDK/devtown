import React from 'react'
import { useState } from 'react'
import { login } from '../Services/Operations/User'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email : '',
    password : ''
  })

  const {email,password} = formData;
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e)=>{
    setFormData((prev)=>({
      ...prev, [e.target.name] : e.target.value
    }))
  }

  const handleOnSubmit = (e)=>{
    e.preventDefault();
    // console.log(email,password)
    login(email,password, navigation, dispatch);
  }

  return (
    <div className='flex items-center bg-slate-900  justify-center flex-col gap-y-10 h-[calc(100vh-2rem)]   mt-[-3em]'>
         
      <div className='text-white text-[28px] mx-auto font-bold'>Welcome to FloppyMart</div>

        <form onSubmit={handleOnSubmit}
         className='w-[100%] md:w-[670px] mx-auto  h-[400px] flex flex-col gap-y-6 rounded-md py-6 ' >
         
         <input type="text"
         name = "email"
         value = {email}
         onChange={handleOnChange}
         required
         placeholder='Enter your email address'
          className="rounded-md p-[12px] text-richblack-5 outline-none font-mono text-[14px] font-bold w-[70%] mx-auto "
         />
         <input type="password"
         placeholder='Enter your password'
         name = "password"
         value = {password}
         onChange={handleOnChange}
         required
          className="rounded-md p-[12px] text-richblack-5 outline-none font-mono text-[14px] font-bold w-[70%] mx-auto "
         />
        
         <button type='submit' className='py-2 rounded-md px-4 bg-green-600 w-fit mx-auto text-[18px] font-bold'>Login</button>

        </form>
    </div>
  )
}

export default LoginPage
