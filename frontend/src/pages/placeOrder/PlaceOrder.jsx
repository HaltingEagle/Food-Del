import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const PlaceOrder = () => {
  const {getTotalCartAmount, token, food_list, cartItems} = useContext(StoreContext);
  const [data, setData] =  useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })
  const navigate = useNavigate();


  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(data=>({...data, [name]: value}))
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault()
    let orderItems = []
    food_list.map((item)=>{
      if(cartItems[item._id]> 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
    }})
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    const response = await axios.post('http://localhost:4000/api/order/place', orderData, {headers: {token}})
    if(response.status === 201){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount() === 0){
      navigate('/cart')
    }
  },[token])

  return (
    <form className="place-order" onSubmit={onSubmitHandler}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="firstName" value={data.firstName} type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name="lastName" value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} name="email" value={data.email} type="email" placeholder='Email Address' />
        <input required onChange={onChangeHandler} name="street" value={data.street} type="text" placeholder='Stree' />
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="city" value={data.city} type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name="state" value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="zipcode" value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required onChange={onChangeHandler} name="country" value={data.country} type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name="phone" value={data.phone} type="text" placeholder='Phone Number' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() > 0 ? 2 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() > 0 ? getTotalCartAmount() +  2 : getTotalCartAmount()}</p>
            </div>
          </div>
          <button>PROCEED TO Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder