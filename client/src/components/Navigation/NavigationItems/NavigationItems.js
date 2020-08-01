import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import NavigationItem from './NavigationItem/NavigationItem';
import LogoutButton from './LogoutButton/LogoutButton'
import './NavigationItems.css';

const navigationItems = (props) => {

    const location = useLocation();
    let destination = location.pathname + "/logout"
    if (location.pathname === '/') {
        destination = '/logout'
    }
    
    console.log('Nav Items', props.authInfo);
    return (
        <ul className="NavigationItems">
            {props.authInfo.user ?
                <div className="GreetingUser">
                    <p>Welcome back</p>
                    <p>{props.authInfo.user.username}</p>  
                </div> :
                null
            }
            <NavigationItem link="/" exact >Home</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {!props.isAuthenticated ? <NavigationItem link="/login">Login</NavigationItem> : <LogoutButton />}
        </ul>
    );
}

const mapStatetoProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        authInfo: state.auth
    }
}

export default connect(mapStatetoProps, null)(navigationItems);
