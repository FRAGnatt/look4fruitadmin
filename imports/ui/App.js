import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { withTracker } from 'meteor/react-meteor-data';

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


    getTasks() {
        return [
            { _id: 1, text: 'This is task 1' },
            { _id: 2, text: 'This is task 2' },
            { _id: 3, text: 'This is task 3' },
        ];
    }

    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    render() {
        return (
            <div>
                <HeaderBar />
                <PriceDiffPage />
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
})(App);