var React = require('react'),
  LinkList = require('./linklist'),
  InputBar = require('./inputbar');

var Shooooort = React.createClass({
  render: function() {
    return (
      <div>
        <InputBar />
        <LinkList />
      </div>
    )
  }
});

module.exports = Shooooort;
