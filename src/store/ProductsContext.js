import {createContext,useEffect,useReducer,useContext,useState} from 'react';
import axios from '../useAxios';
import { infoToast, successToast, warningToast } from '../UI/Toast/Toast';
import {useAuth} from './AuthContext'
import {useHistory} from 'react-router-dom'

export const ProductsContext=createContext();

export const useProducts=()=>useContext(ProductsContext)

export const ProductsContextProvider=({children})=>{
    const [loading,setLoading]=useState(false)
    const {userId,token}=useAuth()
    const {push}=useHistory()
    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }
    const addItemToCart=async(productId)=>{
        setLoading(true)
        try{
            if(token){
            const {data:{data,ok}}=await axios.post(`/api/carts/${userId}`,{
                productId:productId,
                quantity:1
            },config)
            if(ok){
                dispatch({type:"ADD_TO_CART",payload:[...data]})
                successToast("Item added to cart")
            }
            }else{
                infoToast("Please login to proceed further")
                push("/login")
            }
            setLoading(false)
        }catch(error){
            console.log(error)
            warningToast("cannot add item to cart")
            setLoading(false)
        }
    }

    const removeItemFromCart=async (productId)=>{
        setLoading(true)
        try{
            if(token){
            const {data:{data,ok}}=await axios.delete(`/api/carts/${userId}/products/${productId}`,config)
            if(ok){
                dispatch({type:"ADD_TO_CART",payload:[...data]})
                successToast("Item removed from cart")
            }
            }else{
                infoToast("Please login to proceed further")
                push("/login")
            }
            setLoading(false)
        }catch(error){
            console.log(error)
            warningToast("Cannot remove item from cart")
            setLoading(false)
        }
    }

    const changeQuantity=async (productId,quantity)=>{
        setLoading(true)
        try{
            if(token){
            const {data:{data,ok}}=await axios.put(`/api/carts/${userId}/products/${productId}`,{quantity:quantity},config)
            if(ok){
                dispatch({type:"ADD_TO_CART",payload:[...data]})
                successToast("Cart item updated")
            }
            }else{
                infoToast("Please login to proceed further")
                push("/login")
            }
            setLoading(false)
        }catch(error){
            console.log(error)
            warningToast("Cannot update cart item")
            setLoading(false)
        }
    }

    const addWishlist=async(productId)=>{
        setLoading(true)
        try{
            if(token){
                const {data:{data,ok}}=await axios.post(`/api/wishlists/${userId}`,{productId:productId},config)
                if(ok){
                    dispatch({type:"ADD_TO_WISHLIST",payload:[...data]})
                    successToast("Item added to Wishlist")
                }
                }else{
                    infoToast("Please login to proceed further")
                    push("/login")
                }
                setLoading(false)
        }catch(error){
            console.log(error)
            warningToast("Cannot add item to wishlist")
            setLoading(false)
        }
    }

    const removeItemFromWishlist=async (productId)=>{
        setLoading(true)
        try{
            if(token){
                const {data:{data,ok}}=await axios.delete(`/api/wishlists/${userId}/products/${productId}`,config)
            if(ok){
                dispatch({type:"ADD_TO_WISHLIST",payload:[...data]})
                successToast("Item removed from cart")
            }
            }else{
                infoToast("Please login to proceed further")
                push("/login")
            }
            setLoading(false)
        }catch(error){
            console.log(error)
            warningToast("Cannot add item to wishlist")
            setLoading(false)
        }
    }

    useEffect(()=>{
        (async()=>{
            try{
                if(token){
                    const {data:{data,ok}}=await axios.get(`/api/carts/${userId}`,config)
                    if(ok){
                        dispatch({
                            type:"ADD_TO_CART",
                            payload:[...data]
                        })
                    }
                }
            }catch(error){
                console.log(error)
                warningToast("Failed to load cart")
            }
        })()
    },[token,userId])

    useEffect(()=>{
        (async()=>{
            try{
                if(token){
                    const {data:{data,ok}}=await axios.get(`/api/wishlists/${userId}`,config)
                    if(ok){
                        dispatch({
                            type:"ADD_TO_WISHLIST",
                            payload:[...data]
                        })
                    }
                }
            }catch(error){
                console.log(error)
                warningToast("Failed to load wishlist")
            }
        })()
    },[token,userId])

    useEffect(()=>{
        (async()=>{
            try{
            const {data:{data,ok}}=await axios.get("/api/products");
            if(ok)
                dispatch ({
                    type:"LOAD_PRODUCT_LIST",
                    payload:[...data]
                })
            }catch(error){
                console.log(error)
                warningToast("Failed to load products")
            }
        })()
    },[])

    const calculateTotalCost=(acc,{product:{hasDiscount,price,discount},quantity})=>{
        let actualPrice;
        hasDiscount?actualPrice=+price-Math.round((+price*(discount/100))):actualPrice=+price;
        return acc+(actualPrice*quantity)
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
                    cartItems:[...action.payload]
                }
            case "ADD_TO_WISHLIST":
                return{
                    ...state,
                    wishListItems:[...action.payload]
                }
            case "CLEAR_CART":
                return{
                    ...state,
                    cartItems:[]
                }
            case "CALCULATE_TOTAL_COST":
                return{
                    ...state,
                    totalCost:state.cartItems.reduce(calculateTotalCost,0)
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
                filterByCatagory:state.filterByCatagory,
                addItemToCart:addItemToCart,
                removeItemFromCart:removeItemFromCart,
                changeQuantity:changeQuantity,
                addWishlist:addWishlist,
                removeItemFromWishlist:removeItemFromWishlist,
                productLoading:loading
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}