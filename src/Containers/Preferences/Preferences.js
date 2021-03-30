import classes from "./Preferences.module.css";
import {Radio, FormControlLabel, FormControl,Checkbox,RadioGroup} from '@material-ui/core';
import {ProductsContext} from '../../store/ProductsContext'
import { useContext } from "react";

const Preferences=()=>{
    const { hasDiscount, fastDelivery, includeOutOfStock,pixmartChoice,sortby,dispatch,filterByCatagory}=useContext(ProductsContext)
    return(
        <>
            <FormControl component="fieldset">
                <h2 className={classes['field-title']}>Sort by price:</h2>
                <RadioGroup aria-label="sort by cost" name="sortbycost" value={sortby} onChange={event=>dispatch({
                    type:event.target.value
                })}>
                    <FormControlLabel value="SORTLOWTOHIGH" control={<Radio color="primary"/>} label="Low to high"/>
                    <FormControlLabel value="SORTHIGHTOLOW" control={<Radio color="primary"/>} label="High to low"/>
                </RadioGroup>
            </FormControl>
            <h2 className={classes['field-title']}>Preferences:</h2>
            <FormControl component="fieldset">
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={fastDelivery}
                        onChange={()=>dispatch({
                            type:"FILTERBYFASTDELIVERY"
                        })}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Fast delivery only"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={includeOutOfStock}
                        onChange={()=>dispatch({
                            type:"FILTERBYINSTOCK"
                        })}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Inclue out of stock"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={pixmartChoice}
                        onChange={()=>dispatch({
                            type:"FILTERBYPIXMARTCHOICE"
                        })}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Pixmart Choice"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={hasDiscount}
                        onChange={()=>dispatch({
                            type:"FILTERBYHASDISCOUNT"
                        })}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="With Discounts"
                />
            </FormControl>
            <h2 className={classes['field-title']}>Catagories:</h2>
            <FormControl component="fieldset">
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={filterByCatagory==="FILTERONLYDSLR"}
                        onChange={()=>dispatch({
                            type:"FILTERONLYDSLR"
                        })}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="DSLR"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={filterByCatagory==="FILTERONLYMIRRORLESS"}
                        onChange={()=>dispatch({
                            type:"FILTERONLYMIRRORLESS"
                        })}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Mirrorless"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={filterByCatagory==="FILTERONLYPOINTANDSHOOT"}
                        onChange={()=>dispatch({
                            type:"FILTERONLYPOINTANDSHOOT"
                        })}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Point and shoot"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={filterByCatagory==="FILTERONLYACCESSORIES"}
                        onChange={()=>dispatch({
                            type:"FILTERONLYACCESSORIES"
                        })}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Accessories"
                />
            </FormControl>
        </>
    )
}

export default Preferences;