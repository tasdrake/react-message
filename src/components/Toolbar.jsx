import React from 'react'
import '../index.css'

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkToggle: false,
      label: 0
    }
  }

  toolLabelAdd = (e) => {
    this.props.addLabel(e.target.value);
  }

  toolLabelRemove = (e) => {
    this.props.removeLabel(e.target.value);
  }

  render() {
    const checkedNumber = this.props.messages.filter(e => e.selected).length;
    let buttonClass;
    if (checkedNumber === this.props.messages.length) {
      buttonClass = 'fa fa-check-square-o';
    } else if (checkedNumber > 0) {
      buttonClass = 'fa fa-minus-square-o';
    } else {
      buttonClass = 'fa fa-square-o';
    }
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            {this.props.messages.filter(e => !e.read).length} unread messages
          </p>

          <a className="btn btn-danger" onClick={this.props.newMessage}>
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={this.props.checkAll}>
            <i className={buttonClass}></i>
          </button>

          <button className="btn btn-default" onClick={this.props.markRead}>Mark As Read</button>

          <button className="btn btn-default" onClick={this.props.markUnread}>Mark As Unread</button>

          <select className="form-control label-select" onChange={this.toolLabelAdd} value={this.state.value} >
            <option selected disabled>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={this.toolLabelRemove} value={this.state.value}>
            <option selected disabled>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={this.props.deleteMessage}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Toolbar
