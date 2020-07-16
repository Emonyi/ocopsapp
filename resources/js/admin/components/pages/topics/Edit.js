import React from 'react';
import Breadcrumb from '../../partials/Breadcrumb';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SuccessAlert from '../../partials/SuccessAlert';
import ErrorAlert from '../../partials/ErrorAlert';
import Axios from 'axios';
// import SuccessAlert from '../../partials/SuccessAlert';
// import ErrorAlert from '../../partials/ErrorAlert';
 
class Edit extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            title: {},
            description:{},
            alert_message:''
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(e)
    {
        this.setState({title:e.target.value});
    }

    handleDescription(e) {
        this.setState({description:e.target.value});
    }

    resetForm() {
        this.setState({title:'',description:''})
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/topics/edit/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                title:response.data.title,
                description:response.data.description
            });
        });
    }

    // async componentDidMount() {
    //     const id = this.props.match.params.id
    //     const { data } = await Axios.get(`http://127.0.0.1:8000/api/topics/edit/${id}`)
    //     this.setState({
    //         title: data,
    //         description: data
    //     });
    // }

    handleSubmit(e) {
        e.preventDefault();

        const topics = {
            title: this.state.title,
            description: this.state.description
        }

        axios.put('http://127.0.0.1:8000/api/topics/update/'+this.props.match.params.id,topics)
        .then(res=>{
            // console.log(res.data);
            this.setState({alert_message:'success'})
        }).catch(error=>{
            this.setState({alert_message:'error'});
        });

        // this.setState({title:'', description:''})
    }

    render()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Edit Topics
                    </h1>
                    <Breadcrumb />
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-warning">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Edit Topic <i class="fa fa-question-circle"></i></h3>&emsp;
                                    <Link to="/topics" className="btn btn-warning btn-sm"><i className="fa fa-arrow-left"></i> Back to list</Link>
                                </div>
                                {this.state.alert_message=="success"?<SuccessAlert message={"Topic updated successfully"} />:null }
                                {this.state.alert_message=="error"?<ErrorAlert message={"Error occured! Try again."} />:null }
                                <form role="form" method="post" onSubmit={this.handleSubmit}>
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label>Topic Title</label>
                                            <input 
                                                type="text"
                                                className="form-control"
                                                name="title"
                                                value={this.state.title}
                                                placeholder="Topic title"
                                                onChange={this.handleTitleChange}
                                            />

                                        </div>
                                        
                                        <div className="form-group">
                                            <label>Topic Description</label>
                                            <textarea 
                                                className="form-control" 
                                                name="description"
                                                rows="5" 
                                                value={this.state.description} 
                                                onChange={this.handleDescription} 
                                             />
                                        </div>
                                    </div>
                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-success">Update</button>
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