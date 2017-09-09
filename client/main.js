import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Router } from 'react-router';

import App from '../imports/ui/app';
const history = createHistory();

Meteor.startup(() => {
  render(
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById('market-cube-target'));
});