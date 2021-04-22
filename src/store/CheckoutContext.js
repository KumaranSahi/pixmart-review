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
            warningToast("Address deleted successfully")
        }
    }

    const checkoutActions=(state,action)=>{
        switch (action.type) {
            case "ADD_USER_ADDRESSES":
                return{
                    ...state,
                    userAddresses:[...action.payload]
                }
            case "ADD_ADDRESS":
                return{
                    ...state,
                    address:action.payload
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
                    paymentDetails:{...action.payload}
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
        userAddresses:[]
    })

    return(
        <CheckoutContext.Provider
            value={{
                dispatch:dispatch,
                address:state.address,
                userAddresses:state.userAddresses,
                paymentDetails:state.paymentDetails,
                currentState:state.currentState,
                addNewAddress:addNewAddress,
                deleteAddress:deleteAddress
            }}
        >
            {children}
        </CheckoutContext.Provider>
    )
}