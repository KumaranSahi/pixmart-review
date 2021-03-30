import classes from './PaymentDetails.module.css'

const PaymentDetails=({paymentMode,nameOnCard,cardNumber,expirationDate,cvv})=>{
    return(
        <div className={classes["payment-details"]}>
            {paymentMode==="COD"?<p>Payment Mode: Cash On Delivery</p>:(
                <>
                    <p>Payment Mode: {paymentMode==="CREDITCARD"?"Credit Card":"Debit Card"}</p>
                    <p>Name On Card: {nameOnCard}</p>
                    <p>Card Number: {cardNumber}</p>
                    <p>Expiration Date: {expirationDate}</p>
                    <p>CVV: {cvv}</p>
                </>
            )}
        </div>
    )
}

export default PaymentDetails;