import React from 'react'
import { NavLink } from 'react-router-dom'
import Hamburger from 'hamburger-react'
import { IoStorefrontOutline } from "react-icons/io5";
import { useState, useEffect } from 'react';
import Nav from './Nav';

const Navbar = () => {

    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        const screenWidth = window.innerWidth;
        setOpen(screenWidth > 1020);
      };
  
      // Initial check on mount
      handleResize();
  
      // Add event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <div className=" bg-slate-900" >
        <div className='flex items-center justify-between h-20 max-w-6xl mx-auto'>
 
        <NavLink to="/">
                 <div className=" text-[20px] text-white font-bold flex items-center justify-center gap-2 ml-5"> <IoStorefrontOutline size={60} color='green' /> FloppyMart</div>
            </NavLink>
          

            { isOpen && <div className='absolute lg:relative lg:top-0 lg:right-0 top-20 border-2 px-2 py-4 rounded-lg bg-gray-900 right-5
            lg:border-0 lg:bg-transparent'><Nav/></div> }
            <div className='lg:hidden mr-5'><Hamburger toggled={isOpen} toggle={setOpen} color='white' /></div>

        </div>
    </div>
  )
}

export default Navbar
