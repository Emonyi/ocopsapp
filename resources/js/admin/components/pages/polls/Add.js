import React from "react";
import Breadcrumb from "../../partials/Breadcrumb";
import { Link, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import SuccessAlert from "../../partials/SuccessAlert";
import ErrorAlert from "../../partials/ErrorAlert";
import Axios from "axios";
// import SuccessAlert from '../../partials/SuccessAlert';
// import ErrorAlert from '../../partials/ErrorAlert';
// import { Redirect } from 'react-router';
import AddTopicModal from "../topics/AddModal";

class Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            poll: "",
            topic: "",
            purpose: "",
            alert_message: "",
            topics: [],
            fireRedirect: false,
            show_add_topic_modal: false,
            redirect: "",
            pollID: ""
        };

        this.handlePollChange = this.handlePollChange.bind(this);
        this.handleTopicsChange = this.handleTopicsChange.bind(this);
        this.handlePurposeChange = this.handlePurposeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlePollChange(e) {
        this.setState({ poll: e.target.value });
    }

    handleTopicsChange(e) {
        this.setState({ topic: e.target.value });
    }

    handlePurposeChange(e) {
        this.setState({ purpose: e.target.value });
    }

    openAddTopicModal(e) {
        this.setState({});
    }

    resetForm() {
        this.setState({ title: "", description: "" });
    }

    // componentDidMount() {
    //     axios.get('http://127.0.0.1:8000/api/topics/create')
    //     .then(response=>{
    //         this.setState({topics:response.data});
    //     })
    // }

    async componentDidMount() {
        //we grab the response, extract the data property, and then set it to state
        //    const response = await axios.get('http://127.0.0.1:8000/api/topics/create')
        //    const topics = response.data
        //    this.setState({topics: topics})

        //neaten the code by deconstructing our data right away
        const { data } = await Axios.get(
            "http://127.0.0.1:8000/api/topics/create"
        );
        this.setState({ topics: data });
    }

    handleSubmit(e) {
        e.preventDefault();

        const polls = {
            poll: this.state.poll,
            topic: this.state.topic,
            purpose: this.state.purpose
        };

        axios
            .post("http://127.0.0.1:8000/api/polls/store", polls)
            .then(res => {
                console.log(res.data);
                this.setState({ alert_message: "success" });
                this.props.history.push('/polls/poll_question');
                // if (this.state.redirect) {
                //     return <Redirect to={this.state.redirect}/>
                // }
                // this.setState({alert_message:'success'})
                // this.setState({redirect:"/questions"});
                // return <Redirect to="/questions/add" />;
            })
            .catch(error => {
                this.setState({ alert_message: "error" });
            });

        // this.setState({ poll: "", topic: "", purpose: "" });
    }

    openAddTopicModal() {
        this.setState({
            show_add_topic_modal: true
        });
    }

    closeAddTopicModal() {
        this.setState({
            show_add_topic_modal: false
        });
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Add Polls</h1>
                    <Breadcrumb />
                </section>

                <section className="content">
                    <div className="row">
                        <form
                            role="form"
                            method="post"
                            onSubmit={this.handleSubmit}
                        >
                            <div className="col-md-8">
                                <div className="box box-warning">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">
                                            Add Poll{" "}
                                            <i className="fa fa-question-circle"></i>
                                        </h3>
                                        &emsp;
                                        <Link
                                            to="/polls"
                                            className="btn btn-warning btn-sm"
                                        >
                                            <i className="fa fa-arrow-left"></i>{" "}
                                            Back to list
                                        </Link>
                                    </div>
                                    {this.state.alert_message == "success" ? (
                                        <SuccessAlert
                                            message={"Topic added successfully"}
                                        />
                                    ) : null}
                                    {this.state.alert_message == "error" ? (
                                        <ErrorAlert
                                            message={
                                                "Error occured! Try again."
                                            }
                                        />
                                    ) : null}

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
                                            <small
                                                id="pollHelp"
                                                className="form-text form-muted"
                                            >
                                                Give your poll a title that
                                                attracts attention
                                            </small>
                                        </div>
                                        {/* <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    
                                                    <select
                                                        name="topic"
                                                        id="topic"
                                                        className="form-control"
                                                        onChange={
                                                            this
                                                                .handleTopicsChange
                                                        }
                                                    >
                                                        <option>
                                                            Select topic
                                                        </option>
                                                        
                                                    </select>
                                                    
                                                    <span className="input-group-btn">
                                                        <button
                                                            type="button"
                                                            className="btn btn-info btn-flat"
                                                            onClick={this.openAddTopicModal.bind(this)}
                                                        >
                                                            <i className="fa fa-plus"></i>{" "}
                                                            Add new topic
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div> */}

                                        <div className="form-group">
                                            <label>Purpose</label>
                                            {/* <input
                                                type="text"
                                                className="form-control"
                                                name="purpose"
                                                value={this.state.title}
                                                placeholder="Topic title"
                                                onChange={
                                                    this.handlePurposeChange
                                                }
                                            /> */}
                                            <textarea
                                                name="purpose"
                                                className="form-control"
                                                rows="5"
                                                value={this.state.purpose}
                                                onChange={
                                                    this.handlePurposeChange
                                                }
                                            ></textarea>
                                            <small
                                                id="purposeHelp"
                                                className="form-text form-muted"
                                            >
                                                Giving a purpose will increase
                                                responses
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="box box-success">
    
                                    <div className="box-body">
                                        <div className="input-group input-group-sm">
                                            {/* <label>Topic</label> */}
                                            <select
                                                name="topic"
                                                id="topic"
                                                className="form-control"
                                                onChange={
                                                    this.handleTopicsChange
                                                }
                                                value={this.state.topic}
                                            >
                                                <option value="">
                                                    select topic
                                                </option>
                                                {this.state.topics.map(
                                                    topic => {
                                                        return (
                                                            <option
                                                                key={topic.id}
                                                                value={topic.id}
                                                            >
                                                                {topic.title}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>

                                            <span className="input-group-btn">
                                                <button
                                                    type="button"
                                                    className="btn btn-info btn-flat"
                                                    onClick={this.openAddTopicModal.bind(
                                                        this
                                                    )}
                                                >
                                                    <i className="fa fa-plus"></i>{" "}
                                                    Add new topic
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="box-footer">
                                        <button
                                            type="submit"
                                            onClick={this.handleSubmit}
                                            className="btn btn-success pull-right"
                                        >
                                            <i className="fa fa-plus-circle"></i>{" "}
                                            Create Poll
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
                <AddTopicModal
                    show_modal={this.state.show_add_topic_modal}
                    close_modal={this.closeAddTopicModal.bind(this)}
                />
            </div>
        );
    }
}

export default withRouter(Add);
