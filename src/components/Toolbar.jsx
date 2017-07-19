import React from 'react'
import '../index.css'

class Toolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkToggle: false,
      label: 0
    }
  }

  toolLabelAdd = (e) => {
    this.props.addLabel(e.target.value)
  }

  toolLabelRemove = (e) => {
    this.props.removeLabel(e.target.value)
  }

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            {this.props.messages.filter(e => e.read === 'unread').length} unread messages
          </p>

          <a className="btn btn-danger" onClick={this.props.newMessage}>
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={this.props.checkAll}>
            <i className="fa fa-minus-square"></i>
          </button>

          <button className="btn btn-default">Mark As Read</button>

          <button className="btn btn-default">Mark As Unread</button>

          <select className="form-control label-select" onChange={this.toolLabelAdd} value={this.state.value}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={this.toolLabelRemove} value={this.state.value}>
            <option>Remove label</option>
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
