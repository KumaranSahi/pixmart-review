import classes from './CardDetails.module.css'

const CardDetails=({nameOnCard,setNameOnCard,cardNumber,setCardNumber,expirationDate,
    setExpirationDate,cvv,setCvv,inputRef})=>{
    return(
        <div className={classes["card-details"]}>
            <input 
                type="text" 
                className={classes["textbox"]} 
                placeholder="Name on card" 
                ref={inputRef}
                value={nameOnCard}
                onChange={setNameOnCard}
            />
            <input 
                type="text" 
                className={classes["textbox"]} 
                placeholder="Card number" 
                value={cardNumber}
                onChange={setCardNumber}
            />
            <div className={classes["expiry-cvv"]}>
                <input 
                    type="text" 
                    className={classes["textbox"]} 
                    placeholder="Expiration date" 
                    value={expirationDate}
                    onChange={setExpirationDate}
                />
                <input 
                    type="text" 
                    className={classes["textbox"]} 
                    placeholder="CVV" 
                    value={cvv}
                    onChange={setCvv}
                />
            </div>
        </div>
    )
}

export default CardDetails;