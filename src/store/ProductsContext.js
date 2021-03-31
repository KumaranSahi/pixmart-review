import {createContext,useEffect,useReducer} from 'react';
import axios from 'axios';
export const ProductsContext=createContext();

export const ProductsContextProvider=({children})=>{
    useEffect(()=>{
        (async()=>{
            const data=await axios.get("/api/products");
            dispatch ({
                type:"LOADPRODUCTLIST",
                payload:[...data.data.products]
            })
        })()
    },[])

    const calculateTotalCost=(acc,currValue)=>{
        let actualPrice;
        currValue.hasDiscount?actualPrice=+currValue.price-Math.round((+currValue.price*(currValue.discount/100))):actualPrice=+currValue.price;
        return acc+(actualPrice*currValue.quantity)
    }

    const productListManipulation=(state,action)=>{
        switch (action.type) {
            case "LOADPRODUCTLIST":    
                return {
                    ...state,
                    products:action.payload.map(item=>({...item,inCart:false,inWishlist:false,quantity:0}))
                }
            case "SORTLOWTOHIGH":
                return{
                    ...state,
                    sortby:"SORTLOWTOHIGH"
                }
            case "SORTHIGHTOLOW":
                return{
                    ...state,
                    sortby:"SORTHIGHTOLOW"
                }
            case "FILTERBYFASTDELIVERY":
                return{
                    ...state,
                    fastDelivery:!state.fastDelivery
                }
            case "FILTERBYINSTOCK":
                return{
                    ...state,
                    includeOutOfStock:!state.includeOutOfStock
                }
            case "FILTERBYPIXMARTCHOICE":
                return{
                    ...state,
                    pixmartChoice:!state.pixmartChoice
                }
            case "FILTERBYHASDISCOUNT":
                return{
                    ...state,
                    hasDiscount:!state.hasDiscount
                }
            case "ADDTOCART":
                return{
                    ...state,
                    cartItems:[...state.cartItems,...state.products.filter(product=>product.id===action.payload).map(item=>({...item,inCart:true,quantity:1}))],
                    products:state.products.map(product=>product.id===action.payload?{...product,inCart:true}:product),
                    wishListItems:state.wishListItems.map(product=>product.id===action.payload?{...product,inCart:true}:product)
                }
            case "REMOVEFROMCART":
                return{
                    ...state,
                    cartItems:state.cartItems.filter(product=>product.id!==action.payload),
                    products:state.products.map(product=>product.id===action.payload?{...product,inCart:false,quantity:0}:product),
                    wishListItems:state.wishListItems.map(product=>product.id===action.payload?{...product,inCart:false,quantity:0}:product)
                }
            case "ADDTOWISHLIST":
                return{
                    ...state,
                    wishListItems:[...state.wishListItems,...state.products.filter(product=>product.id===action.payload).map(item=>({...item,inWishlist:true}))],
                    products:state.products.map(product=>product.id===action.payload?{...product,inWishlist:true}:product)
                }
            case "INCREMENTQUANTITY":
                return{
                    ...state,
                    cartItems:state.cartItems.map(product=>product.id===action.payload?{...product,quantity:product.quantity+1}:product)
                }
            case "DECREMENTQUANTITY":
                return{
                    ...state,
                    cartItems:state.cartItems.map(product=>product.id===action.payload?{...product,quantity:product.quantity>1?product.quantity-1:product.quantity}:product)
                }
            case "REMOVEFROMWISHLIST":
                return{
                    ...state,
                    wishListItems:state.wishListItems.filter(product=>product.id!==action.payload),
                    products:state.products.map(product=>product.id===action.payload?{...product,inWishlist:false}:product)
                }
            case "CALCULATETOTALCOST":
                return{
                    ...state,
                    totalCost:state.cartItems.reduce(calculateTotalCost,0)
                }
            case "FILTERONLYDSLR":
                return{
                    ...state,
                    filterByCatagory:"FILTERONLYDSLR"
                }
            case "FILTERONLYMIRRORLESS":
                return{
                    ...state,
                    filterByCatagory:"FILTERONLYMIRRORLESS"
                }
            case "FILTERONLYPOINTANDSHOOT":
                return{
                    ...state,
                    filterByCatagory:"FILTERONLYPOINTANDSHOOT"
                }
            case "FILTERONLYACCESSORIES":
                return{
                    ...state,
                    filterByCatagory:"FILTERONLYACCESSORIES"
                }
            case "CLEARFILTERS":
                return{
                    ...state,
                    hasDiscount:false,
                    fastDelivery:false,
                    includeOutOfStock:false,
                    pixmartChoice:false,
                    sortby:"SORTLOWTOHIGH",
                    filterByCatagory:null,
                }
            case "CLEARCART":
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
        sortby:"SORTLOWTOHIGH",
        filterByCatagory:null,
        totalCost:0
    })

    const getCatagoricallyFilteredData=(products,filterby)=>{
        if(filterby){
            if(filterby==="FILTERONLYDSLR")
                return products.filter(item=>item.catagory==="DSLR")
            if(filterby==="FILTERONLYMIRRORLESS")
                return products.filter(item=>item.catagory==="MIRRORLESS")
            if(filterby==="FILTERONLYPOINTANDSHOOT")
                return products.filter(item=>item.catagory==="POINTANDSHOOT")
            if(filterby==="FILTERONLYACCESSORIES")
                return products.filter(item=>item.catagory==="ACCESSORIES")
        }else{
            return products;
        }
    }

    const getSortedData=(products,sortby)=>{
        if (products&&sortby === "SORTLOWTOHIGH")
            return products.sort((a, b) => a.price - b.price);
        if (products&&sortby === "SORTHIGHTOLOW")
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
