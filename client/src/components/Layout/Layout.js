import React, { Component, Fragment } from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Footer from '../Footer/Footer';
import ErrorDisplay from '../../containers/ErrorDisplay/ErrorDisplay';


import './Layout.css'

class Layout extends Component {

    state = {
        isSideDrawerOpen: false
    }

    closeSideDrawerHandler = () => {
        this.setState({isSideDrawerOpen: false});
    }

    openSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {isSideDrawerOpen: !prevState.isSideDrawerOpen};
        });
    }

    render() {
        return(
            <Fragment>
                <ErrorDisplay />
                <Toolbar openSideDrawer={this.openSideDrawerHandler} sideDrawerState={this.state.isSideDrawerOpen}/>
                <SideDrawer isOpen={this.state.isSideDrawerOpen} toClose={this.closeSideDrawerHandler}/>                
                <main className="MainContent">                
                    {this.props.children}
                </main>
                <Footer />
            </Fragment>
        )
    }
}

export default Layout