import React, {Fragment} from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import BackDrop from '../../UI/Backdrop/Backdrop'
import './SideDrawer.css'

const sideDrawer = (props) => {

    let sideDrawerClasses = "Open";
    if(!props.isOpen){
        sideDrawerClasses = "Close"        
    }

    return (
        <Fragment>
            <BackDrop show={props.isOpen} clicked={props.toClose}/>
            <div className={["SideDrawer", sideDrawerClasses].join(' ')}>
                <div style={{height: "10%"}}> 
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );
}

export default sideDrawer;
