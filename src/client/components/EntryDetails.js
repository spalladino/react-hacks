import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions';
import EntryStore from '../stores/EntryStore';

var EntryDetailsPage = React.createClass({

  mixins: [Reflux.connect(EntryStore)],

  componentDidMount: function () {
    var id = this.props.params.id;
    var index = this.props.params.index;
    Actions.loadEntryDetails(index, id);
  },

  render: function() {
    return <EntryDetails entry={this.state.selectedEntry} />
  }

});

var EntryDetails = React.createClass({

  render: function() {
    if (this.props.entry == null) return <h2>Loading...</h2>;

    return <div>
      <h2>{this.props.entry['@message']}</h2>
      <pre>
        {this.props.entry}
      </pre>
    </div>
  }

});

export default EntryDetailsPage;
