import React, {Component } from 'react';
import {Link } from 'react-router-dom';
import '../css/form.css';

class Register extends Component   {

    constructor(props)  {
        super(props);
        this.prompt = false;
        this.flag = true;
        this.state = {
            email: "",
            username: "",
            password: "",
        };
    }

    setEmail=evt=>  {
        this.setState({email: evt.target.value})
    }

    setUsername=evt=>  {
        this.setState({username: evt.target.value})
    }

    setPassword=evt=>  {
        this.setState({password: evt.target.value})
    }

    saveToLocal=()=>    {
        this.prompt = false;
        var storedUsers=localStorage.getItem('users')
            ?JSON.parse(localStorage.getItem('users'))
            : []

        Object.entries(storedUsers).forEach((user,value)=>{
            if(user[1]["email"]===this.state.email ){
                this.prompt = true;
                this.flag = false;
            }
        })
        if(this.flag===true)    {
        storedUsers.push(this.state);
        localStorage.setItem('users',JSON.stringify(storedUsers));
        }
        this.flag =true;
        this.setState({
            email: "",
            username: "",
            password: ""
        })
    }

    render()    {
        return(
            <div className="login">
                <h1>Register</h1>
                <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.setEmail} />
                {
                    this.prompt ? (
                        <p>this email is already exist</p>
                    ): (null)
                }
                <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.setUsername} />
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.setPassword} />
                <button onClick={this.saveToLocal}>Register</button>
                <p>Already have an account</p>
                <Link to="/user" >login</Link>
            </div>
        )
    }
}

export default Register;