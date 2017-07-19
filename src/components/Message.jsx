import React from 'react'
import '../index.css'

class Message extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMessage: false
    }

  }
  messageCheck = () => {
    this.props.check(this.props.index)
  }
  messageRead = () => {
    this.props.readChange(this.props.index)
    if (this.state.showMessage) {
      this.setState({ showMessage: false })
    } else {
      this.setState({ showMessage: true })
    }
  }
  messageStar = () => {
    this.props.star(this.props.index)
  }

  render() {
    const messageClass = `row message ${this.props.read} ${this.props.selected}`
    return (
      <div className="wholeMessage">
        <div className={messageClass}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input checked={this.props.checked} type="checkbox" onClick={this.messageCheck}/>
              </div>
              <div className="col-xs-2">
                {
                  <i className = {
                    this.props.selectStar
                      ? 'star fa fa-star'
                      : 'star fa fa-star-o'
                  }
                  onClick = {
                    this.messageStar
                  }></i>
                }
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            {
              this.props.labels.map((e, i) => <span className="label label-warning" key={i}>{e}</span>)
            }
            <a onClick={this.messageRead}>
              {this.props.content[0]}
            </a>
          </div>
        </div>
        {
          this.state.showMessage
            ?
            <div className="row message-body">
              <div className="col-xs-11 col-xs-offset-1">
                {this.props.content[1]} {this.props.index}
              </div>
            </div>
            :
            null
        }
      </div>
    )
  }
}

export default Message
