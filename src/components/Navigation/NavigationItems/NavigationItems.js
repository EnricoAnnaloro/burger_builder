import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css'

const navigationItems = () => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="/" active>Home</NavigationItem>
            <NavigationItem link="/">Orders</NavigationItem>
            <NavigationItem link="/">Contacts</NavigationItem>
        </ul>
    );
}

export default navigationItems;
