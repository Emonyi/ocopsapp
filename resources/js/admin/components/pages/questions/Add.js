import React, { Component } from "react";
import Breadcrumb from "../../partials/Breadcrumb";
import { Link } from "react-router-dom";
import axios from 'axios';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            poll:'',
            question:'',
            alert_message:''
         }

         this.handleQuestion = this.handleQuestion.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleQuestion(e) {
        this.setState({question:e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();

        const question = {
            question:this.state.question
        }

        axios.post('http://127.0.0.1:8000/api/questions/store', question)
        .then(res=>{
            this.setState({alert_message:'success'})
        })
        
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/questions/add')
        .then(response=>{
            this.setState({poll:response.data.poll})
        })

        // axios.get('http://127.0.0.1:8000/api/')
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Add Qustion</h1>
                    <Breadcrumb />
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-warning">
                                <div className="box-header with-border">
                                    <h3 className="box-title">
                                        Create new question {" "} on : {this.state.poll}
                                    </h3>
                                    &emsp;
                                    <Link
                                        to="/polls/poll_question"
                                        className="btn btn-warning btn-sm"
                                    >
                                        <i className="fa fa-arrow-left"></i>{" "}
                                        Back{" "}
                                    </Link>
                                </div>
                                <form method="post" onSubmit={this.handleSubmit}>
                                <div className="box-body">
                                    <div className="form-group">
                                        <label>Question</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="question"
                                            value={this.state.question}
                                            placeholder="Enter Question"
                                            onChange={this.handleQuestion}
                                        />
                                        <small
                                            id="questionHelp"
                                            className="form-text text-muted"
                                        >
                                            Ask simple and to-the-point
                                            questions for better results
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <fieldset>
                                            <legend>Choices</legend>
                                            <small
                                                id="choicesHelp"
                                                className="form-text text-muted"
                                            >
                                                Give choices that give the most
                                                insight into your question
                                            </small>

                                            <div>
                                                <div className="form-group">
                                                    <label>Choice 1</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control"
                                                        value=""
                                                        placeholder="Enter choice 1"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="form-group">
                                                    <label>Choice 2</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control"
                                                        value=""
                                                        placeholder="Enter choice 2"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="form-group">
                                                    <label>Choice 3</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control"
                                                        value=""
                                                        placeholder="Enter choice 3"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="form-group">
                                                    <label>Choice 4</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control"
                                                        value=""
                                                        placeholder="Enter choice 4"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="form-group">
                                                    <label>Choice 5</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        className="form-control"
                                                        value=""
                                                        placeholder="Enter choice 5"
                                                    />
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                    >
                                        Add question
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

export default Add;
