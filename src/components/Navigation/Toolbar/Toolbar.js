import React, {Fragment} from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import './Toolbar.css'

const toolbar = () => {
    return(
        <Fragment>
            <header className="Toolbar">
                <div>MENU</div>
                <div style={{height: "70%"}}>
                    <Logo/>
                </div>
                <nav className="DesktopOnly">
                    <NavigationItems />
                </nav>               
            </header>
        </Fragment>
    )
}

export default toolbar;