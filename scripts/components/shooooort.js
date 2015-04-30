var React = require('react'),
  LinkList = require('./linklist'),
  InputBar = require('./inputbar');

var Shooooort = React.createClass({

  clearHistory: function() {
    this.setState({ links: [] });
  },

  getHistory: function() {
    this.setState({ links: linkDummy });
  },

  submitLink: function(url) {
    var newLinks = this.state.links;
    newLinks.unshift({
      shortcode: 'random_'+Math.floor(Math.random() * 9000),
      url: url,
      visits: Math.floor(Math.random() * 9000),
      lastVisited: new Date().toString(),
    });
    this.setState({ links: newLinks });
  },

  getInitialState: function() {
    return { links: [] };
  },

  componentDidMount: function() {
    this.getHistory();
  },

  render: function() {
    return (
      <div>
        <InputBar onSubmitLink={ this.submitLink }/>
        <LinkList links={ this.state.links } onClearHistory={ this.clearHistory }/>
      </div>
    )
  }
});

var linkDummy = [
  {
    shortcode: 'apple',
    url: 'http://macintosh.com/is/company/for/nerds',
    visits: 2341,
    lastVisited: '2012-04-23T18:25:43.511Z'
  },
  {
    shortcode: 'bannana',
    url: 'http://hammok.com/lol/roflmao/1/34',
    visits: 9001,
    lastVisited: '2013-01-14T20:34:22'
  },
  {
    shortcode: 'carrot',
    url: 'http://bugs.io/dfasd9w9/ifa9/ajodifsj',
    visits: 3,
    lastVisited: '2014-03-01T13:00:00Z'
  },
  {
    shortcode: 'long',
    url: 'http:supercalifragilisticexpialidocious/blah/blah/blah/blah/blah/blAH',
    visits: 999999,
    lastVisited: '2014-03-01T13:00:00Z'
  }
]

module.exports = Shooooort;
