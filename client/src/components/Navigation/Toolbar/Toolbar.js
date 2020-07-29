import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuIcon from '../SideDrawer/MenuIcon/MenuIcon';
import './Toolbar.css';

const toolbar = ( props ) => {
    return(
        <Fragment>
            <header className="Toolbar">
                <MenuIcon clicked={props.openSideDrawer}/>
                <Link to="/" style={{height: "70%"}} >
                    <Logo/>
                </Link>
                <nav className="DesktopOnly">
                    <NavigationItems />
                </nav>               
            </header>
        </Fragment>
    )
}

export default toolbar;