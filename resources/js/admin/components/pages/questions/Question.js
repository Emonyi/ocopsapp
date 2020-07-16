import React from 'react';
import Breadcrumb from '../../partials/Breadcrumb';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
// import SuccessAlert from '../../partials/SuccessAlert';
// import ErrorAlert from '../../partials/ErrorAlert';
// import Index from '../topics/Index';
// import SuccessAlert from '../../partials/SuccessAlert';
// import ErrorAlert from '../../partials/ErrorAlert';
 
class Question extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            polls:[],
            poll:'',
            alert_message:''
        }    
    }

    // componentDidMount() {
    //     const { id } = this.props.match.params
    //     console.log(id);
    //     axios.get('http://127.0.0.1:8000/api/polls/question/'+this.props.match.params.id)
    //     .then(response=>{
    //         this.setState({poll:response.data.poll});
    //     })
    // }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/questions/question/'+this.props.match.params.id)
        .then(res=>{
            this.setState({poll:res.data.poll});
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
                        <div className="col-md-8">
                            <div className="box box-warning">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Poll: {this.state.poll } </h3>&emsp;
                                    <Link to="/polls/poll_question" className="btn btn-warning btn-sm pull-right"><i className="fa fa-arrow-left"></i> Back </Link>
                                </div>
                               
                                    <div className="box-body">
                                        {/* <Link class="btn btn-dark" to="/polls/{{$poll->id}}/questions/create">Add New Question</Link> */}
                                        <Link className="btn btn-primary" to={`/questions/add/${this.props.match.params.id}`}>Add New Question</Link>
                                    </div>
                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-success">Submit</button>
                                    </div>

                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="box box-success">
                                <div className="box-header with-border">
                                    <h4 className="box-title">
                                        My polls
                                    </h4>
                                </div>

                                <div className="box-body">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
 
            </div>
        )
    }
}
 
export default Question;