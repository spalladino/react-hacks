import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions';
import EntryStore from '../stores/EntryStore';
import Pager from './Pager';

var EntryList = React.createClass({
  mixins: [Reflux.connect(EntryStore)],

  render: function() {
    var entries = this.state.entries.map((entry) => {
      return <Entry key={entry._id} entry={entry._source}/>
    });
    return <div className="pure-u-1-1">
      <EntrySearch className="pure-u-1-1"/>
      <div className="pure-u-1-1">
        {entries}
      </div>
      <div className="pure-u-1-1">
        <Pager currentPage={this.state.page} numPages={this.state.total / this.state.pageSize} onPageChange={Actions.pageChange} />
      </div>
    </div>;
  }
});

var EntrySearch = React.createClass({
  render: function() {
    return <div className="searchbox">
      <input type="search" onKeyDown={this.onKeyDown}/>
    </div>;
  },

  onKeyDown: function(ev) {
    if (ev.keyCode == 13) {
      Actions.searchEntries(ev.target.value);
    }
  }
});


var Entry = React.createClass({
  render: function() {
    return <div className={this.props.entry['@level'] + " entry"}>
      <div className="timestamp">{this.props.entry['@timestamp']}</div>
      <div className="message">{this.props.entry['@message']}</div>
    </div>;
  }
});

export default EntryList;

