import Reflux from 'reflux';

var Actions = {};
Actions.searchEntries = Reflux.createAction({asyncResult: true});
Actions.loadMoreEntries = Reflux.createAction({asyncResult: true});
Actions.loadEntryDetails = Reflux.createAction({asyncResult: true});
Actions.pageChange = Reflux.createAction();

export default Actions;

