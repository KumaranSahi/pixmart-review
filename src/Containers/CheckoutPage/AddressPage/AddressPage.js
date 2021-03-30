import classes from './AddressPage.module.css'
import {useRef,useEffect,useState,useContext} from 'react';
import {CheckoutContext} from '../../../store/CheckoutContext';

const AddressPage=()=>{
    const {dispatch}=useContext(CheckoutContext);
    
    const nameRef=useRef()
    
    const [name,setName]=useState("")
    const [number,setNumber]=useState("")
    const [pin,setPin]=useState("")
    const [address,setAddress]=useState("")
    const [landmark,setLandmark]=useState("")
    
    useEffect(()=>{
        nameRef.current.focus();
    },[])
    return(
        <div className={classes["address-container"]}>
            <h1>
                Select Address
            </h1>
            <hr/>
            <form
                onSubmit={event=>{
                    event.preventDefault();
                    dispatch({
                        type:"ADDADDRESS",
                        payload:{
                            name,number,pin,address,landmark
                        }
                    })
                    dispatch({
                        type:"MOVETOPAYMENT",
                    })
                }}
            >
                <label className={classes["form-field"]}>
                    <span>Full Name:</span>
                    <input 
                        type="text" 
                        className={classes["textbox"]} 
                        placeholder="Full Name" 
                        ref={nameRef}
                        value={name}
                        onChange={event=>setName(event.target.value)}
                    />
                </label>
                <label className={classes["form-field"]}>
                    <span>Mobile Number:</span>
                    <input 
                        type="text" 
                        className={classes["textbox"]} 
                        placeholder="Mobile Number"
                        value={number}
                        onChange={event=>setNumber(event.target.value)}
                    />
                </label>
                <label className={classes["form-field"]}>
                    <span>PIN code:</span>
                    <input 
                        type="text" 
                        className={classes["textbox"]} 
                        placeholder="PIN code"
                        value={pin}
                        onChange={event=>setPin(event.target.value)}
                    />
                </label>
                <label className={classes["form-field"]}>
                    <span>Address:</span>
                    <textarea
                        className={classes['textarea']}
                        placeholder="Address"
                        value={address}
                        onChange={event=>setAddress(event.target.value)}
                    ></textarea>
                </label>
                <label className={classes["form-field"]}>
                    <span>Landmark:</span>
                    <input 
                        type="text" 
                        className={classes["textbox"]} 
                        placeholder="Landmark"
                        value={landmark}
                        onChange={event=>setLandmark(event.target.value)}
                    />
                </label>
                <button
                    className={`${classes["button-solid"]} ${classes["button-primary"]}`}
                    type="submit"
                >
                    Proceed to payment
                </button>
            </form>
        </div>
    )
}

export default AddressPage;