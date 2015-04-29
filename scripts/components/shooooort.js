var React = require('react'),
  LinkList = require('./linklist'),
  InputBar = require('./inputbar');

var Shooooort = React.createClass({
  render: function() {
    return (
      <div>
        <InputBar />
        <LinkList links={ linkDummy }/>
      </div>
    )
  }
});

var linkDummy = [
  {
    shortUrl: 'apple',
    visits: 2341,
    lastVisited: '2 days ago'
  },
  {
    shortUrl: 'bannana',
    visits: 9001,
    lastVisited: '1 days ago'
  },
  {
    shortUrl: 'carrot',
    visits: 3,
    lastVisited: '1 month ago'
  }
]

module.exports = Shooooort;
