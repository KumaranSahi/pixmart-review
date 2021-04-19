import classes from './navbar.module.css'
import Logo from './Logo/Logo'
import Hamburger from './Hamburger/Hamburger'
import DesktopNavMenu from './DesktopNavMenu/DesktopNavMenu'
import {useLocation} from 'react-router-dom'
import Avatar from './Avatar/Avatar'

const Navbar=()=>{
    let {pathname}=useLocation();
    return(
        <nav className={classes["navbar"]}>
            {pathname==="/product"?<div></div>:<Logo/>}
            <DesktopNavMenu/>
            {pathname==="/product"?<Hamburger/>:null}
            <Avatar/>
        </nav>
    )

}

export default Navbar;