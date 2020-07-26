import React, {Fragment} from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import MenuIcon from '../SideDrawer/MenuIcon/MenuIcon'
import './Toolbar.css'

const toolbar = ( props ) => {
    return(
        <Fragment>
            <header className="Toolbar">
                <MenuIcon clicked={props.openSideDrawer}/>
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