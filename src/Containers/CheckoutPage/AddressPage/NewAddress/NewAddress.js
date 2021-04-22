import {useContext,useState,useRef,useEffect} from 'react'
import classes from './NewAddress.module.css'
import {CheckoutContext} from '../../../../store/CheckoutContext';

const NewAddress=({addressAdded})=>{
    const nameRef=useRef()
    
    const {addNewAddress}=useContext(CheckoutContext);

    const [name,setName]=useState("")
    const [nameValid,setNameValid]=useState(true)

    const [number,setNumber]=useState("")
    const [numberValid,setNumberValid]=useState(true)

    const [pin,setPin]=useState("")
    const [pinValid,setPinValid]=useState(true)

    const [address,setAddress]=useState("")
    const [addressValid,setAddressValid]=useState(true)

    const [landmark,setLandmark]=useState("")
    const [landmarkValid,setLandmarkValid]=useState(true)
    
    useEffect(()=>{
        nameRef.current.focus();
    },[])

    const validateName=(value)=>{
        if(value.length>0){
            setNameValid(true)
            return true;
        }
        setNameValid(false)
        return false
    }

    const validateNumber=(value)=>{
        if(value.length===10){
            setNumberValid(true)
            return true;
        }
        setNumberValid(false)
        return false;
    }

    const validatePin=(value)=>{
        if(value.length===6){
            setPinValid(true)
            return true
        }
        setPinValid(false)
        return false;
    }

    const validateAddress=(value)=>{
        if(value.length>=20){
            setAddressValid(true)
            return true;
        }
        setAddressValid(false)
        return false;
    }

    const validateLandmark=(value)=>{
        if(value.length>=5){
            setLandmarkValid(true)
            return true;
        }
        setLandmarkValid(false)
        return false;
    }


    const submitClicked=(event)=>{
        event.preventDefault();
        setTimeout(()=>{
            if(validateName(name) && validateNumber(number) && validatePin(pin) && validateAddress(address) &&validateLandmark(landmark)){  
                addNewAddress({
                    name:name,
                    number:number,
                    pin:pin,
                    address:address,
                    landmark:landmark
                })
                addressAdded()
            }
        })
    }

    return(
        <form
            onSubmit={submitClicked}
            className={classes["add-new-address"]}
        >
            <label className={classes["form-field"]}>
                <span>Full Name:</span>
                <input 
                    type="text" 
                    className={classes["textbox"]} 
                    placeholder="Full Name" 
                    ref={nameRef}
                    value={name}
                    required
                    onChange={event=>setName(event.target.value)}
                />
                {!nameValid&&<p className={classes["error-text"]}>Please enter a valid name</p>}
            </label>
            <label className={classes["form-field"]}>
                <span>Mobile Number:</span>
                <input 
                    type="number" 
                    className={classes["textbox"]} 
                    placeholder="Mobile Number"
                    value={number}
                    required
                    onChange={event=>setNumber(event.target.value)}
                />
                {!numberValid&&<p className={classes["error-text"]}>Please enter a valid mobile number</p>}
            </label>
            <label className={classes["form-field"]}>
                <span>PIN code:</span>
                <input 
                    type="number" 
                    className={classes["textbox"]} 
                    placeholder="PIN code"
                    value={pin}
                    required
                    onChange={event=>setPin(event.target.value)}
                />
                {!pinValid&&<p className={classes["error-text"]}>Please enter a valid pin number</p>}
            </label>
            <label className={classes["form-field"]}>
                <span>Address:</span>
                <textarea
                    className={classes['textarea']}
                    placeholder="Address"
                    value={address}
                    required
                    onChange={event=>setAddress(event.target.value)}
                ></textarea>
                {!addressValid&&<p className={classes["error-text"]}>Please enter a valid address with atleast 20 characters</p>}
            </label>
            <label className={classes["form-field"]}>
                <span>Landmark:</span>
                <input 
                    type="text" 
                    className={classes["textbox"]} 
                    placeholder="Landmark"
                    value={landmark}
                    required
                    onChange={event=>setLandmark(event.target.value)}
                />
                {!landmarkValid&&<p className={classes["error-text"]}>Please enter a valid landmark with atleast 5 characters</p>}
            </label>
            <button
                className={`${classes["button-solid"]} ${classes["button-primary"]}`}
                type="submit"
            >
                Add Address
            </button>
        </form>
    )

}

export default NewAddress