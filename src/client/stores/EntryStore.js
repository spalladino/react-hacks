import Actions from '../actions';
import EventEmitter from 'events';
import Reflux from 'reflux';

var EntryStore = Reflux.createStore({
  listenables: Actions,

  getInitialState: function() {
    this.state = { entries: [], page: 1, query: "", pageSize: 20, total: 0 };
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
    this.fetchEntries(Actions.searchEntries);
  },

  onSearchEntriesCompleted: function(hits) {
    this.state.entries = hits.hits;
    this.state.total = hits.total;
    this.trigger(this.state);
  },

  fetchEntries: function(action) {
    action = action || Actions.searchEntries;
    var q = (this.state.query && this.state.query.length > 0) ? `&q=${this.state.query}` : "";
    fetch(`http://localhost:9200/poirot-*/logentry/_search?from=${(this.state.page-1)*10}&size=${this.state.pageSize}${q}`, { method: 'GET' })
      .then((res) => { return res.json() })
      .then((res) => { action.completed(res.hits); });
  }

});

export default EntryStore;

