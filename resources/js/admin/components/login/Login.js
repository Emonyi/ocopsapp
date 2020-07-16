import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import {Auth} from '../../services/Auth';
 
class Login extends Component
{
    constructor(props)
    {
        super(props);
 
        document.body.classList.remove("skin-green");
        document.body.classList.add("login-page");
 
        this.state = {
            email: "",
            password: "",
            submitted:false,
            loading:false,
            error_message: null,
            errors: null,
            error:''
        };
 
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
 
        this.handlePassword = this.handlePassword.bind(this);
    }
 
    handleEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
 
    handlePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    // handleChange(e) {
    //     const { name, value } = e.target;
    //     this.setState({[name]:value});
    // }
 
    handleSubmit(e) {
        e.preventDefault();
 
        this.setState({
            // error_message: null,
            // errors: null
            submitted:true
        });
        const {email, password, returnUrl}=this.state;
 
        if(!(email && password)) {
            return;
        }

        this.setState({loading:true});
        Auth.login(email,password)
        .then(
            user=>{
                const { from } = this.props.location.state || { from: { pathname: "/" } };
                this.props.history.push(from);
            },
            error=>this.setState({error,loading:false})
        );
 
        
    }
 
    render() {
        const { email, password, submitted, loading, error } =this.state
        return (
            <div className="container">
                <div className="login-box">
                    <div className="login-logo">
                        <b>OCOP</b>Admin
                    </div>
                    <div className="login-box-body">
                        <p className="login-box-msg">Sign in to start your session</p>
 
                        {/* {
                            this.state.error_message?(<div className="alert alert-danger">{this.state.error_message}</div>):null
                        } */}
 
                        <form action="#" method="post" onSubmit={this.handleSubmit}>
                            <div className={`form-group has-feedback ${this.state.errors && this.state.errors.email?'has-error':''}`}>
                                <label>Email</label>
                                <input type="email" name="email" className="form-control" placeholder="Email" onChange={this.handleEmail} value={this.state.email} />
                                    <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                                {/* {
                                    this.state.errors && this.state.errors.email?(<div className="help-block">{this.state.errors.email[0]}</div>):null
                                } */}
                            </div>
                            <div className={`form-group has-feedback ${this.state.errors && this.state.errors.password?'has-error':''}`}>
                                <label>Password</label>
                                <input type="password" name="password" className="form-control" placeholder="Password" onChange={this.handlePassword} value={this.state.password} />
                                    <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                                   
                                {/* {
                                    this.state.errors && this.state.errors.password?(<div className="help-block">{this.state.errors.password[0]}</div>):null
                                } */}
                            </div>
                            <div className="row">
                                <div className="col-xs-4">
                                    <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                                    
                                </div>
                                <Link className="btn btn-link pull-right" to="">
                                        Forgot Your Password?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default withRouter(Login);