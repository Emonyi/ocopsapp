import React, { Component } from 'react';
import Breadcrumb from '../partials/Breadcrumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
 
class Dashboard extends Component
{
    constructor(props)
    {
       super(props);
 
        document.body.classList.remove("login-page");
        document.body.classList.add("skin-green");

        this.state = {
            users:[],
            topics:[],
            polls:[]
        }

    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/topics/create')
        .then(response=>{
            this.setState({topics:response.data})
        })

        axios.get('http://127.0.0.1:8000/api/polls/create')
        .then(response=>{
            this.setState({polls:response.data})
        })

        axios.get('http://127.0.0.1:8000/api/users/create')
        .then(response=>{
            this.setState({users:response.data})
        })
    }
 
    render() {
        return (
            <div className="content-wrapper">
 
                <section className="content-header">
                    <h1>
                        Dashboard
                        <small>Control panel</small>
                    </h1>
 
                    <Breadcrumb />
 
                </section>
 
                <section className="content">
                    <div className="row">
                        <div className="col-md-4 col-xs-6">
                            <div className="small-box bg-aqua">
                                <div className="inner">
                                    <h2>
                                       {this.state.polls.length}
                                    </h2>
                                    <h4>Polls</h4>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-newspaper-o"></i>
                                </div>
                                <Link to="/polls" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-6">
                            <div className="small-box bg-green">
                                <div className="inner">
                                    <h2>
                                        {this.state.topics.length}
                                    </h2>
                                    <h4>Topics</h4>
 
                                    <p></p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-list"></i>
                                </div>
                                <Link to="/topics" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-6">
                            <div className="small-box bg-yellow">
                                <div className="inner">
                                    <h2>0</h2>
                                    <h4>Responses</h4>
 
                                    <p></p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-comments-o"></i>
                                </div>
                                <Link to="/responses" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-6">
                            <div className="small-box bg-blue">
                                <div className="inner">
                                    <h2>{this.state.users.length}</h2>
                                    <h4>Users</h4>
                                    <p></p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-users"></i>
                                </div>
                                <Link to="/users" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-6">
                            <div className="small-box bg-red">
                                <div className="inner">
                                    <h2>3</h2>
                                    <h4>Questions</h4>
                                    <p></p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-question-circle"></i>
                                </div>
                                <Link to="/questions" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-warning">
                                <div className="box-header">
                                    <div className="row">
                                        <div className="col-sm-9">
                                            <h3>My Polls</h3>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="pull-right">
                                                <Link to="/polls/add" className="btn btn-success btn-sm"><h4><i className="fa fa-plus"></i>&nbsp;Start Poll</h4></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
 
export default Dashboard;