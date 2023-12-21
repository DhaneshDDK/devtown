import apiConnector from "../apiConnector";
import { productEndpoints } from "../apis";
import toast from "react-hot-toast";

const {FETCH_ALL_PRODUCTS, FETCH_FILTERED_PRODUCTS, FETCH_PRICED_PRODUCTS} = productEndpoints;

export async function fetchAllProducts() {
    const toastId = toast.loading("Loading...");
    try {
        const data = await apiConnector("get", FETCH_ALL_PRODUCTS);
        toast.success("Products fetched successfully")
        toast.dismiss(toastId);
        return data;
    } catch (error) {
        console.log(error.message);
        toast.error(error.message);
        toast.dismiss(toastId);
    }
}

export const fetchFiltered = async (data)=>{
    try {
        const res = await apiConnector("post", FETCH_FILTERED_PRODUCTS, {data});
        // console.log(res);
        return res;
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchPricedProducts = async (data)=>{
    try {
        const res = await apiConnector("post", FETCH_PRICED_PRODUCTS, {data});
        // console.log(res);
        return res;
    } catch (error) {
        console.log(error.message);
    }
}