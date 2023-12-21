import { userEndPoints } from "../apis";
import apiConnector from "../apiConnector";
import {toast} from "react-hot-toast";
import { setToken, setUserData } from "../../Redux/Slices/userSlice";

const {LOGIN_API, SIGNUP_API, VERIFY_USER} = userEndPoints;

export const signup = async (name,email,password,confirmPassword,navigation)=>{
    // console.log(email,password,confirmPassword)
    const toastId = toast.loading("Loading...");

    try {
        const res = await apiConnector('post',SIGNUP_API,{name,email,password,confirmPassword});
        // console.log(res);
        toast.success("Signed up successfully")
        navigation('/login');
    } catch (error) {
        console.log(error);
        toast.error("SignUp failed || User already exists")
    }
    toast.dismiss(toastId)
}


export const login = async (email,password,navigation,dispatch)=>{
    const toastId = toast.loading("Loading...");
    // console.log(email,password);
    try {
        const res = await apiConnector('post',LOGIN_API,{email,password});
        // console.log(res);
        toast.success("LoggedIn successfully")

        dispatch(setToken(res.data.token))
        dispatch(setUserData(res.data.user1))

        localStorage.setItem("token", JSON.stringify(res.data.token))
        localStorage.setItem("user", JSON.stringify(res.data.user1))

        navigation('/');

    } catch (error) {
        console.log(error);
        toast.error("Login failed")
    }
    toast.dismiss(toastId)
}

export const signout = async (navigate,dispatch)=>{
    dispatch(setToken(null))
    dispatch(setUserData(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
}


export const verifyUserToken = async (token)=>{
    try {
        const res = await apiConnector("post", VERIFY_USER, {token});
        return res;
    } catch (error) {
        console.log(error.message);
    }
}