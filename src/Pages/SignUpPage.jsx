import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signup } from '../Services/Operations/User'

const SingUpPage = () => {
    const [formData, setFormData] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword : "",
    })

    const handleOnChange = (e)=>{
         setFormData((prev)=>(
            {
                ...prev, [e.target.name] : e.target.value,
            }
         ))
    }

    
    const {name,email,password,confirmPassword} = formData;
    const navigation = useNavigate();
    const dispatch = useDispatch();


    const submitHandler = (e)=>{
        e.preventDefault();
        // console.log(email,password,confirmPassword)
        signup(name,email,password,confirmPassword,navigation);
    }

  return (
    <div className='flex items-center bg-slate-900 h-[calc(100vh-2rem)]   justify-center flex-col gap-y-10 mt-[-3em]'>
         
    <div className='text-white text-[28px] mx-auto font-bold'>Welcome to FloppyMart</div>

      <form onSubmit={submitHandler}
       className='w-[100%] md:w-[670px]  mx-auto h-[400px] flex flex-col gap-y-6 rounded-md py-6 px-0 ' >
       
       <input type="text"
       placeholder='Enter your name'
       name='name'
       value = {name}
       onChange={handleOnChange}
       required
        className="rounded-md p-[12px] text-richblack-5 outline-none font-mono text-[14px] font-bold w-[70%] mx-auto "
       />

       <input type="text"
       placeholder='Enter your email address'
       name='email'
       value = {email}
       onChange={handleOnChange}
       required
        className="rounded-md p-[12px] text-richblack-5 outline-none font-mono text-[14px] font-bold w-[70%] mx-auto "
       />

       <input type="password"
       placeholder='Enter your password'
       name = 'password'
       value={password}
       onChange={handleOnChange}
       required
        className="rounded-md p-[12px] text-richblack-5 outline-none font-mono text-[14px] font-bold w-[70%] mx-auto "
       />

       <input type= "password"
       placeholder='Confirm password'
       name='confirmPassword'
       value={confirmPassword}
       onChange={handleOnChange}
       required
        className="rounded-md p-[12px] text-richblack-5 outline-none font-mono text-[14px] font-bold w-[70%] mx-auto "
       />
      
       <button type='submit' className='py-2 rounded-md px-4 bg-green-600 w-fit mx-auto text-[18px] font-bold'>Signup</button>

      </form>
  </div>
  )
}

export default SingUpPage
