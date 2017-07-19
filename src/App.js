import React, { Component } from 'react';
import './App.css';
import Compose from './components/Compose.jsx'
import MessageList from './components/MessageList.jsx'
import Toolbar from './components/Toolbar.jsx'
import './index.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      read: 'unread',
      messages: [
        {
          text: ['You can\'t input the protocol without calculating the mobile RSS protocol!', 'Message body'],
          read: 'unread',
          labels: ['dev', 'gschool', 'personal'],
          checked: false,
          selected: false,
          selectStar: false,
        },
        {
          text: ['Connecting the system won\'t do anything, we need to input the mobile AI panel!', 'Message body'],
          read: 'unread',
          labels: [],
          checked: false,
          selected: false,
          selectStar: false,
        },
        {
          text: ['Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!', 'Message body'],
          read: 'unread',
          labels: ['dev'],
          checked: false,
          selected: false,
          selectStar: false,
        },
        {
          text: ['We need to program the primary TCP hard drive!', 'Message body'],
          read: 'unread',
          labels: [],
          checked: false,
          selected: false,
          selectStar: false,
        },
        {
          text: ['If we override the interface, we can get to the HTTP feed through the virtual EXE interface!', 'Message body'],
          read: 'unread',
          labels: ['personal'],
          checked: false,
          selected: false,
          selectStar: false,
        },
        {
          text: ['We need to back up the wireless GB driver!', 'Message body'],
          read: 'unread',
          labels: [],
          checked: false,
          selected: false,
          selectStar: false,
        },
        {
          text: ['We need to index the mobile PCI bus!', 'Message body'],
          read: 'unread',
          labels: ['dev', 'personal'],
          checked: false,
          selected: false,
          selectStar: false,
        },
        {
          text: ['If we connect the sensor, we can get to the HDD port through the redundant IB firewall!', 'Message body'],
          read: 'unread',
          labels: ['gschool'],
          checked: false,
          selected: false,
          selectStar: false,
        }
      ],
      show: false,
      all: false,
    }
  }

  star = (i) => {
    const messages = [...this.state.messages]
    if (messages[i].selectStar) {
      messages[i].selectStar = false;
      this.setState({ messages })
    } else {
      messages[i].selectStar = true;
      this.setState({ messages })
    }
  }

  check = (i) => {
    const messages = [...this.state.messages]
    if (messages[i].checked) {
      messages[i].selected = false
      messages[i].checked = false
      this.setState({ messages })
    } else {
      messages[i].selected = 'selected'
      messages[i].checked = true
      this.setState({ messages })
    }
  }

  readChange = (i) => {
    const messages = [...this.state.messages]
    messages[i].read = 'read'
    this.setState({ messages })
  }

  newMessage = () => {
    if (this.state.show) {
      this.setState({show: false})
    } else {
      this.setState({show: true})
    }
  }

  checkAll = () => {
    const messages = [...this.state.messages]
    if (this.state.all) {
      messages.map(e => {
        e.selected = false
        e.checked = false
      })
      this.setState({ messages })
      this.setState({ all: false })
    } else {
      messages.map(e => {
        e.selected = 'selected'
        e.checked = true
      })
      this.setState({ messages })
      this.setState({ all: true })
    }
  }

  addLabel = (name) => {
    const messages = [...this.state.messages]
    messages.map(e => {
      if (!e.labels.includes(name) && e.selected) {
        e.labels.push(name)
      }
    })
    this.setState({ messages })
  }

  removeLabel = (name) => {
    const messages = [...this.state.messages]
    messages.map(e => {
      if (e.labels.includes(name) && e.selected) {
        const index = e.labels.indexOf(name)
        e.labels.splice(index, 1)
      }
    })
    this.setState({ messages })
  }

  deleteMessage = () => {
    let messages = [...this.state.messages]
    messages = messages.filter(e => !e.selected)
    this.setState({ messages })
  }
  render() {
    return (
      <main>
        <Toolbar
          newMessage={this.newMessage}
          checkAll={this.checkAll}
          messages={this.state.messages}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          deleteMessage={this.deleteMessage}
        />
        {
          this.state.show ? <Compose /> : null
        }
        <MessageList
          readChange={this.readChange}
          messages={this.state.messages}
          star={this.star}
          check={this.check}
        />
      </main>
    );
  }
}

export default App;
