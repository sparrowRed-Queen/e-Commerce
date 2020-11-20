import React , {Component } from 'react';
import {Link } from 'react-router-dom';
import '../css/form.css';

class Start extends Component   {
    render()    {
        return(
            <div>
                <form className="login">
                    <Link to="/adminlogin"><button>Admin</button></Link>
                    <Link to="/user"><button>User</button></Link>
                </form>
            </div>
        )
    }
}

export default Start;