import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import NavigationItem from './NavigationItem/NavigationItem';
import LogoutButton from './LogoutButton/LogoutButton'
import './NavigationItems.css';

const navigationItems = (props) => {

    const location = useLocation();
    console.log('Nav Items', location.pathname + "/logout");
    let destination = location.pathname + "/logout"
    if (location.pathname === '/') {
        destination = '/logout'
    }

    return (
        <ul className="NavigationItems">
            <NavigationItem link="/" exact >Home</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            {!props.isAuthenticated ? <NavigationItem link="/login">Login</NavigationItem> : <LogoutButton />}
        </ul>
    );
}

const mapStatetoProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStatetoProps, null)(navigationItems);
