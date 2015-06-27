require('react/addons');
import React from 'react/addons';
import EntryList from './components/EntryList';
import EntryStore from './stores/EntryStore';

var rootElement = document.getElementById('app');
var rootComponent = <EntryList store={EntryStore}/>;

React.render(rootComponent, rootElement);
