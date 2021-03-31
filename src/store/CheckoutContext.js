import {useReducer,createContext} from 'react';

export const CheckoutContext=createContext();

export const CheckoutContextProvider=({children})=>{

    const checkoutActions=(state,action)=>{
        switch (action.type) {
            case "ADD_ADDRESS":
                return{
                    ...state,
                    address:{...action.payload}
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
        currentState:"ADDRESSPAGE"
    })

    return(
        <CheckoutContext.Provider
            value={{
                dispatch:dispatch,
                address:state.address,
                paymentDetails:state.paymentDetails,
                currentState:state.currentState
            }}
        >
            {children}
        </CheckoutContext.Provider>
    )
}