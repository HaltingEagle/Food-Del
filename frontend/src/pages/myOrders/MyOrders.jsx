import React, { useState, useEffect, useContext } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'
const MyOrders = () => {
    const [data, setData] = useState([]);
    const {token} = useContext(StoreContext);

    const fetchOrder = async () => {
        const response = await axios.get('http://localhost:4000/api/order/userorders', {headers: {token}});
        console.log(response.data)
        setData(response.data.orders);
    }
    useEffect(() => {
        if(token){
            fetchOrder();
        }
    }, [])
    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index)=>{
                    return(
                        <div className="my-orders-order" key={index}>
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item,index)=>{
                                if(index === order.items.length - 1){
                                    return item.name + " x " + item.quantity
                                }
                                else{
                                    return item.name + " x " + item.quantity + ", "
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders