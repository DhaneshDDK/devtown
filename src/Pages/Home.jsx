import React from 'react'
import { useSelector } from 'react-redux'
import Product from '../Componenets/Product';
import { useEffect, useState } from 'react';
import {SpinnerRoundOutlined} from 'spinners-react'

const Home = () => {
  const {products, loading} = useSelector((state)=>state.product);
  const [pageNumber, setPageNumber] = useState(1);
  const [slicedProducts, setSlicedProducts] = useState([]);

  useEffect(()=>{
    setSlicedProducts(products?.slice((pageNumber-1)*20,(pageNumber)*20));
  },[pageNumber, products]);


  const nextPage = async ()=>{
    if(pageNumber === Math.max(1,Math.ceil(products?.length/20))) (setPageNumber(1));
    else (setPageNumber(pageNumber+1));
 }
 const prevPage = async ()=>{
    if(pageNumber === 1) (setPageNumber(Math.max(Math.ceil(products?.length/20),1)));
    else (setPageNumber(pageNumber-1));
 }


  return (
    <div className='px-5'>
     
     {
        (loading)?  <SpinnerRoundOutlined  className=' mt-5 w-[100vw] mx-auto flex justify-center items-center'/> :
             slicedProducts?.length === 0 ?  <div className="flex justify-center items-center">
                        <p className='text-center text-[35px] font-bold mt-10'>No Data Found</p>
                </div>
            : 

            (
                <div>
                     <div className="grid gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mt-10 mx-auto gap-5 ">
                       {
                        slicedProducts?.map((product, idx)=>{
                           return <Product key={idx} product={product} />
                        })
                       }
                     </div>

                     <div className="font-mono mb-10 mt-5 text-right flex items-center justify-center gap-5">
          <button className="text-[18px] bg-green-500 rounded-lg px-4 py-2" onClick={prevPage}>Prev </button>
           <div className='font-semibold text-[20px]'> {pageNumber}/{Math.ceil(products?.length/20)} </div>
          <button className="text-[18px] bg-green-500 rounded-lg px-4 py-2" onClick={nextPage}>Next </button>
         </div>
                     </div>
            )
        
     }
     
   
      
    </div>
  )
}

export default Home
