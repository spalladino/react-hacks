import Actions from '../actions';
import EventEmitter from 'events';
import Reflux from 'reflux';

var EntryStore = Reflux.createStore({
  listenables: Actions,

  getInitialState: function() {
    this.state = { entries: [], page: 1, query: "" };
    this.fetchEntries();
    return this.state;
  },

  onPageChange: function(pageNum) {
    this.state.page = pageNum;
    this.fetchEntries();
  },

  onSearchEntries: function(query) {
    this.state.query = query;
    this.state.page = 1;
    this.fetchEntries();
  },

  onSearchEntriesCompleted: function(entries) {
    this.state.entries = entries;
    this.trigger(this.state);
  },

  fetchEntries: function() {
    var q = (this.state.query && this.state.query.length > 0) ? `&q=${this.state.query}` : "";
    fetch(`http://localhost:9200/poirot-*/logentry/_search?from=${(this.state.page-1)*10}&size=10${q}`, { method: 'GET' })
      .then((res) => { return res.json() })
      .then((res) => { Actions.searchEntries.completed(res.hits.hits); });
  }

});

export default EntryStore;

