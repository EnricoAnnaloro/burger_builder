import React, {Fragment} from 'react'
import Toolbar from '../Navigation/Toolbar/Toolbar'

import './Layout.css'

const layout = (props) => {
    return(
        <Fragment>
            <div className="NavBar">
                <Toolbar />
            </div>
            <main className="MainContent">
                {props.children}
            </main>
        </Fragment>
    )
}

export default layout