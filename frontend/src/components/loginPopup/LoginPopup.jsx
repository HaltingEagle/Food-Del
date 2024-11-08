import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify'
const LoginPopup = ({setShowLogin}) => {
    const [currentState, setCurrentState] = useState("Sign Up")
    const [data, setData] = useState({name: '', email: '', password: ''})
    const {setToken} = useContext(StoreContext)

    const onChangeHandler=(e) => {
        const name = e.target.name
        const value = e.target.value
        setData(data=>({...data, [name]: value}))
    }

    const onSubmitHandler= async(e) => {
        e.preventDefault()
        if(currentState === "Login"){
            const response = await axios.post('http://localhost:4000/api/user/login', data)
            if(response.status === 200){
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                setShowLogin(false)
                toast.success("Login Successful")
            }
            else{
                toast.error("Something went wrong")
            }
        }
        else{
            const response = await axios.post('http://localhost:4000/api/user/register', data)
            if(response.status === 201){
                setToken(response.data.token)
                localStorage.setItem('token',response.data.token)
                setShowLogin(false)
                toast.success("Sign Up Successful")
            }
            else{
                toast.error("Something went wrong")
            }
        }
    }

    return (
        <div className='login-popup'>
        <form action="" className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currentState === "Login" ? <></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
                <input onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Your email' required />
                <input onChange={onChangeHandler} name='password' value={data.password} type="password" placeholder='Password' required />
                
            </div>
            <button type='submit' onClick={onSubmitHandler}>{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span></p>
            </div>
            {currentState === "Login"
            ?<p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click Here</span></p>
            :<p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login</span></p>}
        </form>
        </div>
    )
}

export default LoginPopup