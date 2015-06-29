import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions';
import EntryStore from '../stores/EntryStore';
import Pager from './Pager';
import InfinityScroll from './InfinityScroll';
import Link from 'react-router/lib/Link';


var EntryList = React.createClass({
  mixins: [Reflux.connect(EntryStore)],

  render: function() {
    var entries = this.state.entries.map((entry) => {
      return <Link to={`/entries/${entry._index}/${entry._id}`} key={entry._id}>
        <Entry entry={entry._source}/>
      </Link>;
    });
    return <div className="pure-u-1-1">
      <EntrySearch className="pure-u-1-1"/>
      <div className="pure-u-1-1">
        {entries}
      </div>
      <InfinityScroll onScrollToEnd={Actions.loadMoreEntries} />
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

