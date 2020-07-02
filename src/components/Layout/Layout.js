import React, {Fragment} from 'react'
import './Layout.css'

const layout = (props) => {
    return(
        <Fragment>
            <div className="NavBar">
                <h1 style={{textAlign: "center"}}>Build-A-Burger</h1>
            </div>
            <main className="MainContent">
                {props.children}
            </main>
        </Fragment>
    )
}

export default layout