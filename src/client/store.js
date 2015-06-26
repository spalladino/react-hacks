import dispatcher from './dispatcher';
import EventEmitter from 'events';

var Model = {
  active: 'OFF'
};

class StoreClass extends EventEmitter {
  constructor() {
    super();
    this.model = Model;
    this.rootComponent = null;
  }

  getModel() {
    return this.model;
  }

  setActive(newvalue) {
    this.model.active = newvalue;
    this.emit('change');
  }
};

var Store = new StoreClass;

var StoreDispatchId = dispatcher.register(function(action) {
  if (action.actionType === 'set_active') {
    Store.setActive(action.value);
  }
});

export default Store;

