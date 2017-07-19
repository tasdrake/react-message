import React from 'react'
import Message from './Message.jsx'
import '../index.css'

class MessageList extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.messages.map((e, i) => {
            return <Message
                readChange={this.props.readChange}
                star={this.props.star}
                check={this.props.check}
                read={e.read}
                content={e.text}
                checked={e.checked}
                selected={e.selected}
                labels={e.labels}
                key={i}
                index={i}
                selectStar={e.selectStar}
              />
          })
        }
      </div>
    )
  }
}

export default MessageList
