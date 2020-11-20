import React, { Component } from 'react'
import {Link } from 'react-router-dom';
import {RiLogoutBoxRFill } from 'react-icons/all';

class AdminHomeHeader extends Component {

    logOut=()=>{
        sessionStorage.removeItem('currentUser');
    }

    render() {
        return (
            <div className="adminHeader">
                <p className="adminTitle">Admin View</p>
                <ul>
                    <li>
                        <Link to='adminlogin' onClick={this.logOut} >
                            <RiLogoutBoxRFill className="navIcons" title="Logout" />
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default AdminHomeHeader
