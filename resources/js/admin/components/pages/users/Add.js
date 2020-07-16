import React from "react";
import Breadcrumb from "../../partials/Breadcrumb";
import { Link } from "react-router-dom";
import axios from 'axios';

class Add extends React.Component {
    constructor() {
        super();

        this.state = {
            name: {},
            email: {},
            password: {},
            is_admin:'',
            alert_message: {},
            isChecked: true
        };

        this.handleIsAdmin = this.handleIsAdmin.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleIsAdmin() {
        this.setState({ isChecked: !this.state.isChecked });
    }

    handleNameChange(e) {
        this.setState({name:e.target.value});
    }

    handleEmailChange(e) {
        this.setState({email:e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password:e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        const users = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            is_admin:this.state.is_admin
        }

        axios.post('http://127.0.0.1:8000/api/users', users)
        .then(res=>{
            this.setState({alert_message:'success'});
        })
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Add user</h1>
                    <Breadcrumb />
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-warning">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Add user</h3>
                                    <Link
                                        to="/users"
                                        className="btn btn-warning btn-sm pull-right"
                                    >
                                        <i className="fa fa-arrow-left"></i>{" "}
                                        Back
                                    </Link>
                                </div>
                                <form role="form" method="post" onSubmit={this.handleSubmit}>
                                    <div className="box-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Name"
                                                        name="name"
                                                        onChange={
                                                            this.handleNameChange
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            {/* <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Username</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="First name"
                                                        name="username"
                                                        onChange={
                                                            this.handleFirstName
                                                        }
                                                    />
                                                </div>
                                            </div> */}

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Email address"
                                                        name="email"
                                                        onChange={
                                                            this.handleEmailChange
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Password"
                                                        name="password"
                                                        onChange={
                                                            this.handlePasswordChange
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <div className="checkbox">
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                placeholder="First name"
                                                                name="is_admin"
                                                                value="1"
                                                                checked={this.state.isChecked==1}
                                                                onChange={
                                                                    this.handleIsAdmin
                                                                }
                                                            />
                                                        Is Admin
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Confirm Password</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Password"
                                                        name="conf_password"
                                                        onChange={
                                                            this.handlePasswordChange
                                                        }
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="box-footer">
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Add;
