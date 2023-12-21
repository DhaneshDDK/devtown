import React from 'react'
import {toast} from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { add, remove } from '../Redux/Slices/cartSlice'

const Product = ({product}) => {
    const {cart} = useSelector((state) => state.cart);
    const {user} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
  const addToCart = () => { 
    if(!user) navigate('/login');
   else { dispatch(add(product));
    toast.success("Item added to Cart");
   }
  }

  const removeFromCart = () => {
    if(!user) navigate('/login');
    else {
    dispatch(remove(product));
    toast.error("Item removed from Cart");
    }
  }
 


  return (
    <div className="flex flex-col items-center justify-center group font-serif
    hover:scale-105 transition duration-300 ease-in gap-3 p-4 mx-4 md:mx-0 rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0px_0px_95px_53px_#00000024]">
       <div>
        <p className=" text-center text-gray-700 font-semibold text-lg w-40 mt-1">{product.name}</p>
      </div>
      <div className="h-[100px]">
        <img src={product.image} className="h-full w-full rounded-2xl   "  alt='img'/>
      </div>

      <div className=' font-semibold text-green-500 text-[16px]'>Specifications</div>
 
      <table className='text-center text-[14px]'>
         <tbody>
         <tr>
            <td className=' text-gray-700 font-semibold'>Price</td>
            <td>:</td>
            <td className=' text-gray-700'>₹ {product.price}</td>
           </tr>
           <tr>
            <td className=' text-gray-700 font-semibold'>Battery</td>
            <td>:</td>
            <td className=' text-gray-700'>{product.battery}</td>
           </tr>
           <tr>
            <td className=' text-gray-700 font-semibold'>Processor</td>
            <td>:</td>
            <td className=' text-gray-700'>{product.processor}</td>
           </tr>
           <tr>
            <td className=' text-gray-700 font-semibold'>Memory</td>
            <td>:</td>
            <td className=' text-gray-700'>{product.memory}</td>
           </tr>
           <tr>
            <td className=' text-gray-700 font-semibold'>OS</td>
            <td>:</td>
            <td className=' text-gray-700'>{product.os}</td>
           </tr>
           <tr>
            <td className=' text-gray-700 font-semibold'>Simtype</td>
            <td>:</td>
            <td className=' text-gray-700'>{product.simtype}</td>
           </tr>
         </tbody>
      </table>


     {
          (cart.some((p) => p.name === product.name) && user) ?
          (<button
          className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
           group-hover:bg-gray-700
          group-hover:text-white transition duration-300 ease-in"
          onClick={removeFromCart}>
            Remove Item
          </button>) :
          ( 
            <button
          className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase mt-2
          group-hover:bg-gray-700
          group-hover:text-white transition duration-300 ease-in"
          onClick={addToCart}
          >
            Add to Cart
          </button>
         )
        } 

    </div>
  )
}

export default Product
