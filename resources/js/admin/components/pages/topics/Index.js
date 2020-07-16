import React from 'react';
import Breadcrumb from '../../partials/Breadcrumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
// import SuccessAlert from '../../partials/SuccessAlert';
 
class Index extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            topics:[],
            activePage:1,
            itemsCountPerPage:1,
            totalItemsCount:1,
            pageRangeDisplayed:3,
            alert_message:''
        }

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        axios.get('http://127.0.0.1:8000/api/topics?page='+pageNumber)
        .then(response=>{
            this.setState({
                topics:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page
            });
        });
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/topics')
        .then(response=>{
            this.setState({
                topics:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page
            });
        });
    }

    handleDelete(topic_id) {
       if (confirm('Move to trash?')) {    
        axios.delete('http://127.0.0.1:8000/api/topics/delete/'+topic_id)
            .then(response=>{
                this.setState({alert_message:'success'});
                this.props.history.push('/topics');
            }).catch(error=>{
                this.setState({alert_message:'error'});
            })
        } 
    }

    render()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Topics
                    </h1>
 
                    <Breadcrumb />
 
                </section>
 
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">All Topics</h3>
 
                                    <Link to='topics/add' className="btn btn-primary pull-right">Add <i className="fa fa-plus"></i></Link>
                                </div>
                                <div className="box-body">
                                
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th width="25%">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.topics.map(topic => {
                                                    return (
                                                <tr key="{topic.id}">
                                                    <td scope="row">1</td>
                                                    <td>{topic.title}</td>
                                                    <td>{topic.description}</td>
                                                    <td>
                                                        <Link to={`topics/edit/${topic.id}`} className="btn btn-info"><i className="fa fa-edit"></i> Update</Link>&ensp;
                                                        <a href="#" onClick={this.handleDelete.bind(this, topic.id)} className="btn btn-danger"><i className="fa fa-trash"> Delete</i></a>
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
                                        itemClass='page-item'
                                        linkClass='page-link'
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