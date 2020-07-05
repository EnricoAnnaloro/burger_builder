import React from 'react';
import './NavigationItem.css';

const navigationItem = (props) => {
    const aClasses = props.active ? "active" : null;

    return (
        <li className="NavigationItem">
            <a href={props.link} className={aClasses}>{props.children}</a>
        </li>
    );
}

export default navigationItem;
