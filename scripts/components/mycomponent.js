var React = require('react');

var Mycomponent = React.createClass({
  render: function() {
    return (
      <div>
        <h1 className="Mycomponent">{this.props.hello}</h1>
      </div>
    )
  }
});

module.exports = Mycomponent;
