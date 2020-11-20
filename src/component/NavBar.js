import React, {Component } from 'react';
import {Link } from 'react-router-dom';
import  {FaHome, FaHeart, MdShoppingCart, RiLogoutBoxRFill, RiLoginBoxFill } from 'react-icons/all';
import '../css/navBar.css';

class NavBar extends Component  {

    logOut=()=>{
        sessionStorage.removeItem('currentUser');
    }

    render()    {
        return(
            <div className="homeheader">
                <h1 className="adminTitle"><i>e<span>-Commerce</span></i></h1>
                <nav>
                    <ul className="navList" >
                        <li>
                            <Link to='/home'>
                            <FaHome className="navIcons" title="Home" />
                            </Link>
                        </li>
                        <li>
                           <Link to='/wishlist'>
                           <FaHeart className="navIcons" title="wishlist" />
                           </Link>
                        </li>
                        <li>
                            <Link to='/cart'>
                                <MdShoppingCart className="navIcons" title="Cart" />
                            </Link>
                        </li>
                        {
                            sessionStorage.getItem('currentUser') === null ? (
                                <Link to='/user' >
                                    <RiLoginBoxFill className="navIcons" title="Login" />
                                </Link>
                            ) : (
                                <Link to='/user' onClick={this.logOut} >
                                    <RiLogoutBoxRFill className="navIcons" title="Logout" />
                                </Link>
                            )
                        }
                    </ul>
                </nav>
            </div>
        )
    }
}

export default NavBar;