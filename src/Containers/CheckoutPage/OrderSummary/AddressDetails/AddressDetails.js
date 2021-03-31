import classes from './AddressDetails.module.css'

const AddressDetails=({name,number,pin,address,landmark})=>{
    return(
        <div className={classes["address-details"]}>
            <p>Name: {name}</p>
            <p>Number: {number}</p>
            <p>Landmark: {landmark}</p>
            <p>Address: {address}</p>
            <p>PIN: {pin}</p>
        </div>
    )
}

export default AddressDetails