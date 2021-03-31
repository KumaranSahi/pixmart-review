import classes from './CatagoricalCard.module.css';
import {ProductsContext} from '../../../../store/ProductsContext'
import { useContext } from 'react';
import {Link} from 'react-router-dom'

const CatagoricalCard=({children,type,image})=>{
    const {dispatch}=useContext(ProductsContext)
    
    return(
        <Link to="/product"
            onClick={()=>dispatch({type:type})}
        >
            <div
                className={classes["catagory-card"]}
                style={{backgroundImage:`url("${image}")`}}
            >
                <span>
                    {children}
                </span>
            </div>
        </Link>
    )
}

export default CatagoricalCard