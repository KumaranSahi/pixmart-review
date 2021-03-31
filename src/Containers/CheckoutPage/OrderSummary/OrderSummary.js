import classes from './OrderSummary.module.css'
import {useContext} from 'react';
import {CheckoutContext} from '../../../store/CheckoutContext';
import {ProductsContext} from '../../../store/ProductsContext';
import OrderSummaryCard from './OrderSummaryCard/OrderSummaryCard'
import AddressDetails from './AddressDetails/AddressDetails'
import PaymentDetails from './PaymentDetails/PaymentDetails'

const OrderSummary=()=>{
    const {cartItems,totalCost}=useContext(ProductsContext);
    const {paymentDetails,address,dispatch}=useContext(CheckoutContext);

    return(
        <div className={classes["order-summary-container"]}>
            <h1>
                Order Summary
            </h1>
            <hr/>
            <h2>
                Total Cost: Rs. {totalCost}
            </h2>
            <ul>
                {
                    cartItems.map(({id,name,quantity,image})=>(
                        <li key={id}>
                            <OrderSummaryCard
                                name={name}
                                quantity={quantity}
                                image={image}
                            />
                        </li>
                    ))
                }
            </ul>
            <hr/>
            <h2>
                Address
            </h2>
            <AddressDetails
                name={address.name}
                number={address.number}
                pin={address.pin}
                address={address.address}
                landmark={address.landmark}
            />
            <hr/>
            <h2>
                Payment Details
            </h2>
            <PaymentDetails
                paymentMode={paymentDetails.paymentMode}
                nameOnCard={paymentDetails.nameOnCard}
                cardNumber={paymentDetails.cardNumber}
                expirationDate={paymentDetails.expirationDate}
                cvv={paymentDetails.cvv}
            />
            <button
                className={`${classes["button-solid"]} ${classes["button-primary"]}`}
                type="submit"
                onClick={()=>dispatch({
                    type:"PLACEORDER"
                })}
            >
                Checkout
            </button>
        </div>
    )
}

export default OrderSummary;