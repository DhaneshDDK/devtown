import './App.css';
import { fetchAllProducts } from './Services/Operations/Product';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from './Redux/Slices/ProductSlice';
import Navbar from './Componenets/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import { setLoading } from './Redux/Slices/ProductSlice';
import LoginPage from './Pages/LoginPage';
import SingUpPage from './Pages/SignUpPage';
import { useSelector } from 'react-redux';
import { setUserData } from './Redux/Slices/userSlice';
import { verifyUserToken } from './Services/Operations/User';
import Cart from './Pages/Cart';
import Orders from './Pages/Orders';

function App() {
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);
  // console.log(token);
  useEffect(()=>{
    const fetchData = async ()=>{ 
      dispatch(setLoading(true));
      try {
         const data = await fetchAllProducts();
         dispatch(setProducts(data?.data?.response));
      } catch (error) {
         console.log(error);
      }
      dispatch(setLoading(false));
    }


   const checkToken = async ()=>{
    
      try { 
         const res = await verifyUserToken(token);
         // console.log(res.data)
         if(res?.data?.success) dispatch(setUserData(res?.data?.data));
      } catch (error) {
         console.log(error);
      }
   
   }

    if(token) checkToken();
    fetchData();
  },[])
  
  return (
    <div className="">
      <Navbar/>
      <Routes>
         <Route path="/" element = {<Home/>} />
         <Route path="/login" element= {<LoginPage/>}/>
         <Route path="/signup" element= {<SingUpPage/> }/>
         <Route path="/cart" element= {<Cart/>}/>
         <Route path="/myproducts" element= {<Orders/>}/>
      </Routes>
    </div>
  );
}

export default App;
