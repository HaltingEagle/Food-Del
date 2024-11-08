import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])
    const addToCart = async (itemId) => {
        if(!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]: 1}))
        }
        else{
            setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}))
        }
        if(token){
            await axios.post('http://localhost:4000/api/cart/add', {itemId} , {headers: {token}})
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
        if(token){
            axios.post('http://localhost:4000/api/cart/remove', { itemId} , {headers: {token}})
        }
    }

    const loadCartData = async (token) => {
        const response = await axios.get('http://localhost:4000/api/cart/get', {headers: {token}})
        console.log(response)
        setCartItems(response.data.cartData)
    }

    const getTotalCartAmount = () =>{
        let amount = 0
        for(const item in cartItems){
            if(cartItems[item] > 0){
            let itemInfo = food_list.find((food) => food._id === item)
            amount += cartItems[item] * itemInfo.price
            }
        }
        return amount
    }

    const fetchFoodList = async () => {
        const response = await axios.get('http://localhost:4000/api/food/list')
        console.log(response.data.food)
        setFoodList(response.data.food)
    }

    useEffect(() => {
        
        async function fetchData(){
            await fetchFoodList()
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'))
                await loadCartData(localStorage.getItem('token'))
            }
        }
        fetchData()
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;