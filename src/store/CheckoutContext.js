import {useReducer,createContext} from 'react';

export const CheckoutContext=createContext();

export const CheckoutContextProvider=({children})=>{

    const checkoutActions=(state,action)=>{
        switch (action.type) {
            case "ADDADDRESS":
                return{
                    ...state,
                    address:{...action.payload}
                }
            case "MOVETOADDRESS":
                return{
                    ...state,
                    currentState:"ADDRESSPAGE"
                }
            case "MOVETOPAYMENT":
                return{
                    ...state,
                    currentState:"PAYMENTPAGE"
                }
            case "MOVETORDERSUMMARY":
                return{
                    ...state,
                    currentState:"ORDERSUMMARY"
                }
            case "ADDPAYMENTDETAILS":
                return{
                    ...state,
                    paymentDetails:{...action.payload}
                }
            case "PLACEORDER":
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