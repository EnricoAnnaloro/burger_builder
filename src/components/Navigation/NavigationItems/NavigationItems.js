import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css'

const navigationItems = () => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="/" exact >Home</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            <NavigationItem link="/contacts">Contacts</NavigationItem>
        </ul>
    );
}

export default navigationItems;
