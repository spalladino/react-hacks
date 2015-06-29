import React from 'react/addons';
import { Router, Route } from 'react-router';
import History from 'react-router/lib/HashHistory';

import App from './components/App'
import EntryList from './components/EntryList'
import EntryDetailsPage from './components/EntryDetails'

var routes = <Router history={History}>
  <Route path="/" component={App} >
    <Route path="entries" component={EntryList} />
    <Route path="entries/:index/:id" component={EntryDetailsPage}/>
  </Route>
</Router>;

export default routes;
