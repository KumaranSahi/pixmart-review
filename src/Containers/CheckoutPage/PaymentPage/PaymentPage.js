import classes from './PaymentPage.module.css'
import {Radio, FormControlLabel, FormControl,RadioGroup} from '@material-ui/core';
import {CheckoutContext} from '../../../store/CheckoutContext'
import {ProductsContext} from '../../../store/ProductsContext'
import {useContext, useState,useRef, useEffect} from 'react'
import CardDetails from './CardDetails/CardDetails'

const PaymentPage=()=>{
    const inputRef=useRef();

    useEffect(()=>{
        inputRef.current.focus();
    },[])

    const {dispatch}=useContext(CheckoutContext)
    const {totalCost}=useContext(ProductsContext)

    const [paymentMode,setPaymentMode]=useState("CREDITCARD")
    const [nameOnCard,setNameOnCard]=useState("");
    const [cardNumber,setCardNumber]=useState("");
    const [expirationDate,setExpirationDate]=useState("");
    const [cvv,setCvv]=useState("");

    return(
        <div className={classes["payment-container"]}>
            <h1>
                Select Payment Option
            </h1>
            <hr/>
            <h2>
                Total Cost: Rs. {totalCost}
            </h2>
            <form onSubmit={event=>{
                event.preventDefault();
                dispatch({
                    type:"ADD_PAYMENT_DETAILS",
                    payload:{
                        paymentMode,
                        nameOnCard,
                        cardNumber,
                        expirationDate,
                        cvv
                    }
                })
                dispatch({
                    type:"MOVE_TO_ORDER_SUMMARY"
                })
            }}>
                <div className={classes["form-container"]}>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="sort by cost" name="sortbycost" value={paymentMode} onChange={event=>setPaymentMode(event.target.value)}>
                            <FormControlLabel value="CREDITCARD" control={<Radio color="primary"/>} label="Credit Card"/>
                                {paymentMode==="CREDITCARD"&&<CardDetails
                                    inputRef={inputRef}
                                    nameOnCard={nameOnCard}
                                    setNameOnCard={event=>setNameOnCard(event.target.value)}
                                    cardNumber={cardNumber}
                                    setCardNumber={event=>setCardNumber(event.target.value)}
                                    expirationDate={expirationDate}
                                    setExpirationDate={event=>setExpirationDate(event.target.value)}
                                    cvv={cvv}
                                    setCvv={event=>setCvv(event.target.value)}
                                />}
                            <FormControlLabel value="DEBITCARD" control={<Radio color="primary"/>} label="Debit Card"/>
                                {paymentMode==="DEBITCARD"&&<CardDetails
                                    inputRef={inputRef}
                                    nameOnCard={nameOnCard}
                                    setNameOnCard={event=>setNameOnCard(event.target.value)}
                                    cardNumber={cardNumber}
                                    setCardNumber={event=>setCardNumber(event.target.value)}
                                    expirationDate={expirationDate}
                                    setExpirationDate={event=>setExpirationDate(event.target.value)}
                                    cvv={cvv}
                                    setCvv={event=>setCvv(event.target.value)}
                                />}
                            <FormControlLabel value="COD" control={<Radio color="primary"/>} label="Cash on Delivery"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <button
                    className={`${classes["button-solid"]} ${classes["button-primary"]}`}
                    type="submit"
                >
                    Continue
                </button>
            </form>
        </div>
    )
}

export default PaymentPage;