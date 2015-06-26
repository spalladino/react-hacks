require('react/addons');
import React from 'react/addons';
import Room from './components/Room';
import Store from './store';

var rootElement = document.getElementById('app');
var rootComponent = <Room model={Store.model} store={Store}/>;

React.render(rootComponent, rootElement);

