var React = require('react'),
    MyComponent = require('./components/mycomponent.js');

window.React = React;

React.render(<MyComponent hello="Hello World!"/>, document.getElementById('content'));
