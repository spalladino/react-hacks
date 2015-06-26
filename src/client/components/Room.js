require('react/addons');
import React from 'react/addons';
import Actions from '../actions';
import dispatcher from '../dispatcher';
import Store from '../store';

class Switch extends React.Component {
  onClick() {
    var label = this.props.label;
    console.log(`Clickeaste! ${label}`);
    dispatcher.dispatch(Actions.setActive(label));
  }

  render() {
    return <button onClick={this.onClick.bind(this)}>{this.props.label}</button>;
  }
}

class Light extends React.Component {
  render() {
    return <div>{this.props.active}</div>;
  }
}

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.model;
    Store.on('change', () => {
      this.setState(Store.getModel());
    });
  }

  render() {
    return <div>
      <h1>Hello Room</h1>
      <Light active={this.state.active}/>
      <Switch label="ON"/>
      <Switch label="OFF"/>
    </div>;
  }
}

export default Room;
