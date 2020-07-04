import React, {Fragment} from 'react'
import Logo from '../../Logo/Logo'
import './Toolbar.css'

const toolbar = () => {
    return(
        <Fragment>
            <header className="Toolbar">
                <div>MENU</div>
                <Logo/>
                <div>LINKS</div>                
            </header>
        </Fragment>
    )
}

export default toolbar;