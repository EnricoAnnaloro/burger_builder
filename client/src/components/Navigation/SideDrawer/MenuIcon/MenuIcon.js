import React from 'react';
import './MenuIcon.css'

const menuIcon = ( props ) => {

    return (
        <div className={"MenuIcon"} onClick={props.clicked}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
    );
}

export default menuIcon;
