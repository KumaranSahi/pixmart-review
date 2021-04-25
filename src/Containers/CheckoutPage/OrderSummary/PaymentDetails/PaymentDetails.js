import classes from './PaymentDetails.module.css'

const PaymentDetails=({paymentMode,nameOnCard,cardNumber,expirationDate,cvv})=>{
    return(
        <div className={classes["payment-details"]}>
            {paymentMode==="COD"?<h2>Payment Mode: Cash On Delivery</h2>:(
                <>
                    <h2>{paymentMode==="CREDITCARD"?"Credit Card":"Debit Card"}</h2>
                    <p>{nameOnCard}</p>
                    <p>{cardNumber}</p>
                    <p>{expirationDate}</p>
                    <p>{cvv}</p>
                </>
            )}
        </div>
    )
}

export default PaymentDetails;