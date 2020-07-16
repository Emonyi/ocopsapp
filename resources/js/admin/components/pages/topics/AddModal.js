import React from 'react';
import axios from 'axios';
import SuccessAlert from '../../partials/SuccessAlert';
import ErrorAlert from '../../partials/ErrorAlert';
 
class AddModal extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            title:'',
            description:'',
            alert_message:''
        }
 
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
 
    handleTitleChange(e) {
        this.setState({title:e.target.value})
    }

    handleDescriptionChange(e) {
        this.setState({description:e.target.value});
    }
 
    handleSubmit(e) {
        e.preventDefault();
       
        const topics = {
            title:this.state.title,
            description:this.state.description
        }
            axios.post('http://127.0.0.1:8000/api/topics/store',topics)
            .then(res=>{
                this.setState({alert_message:"success"});
            }).catch(error=>{
                this.setState({alert_message:"error"});
            })

            this.setState({title:'', description:''})
        
    }
 
    render()
    {
        return (
            <div className={`modal fade` + (this.props.show_modal==true?' in':'')} style={{display: (this.props.show_modal==true?'block':'none')}} id="modal-default">
                <div className="modal-dialog">
                    <form role="form" method="post" onSubmit={this.handleSubmit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" aria-label="Close" onClick={this.props.close_modal}>
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Add new topic</h4>
                            </div>
                            {this.state.alert_message=="success"?<SuccessAlert message={"Category added successfully"} />:null }
                            {this.state.alert_message=="error"?<ErrorAlert message={"Oops! Error occured? Try again."} />:null }
                            <div className="modal-body">
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
                                                onChange={this.handleDescriptionChange} 
                                             />
                                        </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" onClick={this.props.close_modal}>Close</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
 
export default AddModal;