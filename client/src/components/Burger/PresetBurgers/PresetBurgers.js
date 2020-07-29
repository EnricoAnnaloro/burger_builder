import React, { Component } from 'react';
import { connect } from 'react-redux';

import theDoubleDouble from '../../../assets/images/presetBurgers/theDoubleDouble.png';
import theGourmet from '../../../assets/images/presetBurgers/theGourmet.png';
import theHealthyOne from '../../../assets/images/presetBurgers/theHealthyOne.png';
import theTripleThreat from '../../../assets/images/presetBurgers/theTripleThreat.png';

import { setPresetBurger } from '../../../store/actions/index';

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
                ingredients: { salad: 0, bacon: 2, cheese: 2, meat: 2 },
                img: "theDoubleDouble"
            },
            {
                name: "theGourmet",
                ingredients: { salad: 0, bacon: 3, cheese: 3, meat: 3 },
                img: "theGourmet"
            },
            {
                name: "theHealthyOne",
                ingredients: { salad: 2, bacon: 0, cheese: 1, meat: 1 },
                img: "theHealthyOne"
            },
            {
                name: "theTripleThreat",
                ingredients: { salad: 0, bacon: 1, cheese: 1, meat: 3 },
                img: "theTripleThreat"
            },
        ]
    }


    render() {

        let presetBurgers = null;
        if (this.state.presetBurgers.length > 0) {
            presetBurgers = (this.state.presetBurgers.map(presetBurger => {
                return (
                    <div className="BurgerPreset" key={presetBurger.name} onClick={() => this.props.onPresetClicked(presetBurger.ingredients)}>
                        <p>{presetBurger.name}</p>
                        <img src={imageSet[presetBurger.img]} alt="Not found"></img>
                    </div>
                )
            }))
        }

        return (
            <div className="PresetBurgers">
                {presetBurgers}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPresetClicked: ingredients => dispatch(setPresetBurger(ingredients))
    };
}

export default connect(null, mapDispatchToProps)(PresetBurgers);

