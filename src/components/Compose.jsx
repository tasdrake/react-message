import React from 'react';
import '../index.css';

class Compose extends React.Component {
  sendMessage = (e) => {
    e.preventDefault();
    this.props.compose(this.state.body, this.state.subject);
    this.props.newMessage();
  }

  subjectField = (e) => {
    this.setState({ subject: e.target.value});
  }

  bodyField = (e) => {
    this.setState({ body: e.target.value});
  }

  render() {
    return (
      <form className="form-horizontal well">
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" onChange={this.subjectField} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="form-control" onChange={this.bodyField}></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" className="btn btn-primary" onClick={this.sendMessage}/>
          </div>
        </div>
      </form>
    );
  }
}

export default Compose;
