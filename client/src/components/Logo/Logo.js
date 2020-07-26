import React from 'react'
import BurgerLogo from '../../assets/images/logo.png'
import './Logo.css'

const logo = () => {
    return(
        <div className="BurgerLogo">
            <img src={BurgerLogo} alt="Build-a-Burger"></img>
        </div>
    )
}

export default logo