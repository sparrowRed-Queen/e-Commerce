import React, {Component } from 'react';
import {Redirect } from 'react-router-dom';
import '../css/form.css';

class AdminLogin extends Component   {

    constructor(props)  {
        super(props);
            this.state = {
            username: "",
            password: "",
            prompt: false,
            flag:false
        };
        this.checkIsAdmin = this.checkIsAdmin.bind(this);
    }

    getUsernme=evt=>    {
        this.setState({username: evt.target.value})
    }

    getPassword=evt=>   {
        this.setState({password: evt.target.value})
    }

    reDirect=()=>{
        if(this.state.flag) {
            return <Redirect from="/adminlogin" to="/adminhome" />
        }
    }

    logUser()   {
        sessionStorage.setItem('currentUser', this.state.username)
        this.setState({flag: true})
    }

    checkIsAdmin()  {
        console.log("flag",this.state.username," ", this.state.password)
        this.state.username === "admin" && this.state.password === "admin"
        ? (
            this.logUser()
        ) : (
            this.setState({prompt: true})
        )
    }

    render()    {
        return(
            <div >
                {
                    this.reDirect()
                }
                <div className="login">
                    <h1>Admin</h1>
                    <input type="text" placeholder="username" value={this.state.username} onChange={this.getUsernme} />
                    <input type="password" placeholder="password" value={this.state.password} onChange={this.getPassword} />
                    {
                        this.state.prompt ? <p>username or password is incorrect</p> : null
                    }
                    <button onClick={this.checkIsAdmin} >login</button>
                </div>
            </div>
        )
    }
}

export default AdminLogin;