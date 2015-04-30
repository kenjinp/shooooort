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
    shortcode: 'apple',
    url: 'http://macintosh.com/is/company/for/nerds',
    visits: 2341,
    lastVisited: '2 days ago'
  },
  {
    shortcode: 'bannana',
    url: 'http://hammok.com/lol/roflmao/1/34',
    visits: 9001,
    lastVisited: '1 days ago'
  },
  {
    shortcode: 'carrot',
    url: 'http://bugs.io/dfasd9w9/ifa9/ajodifsj',
    visits: 3,
    lastVisited: '1 month ago'
  },
  {
    shortcode: 'long',
    url: 'http:supercalifragilisticexpialidocious/blah/blah/blah/blah/blah/blAH',
    visits: 999999,
    lastVisited: '7 months ago'
  }
]

module.exports = Shooooort;
