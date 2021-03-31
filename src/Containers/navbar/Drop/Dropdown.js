import classes from './Dropdown.module.css'
import Preferences from '../../Preferences/Preferences'

const Dropdown=({open})=>{
    
    return open?(<div className={classes["dropdown-menu"]}>
            <Preferences/>
        </div>):null
}

export default Dropdown