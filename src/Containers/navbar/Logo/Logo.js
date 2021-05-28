import {Link} from 'react-router-dom'
import classes from './Logo.module.css';
import Logo from '../../../Assets/mk logo finD.png'

const logo=()=>{
    return(
        <Link to="/">
            <img src={Logo} className={classes["logo"]} alt="logo"/>
        </Link>
    )
}

export default logo;