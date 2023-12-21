import { toast } from "react-hot-toast";
import apiConnector from "../apiConnector";
import { resetCart } from "../../Redux/Slices/cartSlice";
import { paymentEndPoints } from "../apis";
import { setUserData } from "../../Redux/Slices/userSlice";

const {INITIATE_PAYMENT, VERIFY_PAYMENT} = paymentEndPoints;

export const initPayment = async (cart,amount,user,navigate, dispatch,token)=>{
    // console.log(cart,amount,name,email, token);
    const {name,email, id} = user;
    try {
        const orderResponse = await apiConnector("post", INITIATE_PAYMENT, {amount});
        // console.log(orderResponse.data.response);
          
        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        var options = {
            key: "rzp_test_8LAXuuI2163nzN",
            amount : orderResponse?.data.response.amount,
            currency : orderResponse?.data.response.currency,
            order_id : orderResponse?.data.response.id,
            name : "FloppyMart",
            description: "Thank You for Purchasing out products",
            prefill: {
                name:name,
                email:email
            },
            theme: {
                color: "#2AAA8A"
            },

            handler : (response)=>{
                verifyPayment({...response, cart, name ,email, id},navigate, dispatch);
            }

        }

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', (error)=>{
            toast.error("Payment failed");
        })

    } catch (error) {
        console.log(error);
    }
}

const verifyPayment = async (bodyData, navigate, dispatch) => {
    const toastId = toast.loading("Verifying Payment....");
    try {
        const response = await apiConnector("post",  VERIFY_PAYMENT, bodyData);
        // console.log(response.data.data);
         if(!response.data.success) {
            throw new Error(response.data.message);
        }
        
        toast.success("Payment Successful");
        dispatch(resetCart());
        // console.log(response?.data?.data)
        dispatch(setUserData(response?.data?.data));
        navigate("/");

    } catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment"); 
    }
    toast.dismiss(toastId);
}