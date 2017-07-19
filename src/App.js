import React, { Component } from 'react';
import './App.css';
import Compose from './components/Compose.jsx';
import MessageList from './components/MessageList.jsx';
import Toolbar from './components/Toolbar.jsx';
import './index.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      read: 'unread',
      messages: [],
      show: false,
      all: false,
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3003');
    const messages = await response.json();
    this.setState({ messages });
  }

  star = (id) => {
    const messages = [...this.state.messages];
    if (messages[id].starred) {
      messages[id].starred = false;
    } else {
      messages[id].starred = true;
    }
    this.setState({ messages })
    fetch(`http://localhost:3003/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(messages[id]),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }

  check = (id) => {
    const messages = [...this.state.messages];
    if (messages[id].selected) {
      messages[id].selected = false;
    } else {
      messages[id].selected = true;
    }
    this.setState({ messages });
  }

  readChange = (id) => {
    const messages = [...this.state.messages];
    messages[id].read = true;
    this.setState({ messages });
    fetch(`http://localhost:3003/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(messages[id]),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }

  newMessage = () => {
    if (this.state.show) {
      this.setState({show: false});
    } else {
      this.setState({show: true});
    }
  }

  checkAll = () => {
    const messages = [...this.state.messages];
    if (this.state.all) {
      messages.map(e => {
        e.selected = false;
      });
      this.setState({ all: false });
    } else {
      messages.map(e => {
        e.selected = true;
      });
      this.setState({ all: true });
    }
    this.setState({ messages });
  }

  addLabel = (name) => {
    const messages = [...this.state.messages];
    messages.map(e => {
      if (!e.labels.includes(name) && e.selected) {
        e.labels.push(name);
        fetch(`http://localhost:3003/${e.id}`, {
          method: 'PATCH',
          body: JSON.stringify(messages[e.id]),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
      }
    });
    this.setState({ messages });
  }

  removeLabel = (name) => {
    const messages = [...this.state.messages];
    messages.map(e => {
      if (e.labels.includes(name) && e.selected) {
        const index = e.labels.indexOf(name);
        e.labels.splice(index, 1);
        fetch(`http://localhost:3003/${e.id}`, {
          method: 'PATCH',
          body: JSON.stringify(messages[e.id]),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
      }
    });
    this.setState({ messages });
  }

  deleteMessage = () => {
    let messages = [...this.state.messages];
    messages.map(e => {
      if (e.selected) {
        fetch(`http://localhost:3003/${e.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
      }
    });
    messages = messages.filter(e => !e.selected)
    this.setState({ messages });
  }

  markRead = () => {
    const messages = [...this.state.messages];
    messages.map(e => {
      if (e.selected) {
        e.read = true;
        fetch(`http://localhost:3003/${e.id}`, {
          method: 'PATCH',
          body: JSON.stringify(messages[e.id]),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
      }
    });
    this.setState({ messages });
  }

  markUnread = () => {
    const messages = [...this.state.messages];
    messages.map(e => {
      if (e.selected) {
        e.read = false
        fetch(`http://localhost:3003/${e.id}`, {
          method: 'PATCH',
          body: JSON.stringify(messages[e.id]),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
      }
    });
    this.setState({ messages });
  }

  compose = (body, subject) => {
    const messages = [...this.state.messages];
    fetch(`http://localhost:3003/`, {
      method: 'POST',
      body: JSON.stringify({body, subject}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(res => res.json())
    .then(data => {
      messages.push(data[0]);
      this.setState({ messages });
    })
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
          markRead={this.markRead}
          markUnread={this.markUnread}
        />
        {
          this.state.show ? <Compose compose={this.compose} newMessage={this.newMessage}/> : null
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
