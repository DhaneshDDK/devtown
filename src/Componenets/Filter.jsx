import React from 'react'
import { CiSearch } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { fetchFiltered } from '../Services/Operations/Product';
import { setProducts } from '../Redux/Slices/ProductSlice';

const Filter = () => {
    const dispatch = useDispatch();
    const [search , setSearch] = useState(false);

    const inputHandler =  async (e)=>{
          const res = await fetchFiltered(e.target.value);
        //   console.log(res?.data?.data);
          dispatch(setProducts(res?.data?.data));
    }

    const handleSearchClick = () => {
        document.getElementById('searchInput').focus();
        setSearch(true);
    };


  return (
    <div className=''>
       
       <div className='relative min-h-10 mt-1'>  
       <input type = "search" id="searchInput" placeholder='Search here....'
        onChange={(e)=>{inputHandler(e)}} 
        className={` transition-all duration-200 bg-slate-500 ease-in-out px-4 py-2 rounded-md text-white font-mono outline-none pr-12 lg:${search? "w-[100%] " : "hidden"} `} />
       <div className={`absolute right-2 top-1 ${search?"text-black":"text-white"} cursor-pointer `} onClick={handleSearchClick}> <CiSearch size={30} /></div>
       </div>
    </div>
  )
}

export default Filter
