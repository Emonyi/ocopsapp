import React from 'react';
import Breadcrumb from '../../partials/Breadcrumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
 
class Index extends React.Component
{
    constructor() {
        super();

        this.state = {
            users:[],
            activePage:1,
            itemsCountPerPage:1,
            totalItemsCount:1,
            pageRangeDisplayed:3,
            alert_message:'',
            count:0
        }

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        axios.get('http://127.0.0.1:8000/api/users/index?page='+pageNumber)
        .then(response=>{
            this.setState({
                users:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page
            });
        });
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/index')
        .then(response=>{
            this.setState({
                users:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page
            });
        })
    }

    handleIncrement() {
        this.setState({
            count:(this.state.count+1)
        })
    }

    render()
    {
        return (
            <div className="content-wrapper">  
 
                <section className="content-header">
                    <h1>
                        List users
                    </h1>

                    <Breadcrumb/>
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">All users</h3>
                                    <Link to="/users/add" className="btn btn-primary pull-right">Add <i className="fa fa-plus"></i></Link>
                                </div>
                                <div className="box-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Is Admin</th>
                                                <th>Added on</th>
                                                <th width="15%">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.users.map(user=>{
                                                    return (
                                                        <tr key={user.id}>
                                                            <td>{}</td>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.is_admin==1?'Yes':'No'}</td>
                                                            <td>{user.created_at}</td>
                                                            <td>
                                                                <Link to={`/users/edit/${user.id}`} className="btn btn-primary"><i className="fa fa-edit"></i></Link>&nbsp;
                                                                <a href="" className="btn btn-danger"><i className="fa fa-trash"></i></a>
                                                            </td>
                                                        </tr>
                                                    )     
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <div>
                                        <Pagination 
                                            activePage={this.state.activePage}
                                            itemsCountPerPage={this.state.itemsCountPerPage}
                                            totalItemsCount={this.state.totalItemsCount}
                                            pageRangeDisplayed={this.state.pageRangeDisplayed}
                                            onChange={this.handlePageChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
 
export default Index;