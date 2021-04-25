import {useReducer,createContext, useEffect,useContext} from 'react';
import axios from 'axios'
import {AuthContext} from './AuthContext'
import { successToast, warningToast } from '../UI/Toast/Toast';

export const CheckoutContext=createContext();

export const CheckoutContextProvider=({children})=>{
    const {token,userId}=useContext(AuthContext)
    
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
        try{
            const {data:{data}}=await axios.post(`/api/addresses/${userId}`,body,config)
            dispatch({
                type:"ADD_USER_ADDRESSES",
                payload:[...data]
            })
            successToast("Address added")
        }catch(error){
            console.log(error);
            warningToast("Unable to add address")
        }
    }

    const deleteAddress=async (addressId)=>{
        try{
            const {data:{data}}=await axios.delete(`/api/addresses/${addressId}/users/${userId}`,config)
            dispatch({
                type:"ADD_USER_ADDRESSES",
                payload:[...data]
            })
            successToast("Address deleted")
        }catch(error){
            console.log(error);
            warningToast("unable to delete address")
        }
    }

    const addNewPayment=async (body)=>{
        try{
            const {data:{data}}=await axios.post(`/api/payments/${userId}`,body,config)
            dispatch({
                type:"ADD_USER_PAYMENTS",
                payload:[...data]
            })
            successToast("Payment detail added")
        }catch(error){
            console.log(error);
            warningToast("Unable to add Payment detail")
        }
    }

    const deletePaymentDetails=async (paymentId)=>{
        try{
            const {data:{data}}=await axios.delete(`/api/payments/${paymentId}/users/${userId}`,config)
            dispatch({
                type:"ADD_USER_PAYMENTS",
                payload:[...data]
            })
            successToast("Payment detail deleted")
        }catch(error){
            console.log(error);
            warningToast("Unable to delete Payment detail")
        }
    }

    const placeOrder=async (body)=>{
        try{
            await axios.post(`/api/orders/${userId}`,body,config)
            dispatch({type:"PLACE_ORDER"})
            successToast("Order placed successfully")
        }catch(error){
            console.log(error);
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
                placeOrder:placeOrder
            }}
        >
            {children}
        </CheckoutContext.Provider>
    )
}