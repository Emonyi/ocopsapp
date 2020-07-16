import React from 'react';
import Breadcrumb from '../../partials/Breadcrumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SuccessAlert from '../../partials/SuccessAlert';
import ErrorAlert from '../../partials/ErrorAlert';
// import SuccessAlert from '../../partials/SuccessAlert';
// import ErrorAlert from '../../partials/ErrorAlert';
 
class Edit extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            poll: '',
            topic:'',
            purpose:'',
            alert_message:'',
            topics:[]
        }

        this.handlePollChange = this.handlePollChange.bind(this);
        this.handleTopicsChange = this.handleTopicsChange.bind(this);
        this.handlePurposeChange = this.handlePurposeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlePollChange(e)
    {
        this.setState({poll:e.target.value});
    }

    handleTopicsChange(e) {
        this.setState({topic:e.target.value})
    }

    handlePurposeChange(e) {
        this.setState({purpose:e.target.value});
    }

    resetForm() {
        this.setState({title:'',description:''})
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/polls/edit/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                poll:response.data.poll,
                topic:response.data.topic,
                purpose:response.data.purpose
            });
        })

        axios.get('http://127.0.0.1:8000/api/topics/create')
        .then(res=>{
            this.setState({topics:res.data});
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let polls = {
            poll: this.state.poll,
            topic: this.state.topic,
            purpose: this.state.purpose
        }

        axios.put('http://127.0.0.1:8000/api/polls/update/'+this.props.match.params.id,polls)
        .then(res=>{
            // console.log(res.data);
            this.setState({alert_message:'success'})
        }).catch(error=>{
            this.setState({alert_message:'error'});
        });

        this.setState({title:'', description:''})
    }

    render()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Edit Polls
                    </h1>
                    <Breadcrumb />
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-warning">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Edit Poll <i class="fa fa-question-circle"></i></h3>&emsp;
                                    <Link to="/polls" className="btn btn-warning btn-sm"><i className="fa fa-arrow-left"></i> Back to list</Link>
                                </div>
                                {this.state.alert_message=="success"?<SuccessAlert message={"Topic updated successfully"} />:null }
                                {this.state.alert_message=="error"?<ErrorAlert message={"Error occured! Try again."} />:null }
                                <form role="form" method="post" onSubmit={this.handleSubmit}>
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label>Poll Title</label>
                                            <input 
                                                type="text"
                                                className="form-control"
                                                name="poll"
                                                value={this.state.poll}
                                                placeholder="Topic title"
                                                onChange={this.handlePollChange}
                                            />
                                            <small id="pollHelp" className="form-text form-muted">Give your poll a name that attracts attention</small>

                                        </div>
                                        
                                        <div className="form-group">
                                            <label>Topic</label>
                                            <select name="topic" id="topic" value={this.state.topic} className="form-control" onChange={this.handleTopicsChange}>
                                                <option>Select topic</option>
                                                    {
                                                        this.state.topics.map(topic=>{
                                                            return (
                                                                <option key={topic.id} value={topic.id}>{topic.title}</option>
                                                            )
                                                        })
                                                    }
                                            </select>
                                            
                                        <small id="topicHelp" className="form-text form-muted">Select the required topic from the choices provided</small>
                                        </div>

                                        <div className="form-group">
                                            <label>Purpose</label>
                                            <input 
                                                type="text"
                                                className="form-control"
                                                name="purpose"
                                                value={this.state.purpose}
                                                placeholder="Poll Purpose"
                                                onChange={this.handlePurposeChange}
                                            />
                                            <small id="purposeHelp" className="form-text form-muted">Giving a purpose will increase responses</small>

                                        </div>

                                    </div>
                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-success"><i class="fa fa-plus-circle"></i> Update</button>
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