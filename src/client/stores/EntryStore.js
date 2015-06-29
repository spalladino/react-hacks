import Actions from '../actions';
import EventEmitter from 'events';
import Reflux from 'reflux';

var EntryStore = Reflux.createStore({
  listenables: Actions,
  pageSize: 20,

  getInitialState: function() {
    this.state = { entries: [], page: 1, query: "", total: 0, selectedEntry: null };
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

  onLoadMoreEntries: function() {
    if (this.state.loading) return;
    if (this.state.page * this.pageSize >= this.state.total) return;
    this.state.loadingMoreEntries = true;
    this.state.page += 1;
    this.fetchEntries(Actions.loadMoreEntries);
  },

  onLoadMoreEntriesCompleted: function(hits) {
    this.state.entries = this.state.entries.concat(hits.hits);
    this.state.total = hits.total;
    this.state.loadingMoreEntries = false;
    this.trigger(this.state);
  },

  onLoadEntryDetails: function(index, id) {
    fetch(`http://localhost:9200/${index}/logentry/${id}`, { method: 'GET' })
      .then((res) => { return res.json() })
      .then((res) => { Actions.loadEntryDetails.completed(res._source); });
  },

  onLoadEntryDetailsCompleted: function(entry) {
    this.state.selectedEntry = entry;
    this.trigger(this.state);
  },

  fetchEntries: function(action) {
    action = action || Actions.searchEntries;
    var q = (this.state.query && this.state.query.length > 0) ? `&q=${this.state.query}` : "";
    fetch(`http://localhost:9200/poirot-*/logentry/_search?from=${(this.state.page-1)*(this.pageSize)}&size=${this.pageSize}${q}`, { method: 'GET' })
      .then((res) => { return res.json() })
      .then((res) => { action.completed(res.hits); });
  }

});

export default EntryStore;

