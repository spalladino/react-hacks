import dispatcher from '../dispatcher';
import EventEmitter from 'events';

class EntryStoreClass extends EventEmitter {
  constructor(dispatcher) {
    super();
    this.entries = [];

    dispatcher.register((action) => {
      if (action.actionType === 'search_entries') {
        this.fetchEntries(action.query);
      };
    });
  }

  getEntries() {
    return this.entries;
  }

  fetchEntries(query) {
    fetch(`http://localhost:9200/poirot-*/logentry/_search?q=${query}`, { method: 'GET' })
      .then((res) => { return res.json() })
      .then((res) => {
        this.entries = res.hits.hits.map((entry) => { return entry._source });
        this.emit('change');
      });
  }
};

var EntryStore = new EntryStoreClass(dispatcher);

export default EntryStore;

