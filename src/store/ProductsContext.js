import {createContext,useEffect,useReducer} from 'react';
import axios from 'axios';
export const ProductsContext=createContext();

export const ProductsContextProvider=({children})=>{
    useEffect(()=>{
        (async()=>{
            const data=await axios.get("/api/products");
            dispatch ({
                type:"LOAD_PRODUCT_LIST",
                payload:[...data.data.products]
            })
        })()
    },[])

    const CALCULATE_TOTAL_COST=(acc,currValue)=>{
        let actualPrice;
        currValue.hasDiscount?actualPrice=+currValue.price-Math.round((+currValue.price*(currValue.discount/100))):actualPrice=+currValue.price;
        return acc+(actualPrice*currValue.quantity)
    }

    const productListManipulation=(state,action)=>{
        switch (action.type) {
            case "LOAD_PRODUCT_LIST":    
                return {
                    ...state,
                    products:action.payload.map(item=>({...item,inCart:false,inWishlist:false,quantity:0}))
                }
            case "SORT_LOW_TO_HIGH":
                return{
                    ...state,
                    sortby:"SORT_LOW_TO_HIGH"
                }
            case "SORT_HIGH_TO_LOW":
                return{
                    ...state,
                    sortby:"SORT_HIGH_TO_LOW"
                }
            case "FILTER_BY_FAST_DELIVERY":
                return{
                    ...state,
                    fastDelivery:!state.fastDelivery
                }
            case "FILTER_BY_IN_STOCK":
                return{
                    ...state,
                    includeOutOfStock:!state.includeOutOfStock
                }
            case "FILTER_BY_PIXMART_CHOICE":
                return{
                    ...state,
                    pixmartChoice:!state.pixmartChoice
                }
            case "FILTER_BY_HAS_DISCOUNT":
                return{
                    ...state,
                    hasDiscount:!state.hasDiscount
                }
            case "ADD_TO_CART":
                return{
                    ...state,
                    cartItems:[...state.cartItems,...state.products.filter(product=>product.id===action.payload).map(item=>({...item,inCart:true,quantity:1}))],
                    products:state.products.map(product=>product.id===action.payload?{...product,inCart:true}:product),
                    wishListItems:state.wishListItems.map(product=>product.id===action.payload?{...product,inCart:true}:product)
                }
            case "REMOVE_FROM_CART":
                return{
                    ...state,
                    cartItems:state.cartItems.filter(product=>product.id!==action.payload),
                    products:state.products.map(product=>product.id===action.payload?{...product,inCart:false,quantity:0}:product),
                    wishListItems:state.wishListItems.map(product=>product.id===action.payload?{...product,inCart:false,quantity:0}:product)
                }
            case "ADD_TO_WISHLIST":
                return{
                    ...state,
                    wishListItems:[...state.wishListItems,...state.products.filter(product=>product.id===action.payload).map(item=>({...item,inWishlist:true}))],
                    products:state.products.map(product=>product.id===action.payload?{...product,inWishlist:true}:product)
                }
            case "INCREMENT_QUANTITY":
                return{
                    ...state,
                    cartItems:state.cartItems.map(product=>product.id===action.payload?{...product,quantity:product.quantity+1}:product)
                }
            case "DECREMENT_QUANTITY":
                return{
                    ...state,
                    cartItems:state.cartItems.map(product=>product.id===action.payload?{...product,quantity:product.quantity>1?product.quantity-1:product.quantity}:product)
                }
            case "REMOVE_FROM_WISHLIST":
                return{
                    ...state,
                    wishListItems:state.wishListItems.filter(product=>product.id!==action.payload),
                    products:state.products.map(product=>product.id===action.payload?{...product,inWishlist:false}:product)
                }
            case "CALCULATE_TOTAL_COST":
                return{
                    ...state,
                    totalCost:state.cartItems.reduce(CALCULATE_TOTAL_COST,0)
                }
            case "FILTER_ONLY_DSLR":
                return{
                    ...state,
                    filterByCatagory:"FILTER_ONLY_DSLR"
                }
            case "FILTER_ONLY_MIRRORLESS":
                return{
                    ...state,
                    filterByCatagory:"FILTER_ONLY_MIRRORLESS"
                }
            case "FILTER_ONLY_POINT_AND_SHOOT":
                return{
                    ...state,
                    filterByCatagory:"FILTER_ONLY_POINT_AND_SHOOT"
                }
            case "FILTER_ONLY_ACCESSORIES":
                return{
                    ...state,
                    filterByCatagory:"FILTER_ONLY_ACCESSORIES"
                }
            case "CLEAR_FILTERS":
                return{
                    ...state,
                    hasDiscount:false,
                    fastDelivery:false,
                    includeOutOfStock:false,
                    pixmartChoice:false,
                    sortby:"SORT_LOW_TO_HIGH",
                    filterByCatagory:null,
                }
            case "CLEAR_CART":
                return{
                    ...state,
                    products:state.products.map(item=>({
                        ...item,
                        inCart:false,
                        quantity:0
                    })),
                    cartItems:[],
                    wishListItems:state.wishListItems.map(item=>({
                        ...item,
                        inCart:false,
                        quantity:0
                    }))
                }
            default:
                return state;
        }
    }

    const [state,dispatch]=useReducer(productListManipulation,{
        products:[],
        cartItems:[],
        wishListItems:[],
        hasDiscount:false,
        fastDelivery:false,
        includeOutOfStock:false,
        pixmartChoice:false,
        sortby:"SORT_LOW_TO_HIGH",
        filterByCatagory:null,
        totalCost:0
    })

    const getCatagoricallyFilteredData=(products,filterby)=>{
        if(filterby){
            if(filterby==="FILTER_ONLY_DSLR")
                return products.filter(item=>item.catagory==="DSLR")
            if(filterby==="FILTER_ONLY_MIRRORLESS")
                return products.filter(item=>item.catagory==="MIRRORLESS")
            if(filterby==="FILTER_ONLY_POINT_AND_SHOOT")
                return products.filter(item=>item.catagory==="POINTANDSHOOT")
            if(filterby==="FILTER_ONLY_ACCESSORIES")
                return products.filter(item=>item.catagory==="ACCESSORIES")
        }else{
            return products;
        }
    }

    const getSortedData=(products,sortby)=>{
        if (products&&sortby === "SORT_LOW_TO_HIGH")
            return products.sort((a, b) => a.price - b.price);
        if (products&&sortby === "SORT_HIGH_TO_LOW")
            return products.sort((a, b) => b.price - a.price);
        return products;
    }

    const getFilteredData=(sortedData,hasDiscount,fastDelivery,includeOutOfStock,pixmartChoice)=>{
        if(sortedData)
            return sortedData.filter(item=>hasDiscount?item.hasDiscount:true)
            .filter(item=>fastDelivery?item.fastDelivery:true)
            .filter(item=>includeOutOfStock?true:item.inStock)
            .filter(item=>pixmartChoice?item.pixmartChoice:true)
        return sortedData
    }

    const catagoricallyFilteredData=getCatagoricallyFilteredData(state.products,state.filterByCatagory)
    const sortedData=getSortedData(catagoricallyFilteredData,state.sortby)
    const filteredData=getFilteredData(sortedData,state.hasDiscount,state.fastDelivery,state.includeOutOfStock,state.pixmartChoice)

    return(
        <ProductsContext.Provider 
            value={{
                products:filteredData,
                cartItems:[...state.cartItems],
                wishListItems:[...state.wishListItems],
                dispatch:dispatch,
                hasDiscount:state.hasDiscount,
                fastDelivery:state.fastDelivery,
                includeOutOfStock:state.includeOutOfStock,
                pixmartChoice:state.pixmartChoice,
                sortby:state.sortby,
                totalCost:state.totalCost,
                filterByCatagory:state.filterByCatagory
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}
