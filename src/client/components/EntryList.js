require('react/addons');
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
      <span className="timestamp">{this.props.entry['@timestamp']}</span>
      {this.props.entry['@message']}
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
    var entries = this.state.entries.map((entry) => {return <Entry key={entry.id} entry={entry}/>});
    return <div className="entries">
      <EntrySearch/>
      <div>
        {entries}
      </div>
    </div>;
  }
}

export default EntryList;

