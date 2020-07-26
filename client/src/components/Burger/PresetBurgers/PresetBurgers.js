import React, { Component } from 'react';

import theDoubleDouble from '../../../assets/images/presetBurgers/theDoubleDouble.png';
import theGourmet from '../../../assets/images/presetBurgers/theGourmet.png';
import theHealthyOne from '../../../assets/images/presetBurgers/theHealthyOne.png';
import theTripleThreat from '../../../assets/images/presetBurgers/theTripleThreat.png';


import './PresetBurgers.css';

const imageSet = {
    "theDoubleDouble": theDoubleDouble,
    "theGourmet": theGourmet,
    "theHealthyOne": theHealthyOne,
    "theTripleThreat": theTripleThreat,
};

class PresetBurgers extends Component {

    state = {
        presetBurgers: [
            {
                name: "theDoubleDouble",
                ingredients: { salad: 1, bacon: 1, cheese: 2, meat: 1 },
                img: "theDoubleDouble"
            },
            {
                name: "theGourmet",
                ingredients: { salad: 1, bacon: 1, cheese: 2, meat: 1 },
                img: "theGourmet"
            },
            {
                name: "theHealthyOne",
                ingredients: { salad: 1, bacon: 1, cheese: 2, meat: 1 },
                img: "theHealthyOne"
            },
            {
                name: "theTripleThreat",
                ingredients: { salad: 1, bacon: 1, cheese: 2, meat: 1 },
                img: "theTripleThreat"
            },
        ]
    }


    render() {

        let presetBurgers = null;
        console.log(this.state.presetBurgers.length);
        if (this.state.presetBurgers.length > 0) {
            presetBurgers = (this.state.presetBurgers.map(presetBurger => {
                return (
                    <div className="BurgerPreset" key={presetBurger.name}>
                        <p>{presetBurger.name}</p>
                        <img src={imageSet[presetBurger.img]} alt="Not found"></img>
                    </div>
                )
            }))
        }

        console.log(presetBurgers);

        return (
            <div className="PresetBurgers">
                {presetBurgers}
            </div>
        );
    }
}

export default PresetBurgers;

