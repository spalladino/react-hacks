import React from 'react/addons';
import Actions from '../actions';
import dispatcher from '../dispatcher';

class EntrySearch extends React.Component {
  render() {
    return <div className="searchbox">
      <input type="search" onKeyDown={this.onKeyDown.bind(this)}/>
    </div>;
  }

  onKeyDown(ev) {
    if (ev.keyCode == 13) {
      dispatcher.dispatch(Actions.searchEntries(ev.target.value));
    }
  }
}

class Entry extends React.Component {
  render() {
    return <div className={this.props.entry['@level'] + " entry"}>
      <div className="timestamp">{this.props.entry['@timestamp']}</div>
      <div className="message">{this.props.entry['@message']}</div>
    </div>;
  }
}

class EntryList extends React.Component {
  constructor(props) {
    super(props);
    props.store.on('change', () => {
      this.setState({ entries: props.store.getEntries() });
    });
    this.state = { entries: [] };
  }

  render() {
    var entries = this.state.entries.map((entry) => {
      return <Entry key={entry._id} entry={entry._source}/>
    });
    return <div>
      <EntrySearch className="pure-u-1-1"/>
      <div className="pure-u-1-1">
        {entries}
      </div>
    </div>;
  }
}

export default EntryList;

