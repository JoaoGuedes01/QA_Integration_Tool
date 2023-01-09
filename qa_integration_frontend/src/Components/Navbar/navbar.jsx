import React from 'react'
import './navbar.css'
import SVGIcon from './svg.jsx'
import { Link } from 'react-router-dom'

const Navbar = (props) => {

    const username = props.username
    const connectedTFS = props.connectTFS
    const connectedJira = props.connectJira

    return (
        <div className='navbar-container'>
            <div className='logo-container'>
                <SVGIcon type='qalf' />
                <Link className='nav-btn' to={'/dash'}>Migrate to Jira</Link>
                <Link className='nav-btn' to={'/work-item-dash'}>Work Item Analysis</Link>
                <Link className='nav-btn' to={'/knowledge-sharing'}>Knowledge Sharing</Link>
                <Link className='nav-btn' to={'/qa-learning'}>QA Learning</Link>
            </div>
            <div className='logo-container'>
                <div className='connections-container'>
                    <div className='connection'>
                        <SVGIcon type='tfs' />
                        <SVGIcon type={connectedTFS === true ? 'connected' : 'n-connected'} />
                    </div>
                    <div className='connection'>
                        <SVGIcon type='jira' />
                        <SVGIcon type={connectedJira === true ? 'connected' : 'n-connected'} />
                    </div>
                </div>
                <h2 className='jira-name'>{username}</h2>
                <Link className='nav-btn red' to={'/'}>Change Credentials</Link>
            </div>
        </div>
    )
}

export default Navbar