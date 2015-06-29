import Reflux from 'reflux';
import React from 'react/addons';
import Link from 'react-router/lib/Link';

var App = React.createClass({

  render: function() {
    return <div className="pure-u-1-1">
      <h1>Poirot</h1>
      <Link to="/entries">Browse log entries</Link>
      {this.props.children}
    </div>;
  }
});

export default App;
