import React from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { signout } from '../Services/Operations/User'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Filter from './Filter'
import { fetchPricedProducts } from '../Services/Operations/Product'
import { setProducts } from '../Redux/Slices/ProductSlice'

const Nav = () => {
    const {user} = useSelector((state)=>state.auth);
    const {cart} = useSelector((state)=>state.cart);
    const [modal,setModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const priceHandler =  async (e)=>{
       let val = e.target.value;
       val = val.split('-');
       const res  = await fetchPricedProducts(val);
      //  console.log(res?.data.data)
       dispatch(setProducts(res?.data?.data));
    }
    
  return (
    <div>
       <div className="flex flex-col lg:flex-row items-center justify-center font-medium text-slate-100 lg:mr-5 px-2 lg:gap-0 gap-4 lg:space-x-6">
           

            <div><Filter/></div>

            <div>
            <select className=' rounded-md font-serif outline-none text-slate-300 bg-slate-600 p-1'
                         onChange={(e)=>{priceHandler(e)}}
                    >
                   <option value={""}>Price range</option>
                   <option value={"0-10000"}>0-10,000</option>
                   <option value={"10000-15000"}>10,000-15,000</option>
                   <option value={"15000-20000"}>15,000-20,000</option>
                   <option value={"20000-30000"}>20,000-30,000</option>
                   <option value={"30000-50000"}>30,000-50000</option>
                   <option value={"50000-80000"}>50,000-80,000</option>
                   <option value={"80000-100000"}>80,000-1,00,000</option>
                   <option value={"100000"}>Above 1,00,000</option>
             </select>
            </div>

            
            <NavLink to="/">
              <p className=' font-bold hover:text-green-400'>Home</p>
            </NavLink>

           
            {user && <NavLink to='/myproducts'> <p className='hover:text-green-400'>Orders</p></NavLink>}
            

        <NavLink to={user? "/cart" : "/login"}>
              <div className="relative">
                  <FaShoppingCart className="text-2xl"/>
                  {
                    cart.length > 0 && user && 
                    <span
                    className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                    justify-center items-center animate-bounce rounded-full text-white" 
                    >{cart.length}</span>
                  }
                  
              </div>
            </NavLink>
             
             
            {!user && <NavLink to='/login' className="border-2 hover:text-green-400  px-2 py-1 rounded-md bg-slate-800 shadow-md shadow-slate-500">Login</NavLink>}
            {!user && <NavLink to='/signup' className="border-2 hover:text-green-400 px-2 py-1 rounded-md bg-slate-800 shadow-md shadow-slate-500">Signup</NavLink>}
            {user && <div onClick={()=>setModal(true)} className="border-2 cursor-pointer hover:text-red-500 px-2 py-1 rounded-md bg-slate-800 shadow-md shadow-slate-500">Signout</div>}
            
          </div>


          
      {
        modal &&
       <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
       
      <div className="w-11/12 flex flex-col items-center justify-center gap-8 max-w-[450px] rounded-lg border border-gray-950 bg-slate-800 p-6 py-12">
        <p className="text-2xl font-semibold text-white">
          Do u really want to signout
        </p>
       
        <div className="flex items-center gap-x-4">
      
          <button
            className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold  text-red-500 border-2"
            onClick= {()=>{signout(navigate,dispatch); setModal(false);}}
          >
            Signout
          </button>
          <button
            className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-green-300 border-2"
            onClick={()=>setModal(false)}
          >
            Cancel
          </button>
        </div>
       </div>

      </div>
      }

    </div>
  )
}

export default Nav
