import React from "react";
import logo from './../../assets/logo.png'
import './Nav.css'

const Nav = () =>{
    return(
        <div className="nav-container">
            {/* for logo */}
            <div className="nav-left">
                <img className="flash-logo" src={logo} alt="logo"  />
                <p className="flash-logo-text">FlashType</p>
            </div>

            {/* for link */}
            <div className="nav-right">
                <a 
                className="nav-developer-link"
                target="_blank"
                rel="noreferrer"
                href="http://github.com/Rohit-Nandagawali/">
                    Developer
                </a>
            </div>

        </div>
    )
}

export default Nav