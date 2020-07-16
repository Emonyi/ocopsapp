import React from "react";
import Breadcrumb from "../../partials/Breadcrumb";
import { Link } from "react-router-dom";
import axios from 'axios';

class Edit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: {},
            email: {},
            alert_message: {}
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/edit/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                name:response.data.name,
                email:response.data.email,
            })
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const users = {
            name:this.state.name,
            email:this.state.email,
        }

        axios.put('http://127.0.0.1:8000/api/users/update/'+this.props.match.params.id, users)
        .then(res=>{
            this.setState({alert_message:'success'});
        })
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Edit user</h1>
                    <Breadcrumb />
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-warning">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Edit user</h3>
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
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="name"
                                                        value={this.state.name}
                                                        onChange={
                                                            this.handleNameChange
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        name="email"
                                                        value={this.state.email}
                                                        onChange={
                                                            this.handleEmailChange
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
                                            Update
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

export default Edit;
