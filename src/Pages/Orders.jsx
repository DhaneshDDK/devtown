import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';

const Orders = () => {
    const {user} = useSelector((state)=>state.auth);
    const products = user?.products;
    useEffect(()=>{},[user]);
    
  return (
    <div className='bg-slate-900 pb-10  min-h-[calc(100vh-2rem)]'>
        {
           (products?.length===0)? <div className='text-center p-10 font-bold text-[30px] text-white'>No orders found</div> :

            <div className='flex flex-col gap-2 w-[100%] items-center justify-center pt-10'>
            
            <div className='pb-2 text-[20px] text-white font-bold'>MY ORDERS</div>
                
            <div className='relative shadow-md sm:rounded-lg px-2 '>
          <table className='w-[100%] text-sm text-left text-gray-400'>
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
                <th className="px-6 py-3">  Image </th>
                <th className="px-6 py-3">  Name  </th>
                <th className="px-6 py-3">  Price   </th>
                <th className="px-6 py-3">  Battery     </th>
                <th className="px-6 py-3">  Memory </th>
                <th className="px-6 py-3">  OS </th>
                <th className="px-6 py-3">  Simtype </th>
            </tr>
        </thead>

        {
                    products?.map((item,idx)=>(
                        <tbody key={idx}>
                <tr className='border-b bg-gray-800 border-gray-700'>
                <th  className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    <img src={item.image} alt="" width={50}/>
                </th>
                <th  className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    {item.name}
                </th>
                <th  className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    {item.price}
                </th>
                <th  className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    {item.battery}
                </th>
                <th  className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    {item.memory}
                </th>
                <th  className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    {item.os}
                </th>
                <th  className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    {item.simtype}
                </th>
                </tr>
            </tbody>
                    ))
                }

          </table>
    </div>
                
                
              
            </div>
          
        }
    </div>
  )
}

export default Orders
