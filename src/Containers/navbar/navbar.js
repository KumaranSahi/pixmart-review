import classes from './navbar.module.css'
import Logo from './Logo/Logo'
import Hamburger from './Hamburger/Hamburger'
import DesktopNavMenu from './DesktopNavMenu/DesktopNavMenu'
import {useLocation} from 'react-router-dom'

const Navbar=()=>{
    let {pathname}=useLocation();
    return(
        <nav className={classes["navbar"]}>
            <Logo/>
            <DesktopNavMenu/>
            {pathname==="/product"?<Hamburger/>:null}
        </nav>
    )

}

export default Navbar;