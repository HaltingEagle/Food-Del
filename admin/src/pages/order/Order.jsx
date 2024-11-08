import React, { useState, useEffect } from 'react'
import './Order.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import {assets} from '../../assets/assets'
const Order = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.get('http://localhost:4000/api/order/list')
        if(response.status === 200){
            setOrders(response.data.orders)
            console.log(response.data.orders)
        }
        else{
            console.log(response)
            toast.error("Something went wrong")
        }
    }

    const updateStatus = async (orderId, event) => {
        const response = await axios.post('http://localhost:4000/api/order/status', {orderId, status: event.target.value})
        if(response.status === 200){
            await fetchOrders()
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])
    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index)=>{
                    return (
                        
                    <div className="order-item" key={index}>
                        <img src={assets.parcel_icon} alt="" />
                        <div className="">
                            <p className="order-item-food">
                                {order.items.map((item,index)=>{
                                    if(index === order.items.length - 1){
                                        return item.name + " x " + item.quantity
                                    }
                                    else{
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })}
                            </p>
                            <p className="order-item-name">{order.address.firstName+ " " + order.address.lastName}</p>
                            <div className="order-item-address">
                                <p>{order.address.street + ","}</p>
                                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                            </div>
                            <p className='order-item-phone'>{order.address.phone}</p>
                        </div>
                        <p>Items : {order.items.length}</p>
                        <p>Total : ${order.amount}</p>
                        <select onChange={(e)=>updateStatus(order._id, e)} value={order.status}>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                                        )
                })}
            </div>
        </div>
    )
}

export default Order