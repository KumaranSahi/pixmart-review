import classes from './AddressPage.module.css'
import {useContext,useState} from 'react';
import {CheckoutContext} from '../../../store/CheckoutContext';
import NewAddress from './NewAddress/NewAddress'
import {Radio, FormControlLabel, FormControl,RadioGroup} from '@material-ui/core';

const AddressPage=()=>{
    const {dispatch,userAddresses,address,deleteAddress}=useContext(CheckoutContext);
    const [addNewAddress,setAddNewAddress]=useState(false)

    const addressSelected=(event)=>{
        dispatch({
            type:"ADD_ADDRESS",
            payload:event.target.value
        })
    }
    
    return(
        <div className={classes["address-container"]}>
            <h1>
                Select Address
            </h1>
            <hr/>

            <FormControl component="fieldset">
                <RadioGroup aria-label="select address" name="selectAddress" value={address} onChange={addressSelected}>
                    {
                        userAddresses.map(address=>(
                            <FormControlLabel key={address._id} value={address._id} control={<Radio color="primary"/>} label={
                            <div className={classes["address"]}>
                                <p>{address.name}</p>
                                <p>{address.number}</p>
                                <p>{address.address}</p>
                                <p>{address.landmark}</p>
                                <button className={`${classes["button-solid"]} ${classes["button-secondary"]}`} onClick={()=>deleteAddress(address._id)}>
                                    Delete Address
                                </button>
                            </div>}/>
                        ))
                    }
                </RadioGroup>
            </FormControl>
            <button className={`${classes["button-solid"]} ${classes["button-primary"]}`} onClick={()=>setAddNewAddress(status=>!status)}>
                Add new address
            </button>
            {addNewAddress && <NewAddress addressAdded={()=>setAddNewAddress(false)}/>}
        </div>
    )
}

export default AddressPage;