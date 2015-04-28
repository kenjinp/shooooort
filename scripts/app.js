var React = require('react'),
    MyComponent = require('./components/mycomponent.js');

window.React = React;

React.render(<MyComponent />, document.getElementById('content'));
