import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'

import { withTracker } from 'meteor/react-meteor-data';

// todo what is best way ?
import "../../node_modules/materialize-css/dist/css/materialize.min.css"

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';
import HeaderBar from './HeaderBar.js';
import PriceDiffPage from './pages/PriceDiffPage'

// App component - represents the whole app
class App extends Component  {

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Tasks.insert({
            text,
            createdAt: new Date(), // current time
        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    render() {
        return (
            <Router>
                <div>
                    <HeaderBar />
                    <PriceDiffPage />
                </div>
            </Router>
        );
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(App);