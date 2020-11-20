import React, {Component } from 'react';
import {Link, Redirect } from 'react-router-dom';
import '../css/form.css';



class Form extends Component   {

    state = {
        username: "",
        password: "",
        prompt: false
    }

    getUsername=evt=>  {
        this.setState({username: evt.target.value})
    }

    getPassword=evt=>  {
        this.setState({password: evt.target.value})
    }

    checkUser=()=>  {
        var users = localStorage.getItem('users')
                ? (JSON.parse(localStorage.getItem('users')))
                : [] ;
        Object.entries(users).forEach((user,value)=>{
            if(user[1]["email"]===this.state.username && user[1]["password"]=== this.state.password){
                sessionStorage.setItem("currentUser",this.state.username);
            }
        })
        this.setState({
            username: "",
            password: "",
            prompt: true
        })
    }

    reDirect=()=>{
            return <Redirect from="/user" to="/home" />
    }

    render()    {
        return(
            <div>
            {
                sessionStorage.getItem('currentUser') === null ? (
                    <div className="login">
                    <h1>Login</h1>
                    <input type="text" name="email" placeholder="email" value={this.state.username} onChange={this.getUsername} />
                    <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.getPassword} />
                    {
                        this.state.prompt ? <p>username or password is incorrect</p> : null
                    }
                    <button onClick={this.checkUser} >login</button>
                    <p>don't have an account?</p>
                    <Link to="/register">register</Link>
                </div>
                ) : (
                    this.reDirect()
                )
            }
            </div>
        )
    }
}

export default Form;