import React from 'react';
import Breadcrumb from '../../partials/Breadcrumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SuccessAlert from '../../partials/SuccessAlert';
import ErrorAlert from '../../partials/ErrorAlert';
// import Index from '../topics/Index';
// import SuccessAlert from '../../partials/SuccessAlert';
// import ErrorAlert from '../../partials/ErrorAlert';
 
class Index extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            title: '',
            polls:[]
        }    
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/polls/edit/'+this.props.match.params.id)
        .then(response=>{
            this.setState({polls:response.data});
        })
    }
    
    render()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Add new question
                    </h1>
                    <Breadcrumb />
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-warning">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Poll: <i className="fa fa-question-circle"></i></h3>&emsp;
                                    <Link to="/polls/add" className="btn btn-warning btn-sm"><i className="fa fa-arrow-left"></i> Back </Link>
                                </div>
                               
                                    <div className="box-body">
                                        {/* <Link class="btn btn-dark" to="/polls/{{$poll->id}}/questions/create">Add New Question</Link> */}
                                        <Link className="btn btn-primary" to="/questions/add">Add New Question</Link>
                                    </div>
                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-success">Submit</button>
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