import {useReducer,createContext, useEffect,useContext,useState} from 'react';
import axios from '../useAxios'
import {useAuth} from './AuthContext'
import { successToast, warningToast } from '../UI/Toast/Toast';

export const CheckoutContext=createContext();

export const useCheckout=()=>useContext(CheckoutContext)

export const CheckoutContextProvider=({children})=>{
    const [loading,setLoading]=useState(false)
    const {token,userId}=useAuth()
    
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

    useEffect(()=>{
        (
            async ()=>{
                if(token){
                    const {data:{data}}=await axios.get(`/api/addresses/${userId}`,config)
                    dispatch({
                        type:"ADD_USER_ADDRESSES",
                        payload:[...data]
                    })
                }
            }
        )()
    },[token,userId])

    useEffect(()=>{
        (
            async ()=>{
                if(token){
                    const {data:{data}}=await axios.get(`/api/payments/${userId}`,config)
                    dispatch({
                        type:"ADD_USER_PAYMENTS",
                        payload:[...data]
                    })
                }
            }
        )()
    },[token,userId])

    const addNewAddress=async (body)=>{
        setLoading(true)
        try{
            const {data:{data}}=await axios.post(`/api/addresses/${userId}`,body,config)
            dispatch({
                type:"ADD_USER_ADDRESSES",
                payload:[...data]
            })
            successToast("Address added")
            setLoading(false)
        }catch(error){
            console.log(error);
            warningToast("Unable to add address")
            setLoading(false)
        }
    }

    const deleteAddress=async (addressId)=>{
        setLoading(true)
        try{
            const {data:{data}}=await axios.delete(`/api/addresses/${addressId}/users/${userId}`,config)
            dispatch({
                type:"ADD_USER_ADDRESSES",
                payload:[...data]
            })
            setLoading(false)
            successToast("Address deleted")
        }catch(error){
            console.log(error);
            setLoading(false)
            warningToast("unable to delete address")
        }
    }

    const addNewPayment=async (body)=>{
        setLoading(true)
        try{
            const {data:{data}}=await axios.post(`/api/payments/${userId}`,body,config)
            dispatch({
                type:"ADD_USER_PAYMENTS",
                payload:[...data]
            })
            setLoading(false)
            successToast("Payment detail added")
        }catch(error){
            console.log(error);
            setLoading(false)
            warningToast("Unable to add Payment detail")
        }
    }

    const deletePaymentDetails=async (paymentId)=>{
        setLoading(true)
        try{
            const {data:{data}}=await axios.delete(`/api/payments/${paymentId}/users/${userId}`,config)
            dispatch({
                type:"ADD_USER_PAYMENTS",
                payload:[...data]
            })
            setLoading(false)
            successToast("Payment detail deleted")
        }catch(error){
            console.log(error);
            setLoading(false)
            warningToast("Unable to delete Payment detail")
        }
    }

    const placeOrder=async (body)=>{
        setLoading(true)
        try{
            await axios.post(`/api/orders/${userId}`,body,config)
            dispatch({type:"PLACE_ORDER"})
            setLoading(false)
            successToast("Order placed successfully")
        }catch(error){
            console.log(error);
            setLoading(false)
            warningToast("Unable to delete Payment detail")
        }
    }

    const checkoutActions=(state,action)=>{
        switch (action.type) {
            case "ADD_USER_ADDRESSES":
                return{
                    ...state,
                    userAddresses:[...action.payload]
                }
            case "ADD_USER_PAYMENTS":
                return{
                    ...state,
                    userPaymentDetails:[...action.payload]
                }
            case "ADD_ADDRESS":
                return{
                    ...state,
                    address:state.userAddresses.filter(({_id})=>_id===action.payload)[0]
                }
            case "MOVE_TO_ADDRESS":
                return{
                    ...state,
                    currentState:"ADDRESSPAGE"
                }
            case "MOVE_TO_PAYMENT":
                return{
                    ...state,
                    currentState:"PAYMENTPAGE"
                }
            case "MOVE_TO_ORDER_SUMMARY":
                return{
                    ...state,
                    currentState:"ORDERSUMMARY"
                }
            case "ADD_PAYMENT_DETAILS":
                return{
                    ...state,
                    paymentDetails:action.payload==="COD"?"COD":state.userPaymentDetails.filter(({_id})=>_id===action.payload)[0]
                }
            case "PLACE_ORDER":
                return{
                    ...state,
                    currentState:"ORDERPLACED"
                }
            default:
                return state
        }
    }


    const [state,dispatch]=useReducer(checkoutActions,{
        address:null,
        paymentDetails:null,
        currentState:"ADDRESSPAGE",
        userAddresses:[],
        userPaymentDetails:[]
    })

    return(
        <CheckoutContext.Provider
            value={{
                dispatch:dispatch,
                address:state.address,
                userAddresses:state.userAddresses,
                userPaymentDetails:state.userPaymentDetails,
                paymentDetails:state.paymentDetails,
                currentState:state.currentState,
                addNewAddress:addNewAddress,
                deleteAddress:deleteAddress,
                addNewPayment:addNewPayment,
                deletePaymentDetails:deletePaymentDetails,
                placeOrder:placeOrder,
                checkoutLoading:loading
            }}
        >
            {children}
        </CheckoutContext.Provider>
    )
}