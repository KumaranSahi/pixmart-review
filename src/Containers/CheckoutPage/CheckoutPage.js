import classes from './CheckoutPage.module.css';
import {CheckoutContext} from '../../store/CheckoutContext'
import { useContext } from 'react';
import AddressPage from './AddressPage/AddressPage'
import PaymentPage from './PaymentPage/PaymentPage'
import OrderPlacedModal from './OrderPlacedModal/OrderPlacedModal'
import OrderSummary from './OrderSummary/OrderSummary';

const CheckoutPage=()=>{
    const {currentState}=useContext(CheckoutContext);
    return(
        <div className={classes["checkout-container"]}>
            {currentState==="ADDRESSPAGE"&&<AddressPage/>}
            {currentState==="PAYMENTPAGE"&&<PaymentPage/>}
            {currentState==="ORDERSUMMARY"&&<OrderSummary/>}
            {currentState==="ORDERPLACED"&&<OrderPlacedModal/>}
        </div>
    )
}

export default CheckoutPage;