require('react/addons');
import React from 'react/addons';
import Room from './components/Room';
import EntryList from './components/EntryList';
import Store from './store';
import EntryStore from './stores/EntryStore';

var rootElement = document.getElementById('app');
//var rootComponent = <Room model={Store.model} store={Store}/>;
var rootComponent = <EntryList store={EntryStore}/>;

React.render(rootComponent, rootElement);

EntryStore.fetchEntries();

