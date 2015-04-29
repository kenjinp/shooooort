var React = require('react');

var InputBar = React.createClass({
  render: function() {
    return (
      <div className="input-holder">
        <input
          className="input-bar"
          type="text"
          placeholder="Paste the link you want to shorten here"/>
        <button>Shorten this link</button>
      </div>
    )
  }
});

module.exports = InputBar;
