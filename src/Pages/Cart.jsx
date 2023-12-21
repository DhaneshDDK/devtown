import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Item from '../Componenets/Item'
import { initPayment } from '../Services/Operations/Payment'

const Cart = () => {

  const {cart, totalPrice} = useSelector((state)=>state.cart);
  const {user,token} = useSelector((state)=>state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(user);
  const checkOutHandler = async ()=>{
    try {
        const res = await initPayment(cart,totalPrice, user ,navigate, dispatch, token);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div>
       {
    cart?.length > 0  ? 
    (
      <div className='max-w-[1200px] mx-auto flex flex-col md:flex-row justify-center'>


      <div className='w-[100%] md:w-[60%] flex flex-col p-2'>
        {
          cart.map( (item,index) => {
            return <Item key={index} item={item} itemIndex={index} length = {cart?.length} />
          } )
        }
      </div>

      <div className='w-[100%] md:w-[40%] mt-5  flex flex-col'>

        <div className='flex flex-col p-5 gap-5 my-14  h-[100%] '>
         <div className='flex flex-col gap-0 font-bold'>
          <div className='text-xl text-green-800 uppercase font-bold'>Your Cart</div>
          <div className='font-bold text-5xl text-green-700 uppercase '>Summary</div>
          <p className=' text-xl'>
            <span className='text-gray-700 font-semibold text-xl'>Total Items: {cart?.length}</span>
          </p>
       </div>
       

        <div className='flex flex-col'>
          <p className='text-xl text-gray-700 font-semibold'>Total Amount:  ₹ {totalPrice}</p>
          <button 
            onClick={checkOutHandler}
          className='bg-green-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-bold hover:text-green-700 p-3 text-xl'>
            CheckOut Now
          </button>
        </div>

      </div>

      </div>
    </div>) : 

    (<div className='min-h-[80vh] flex flex-col items-center justify-center'>
      <h1 className='text-gray-700 font-semibold text-xl mb-2'>Cart Empty</h1>
      <Link to={"/"}>
        <button className='bg-green-600 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-semibold hover:text-green-700 p-3 px-10 tracking-wider'>
          Shop Now
        </button>
      </Link>
    </div>)
  }
    </div>
  )
}

export default Cart
