import React from 'react';
import Breadcrumb from '../../partials/Breadcrumb';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
// import SuccessAlert from '../../partials/SuccessAlert';
 
class poll_question extends React.Component
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
        axios.get('http://127.0.0.1:8000/api/polls/poll_question?page='+pageNumber)
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
        axios.get('http://127.0.0.1:8000/api/polls/poll_question')
        .then(response=>{
            this.setState({
                polls:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page
            });
        });
    }

    render()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Create poll question
                    </h1>
 
                    <Breadcrumb />
 
                </section>
 
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Click poll to Create related question</h3>
 
                                    <Link to='/polls/add' className="btn btn-warning pull-right"><i className="fa fa-arrow-left"></i> Back to polls </Link>
                                </div>
                                <div className="box-body">
                                
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Poll</th>
                                            <th>Created date</th>
                                            <th width="25%">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.polls.map(poll => {
                                                    return (
                                                <tr key="{poll.id}">
                                                    <td scope="row">1</td>
                                                    <td>
                                                        <Link to={`/questions/question/${poll.id}`}> {poll.poll} </Link>
                                                    </td>
                                                    <td>{poll.created_at}</td>
                                                    <td>
                                                        <Link to={`/questions/question/${poll.id}`} className="btn btn-info"><i className="fa fa-edit"></i> Create question</Link>
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
 
export default poll_question;