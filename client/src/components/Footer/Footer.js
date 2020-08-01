import React from 'react';

import './Footer.css'

const Footer = () => {
    return (
        <div className="Footer">
            <div className="BurgerInfo">
                <ul>
                    <li>
                        <p>Saint's Burgers Street, 45</p>
                    </li>
                    <li>
                        <p>+34 33347594039</p>
                    </li>
                    <li>
                        <p>build.yourburger@burger.com</p>
                    </li>
                </ul>
            </div>
            <div className="DevInfo">
                <ul>
                    <li>
                        <a href="https://enricoannaloro.com">Developer Website</a>
                    </li>
                    <li>
                        <a href="https://github.com/EnricoAnnaloro"><i className="fab fa-github-square"></i></a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/enrico-annaloro/"><i className="fab fa-linkedin"></i></a>
                    </li>
                    <li>
                        <a href="mailto:enrico.annaloro@gmail.com"><i className="fas fa-at"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
