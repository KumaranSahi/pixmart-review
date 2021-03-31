import classes from './BestDeals.module.css';
import {Link} from 'react-router-dom'
import {ProductsContext} from '../../../store/ProductsContext'
import { useContext } from 'react';

const BestDeals=()=>{
    const {dispatch}=useContext(ProductsContext);

    return(
        <div className={classes["best-deals-container"]}
            onClick={()=>dispatch({type:"FILTERBYHASDISCOUNT"})}
            >
            <Link to="/product" >
                <div className={classes["best-deals"]}>
                    <h1>Amazing Deals!</h1>
                </div>
            </Link>
        </div>
    )
}

export default BestDeals;