import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});

// FlowRouter.route('/', {
//   name: 'Home',
//   action(params, queryParams) {
//     FlowRouter.go('foodrobot_table');
//   }
// });
//
// FlowRouter.route('/client/foodrobot/', {
//   name: 'foodrobot_table',
//   action(params, queryParams) {
//     console.log("Looking at a foodrobot?");
//   }
// });
//
// FlowRouter.route('/client/perekrestok/', {
//   name: 'perekrestok_table',
//   action(params, queryParams) {
//     console.log("Looking at a perekrestok?");
//   }
// });

