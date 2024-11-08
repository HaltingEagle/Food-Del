import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit pariatur totam, ad voluptates soluta aperiam libero magnam provident dicta nihil nam est necessitatibus, illo iste hic culpa, quod optio doloribus?</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>Phone: +91 9999999999</li>
                        <li>Email: arthur.shak19@gmail.com</li>
                        <li>Address: 123, Main Street, City, Country</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer copyright">Copyright &copy; 2024. Tomato.com - All rights reserved.</p>
        </div>
    )
}

export default Footer