import Actions from '../actions';
import EventEmitter from 'events';
import Reflux from 'reflux';

var EntryStore = Reflux.createStore({
  listenables: Actions,

  getInitialState: function() {
    this.fetchEntries();
    return { entries: [] }
  },

  onSearchEntries: function(query) {
    this.fetchEntries(query);
  },

  onSearchEntriesCompleted: function(entries) {
    this.trigger({entries: entries});
  },

  fetchEntries: function(query) {
    fetch(`http://localhost:9200/poirot-*/logentry/_search?q=${query}`, { method: 'GET' })
      .then((res) => { return res.json() })
      .then((res) => { Actions.searchEntries.completed(res.hits.hits); });
  }

});

export default EntryStore;

