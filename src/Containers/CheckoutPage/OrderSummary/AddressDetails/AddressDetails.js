import classes from './AddressDetails.module.css'

const AddressDetails=({name,number,pin,address,landmark})=>{
    return(
        <div className={classes["address-details"]}>
            <p>{name}</p>
            <p>{number}</p>
            <p>{landmark}</p>
            <p>{address}</p>
            <p>{pin}</p>
        </div>
    )
}

export default AddressDetails