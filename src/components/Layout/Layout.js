import React, {Component, Fragment} from 'react'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

import './Layout.css'

class Layout extends Component {

    state = {
        opneSideDrawer: true
    }

    closeSideDrawerHandler = () => {
        this.setState({opneSideDrawer: false});
    }

    render() {
        return(
            <Fragment>
                <Toolbar />
                <SideDrawer isOpen={this.state.opneSideDrawer} toClose={this.closeSideDrawerHandler}/>                
                <main className="MainContent">
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}

export default Layout