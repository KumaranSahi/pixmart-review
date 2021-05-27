import classes from './LandingImage.module.css'
import logo from '../../../Assets/mk logo finD.png'
import {Link} from 'react-router-dom'

export const LandingImage=()=>{
    return(
        <div className={classes["landing-image"]}>
            <h1>
                <img
                    src={logo}
                    alt="Logo"
                />
                Pixmart
            </h1>
            <button className={`${classes["button-outline"]} ${classes["button-primary"]}`}>
                <Link to="/product">
                    Start Shopping
                </Link>
            </button>
        </div>
    )
}