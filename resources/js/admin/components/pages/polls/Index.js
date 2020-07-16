import React from 'react';
import Breadcrumb from '../../partials/Breadcrumb';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
// import SuccessAlert from '../../partials/SuccessAlert';
 
class Index extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            polls:[],
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
        axios.get('http://127.0.0.1:8000/api/polls?page='+pageNumber)
        .then(response=>{
            this.setState({
                polls:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page
            });
        });
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/polls')
        .then(response=>{
            this.setState({
                polls:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page
            });
        });
    }

    handleDelete(poll_id) {
       if (confirm('Move to trash?')) {    
        axios.delete('http://127.0.0.1:8000/api/polls/delete/'+poll_id)
            .then(response=>{
                this.setState({alert_message:'success'});
                
            }).catch(error=>{
                this.setState({alert_message:'error'});
            })
            
        } 
        this.props.history.push('/polls');
    }

    render()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Polls
                    </h1>
 
                    <Breadcrumb />
 
                </section>
 
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">All Polls</h3>
 
                                    <Link to='/polls/add' className="btn btn-primary pull-right">Add <i className="fa fa-plus"></i></Link>
                                </div>
                                <div className="box-body">
                                
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Poll</th>
                                            {/* <th>Topics</th> */}
                                            <th>Purpose</th>
                                            <th width="35%">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.polls.map(poll => {
                                                    return (
                                                <tr key="{poll.id}">
                                                    <td scope="row">1</td>
                                                    <td>{poll.poll}</td>
                                                    {/* <td>{poll.topic}</td> */}
                                                    <td>{poll.purpose}</td>
                                                    <td>
                                                        <Link to={`polls/edit/${poll.id}`} className="btn btn-info"><i className="fa fa-edit"></i> Update</Link>&ensp;
                                                        <a href="" onClick={this.handleDelete.bind(this, poll.id)} className="btn btn-danger"><i className="fa fa-trash"> Delete</i></a>&ensp;
                                                        <Link to={`questions/question/${poll.id}`} className="btn btn-success"> Create Question <i className="fa fa-arrow-right"></i> </Link>
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
 
export default withRouter(Index);