var React = require('react/addons'),
    LinkList = require('./linklist'),
    InputBar = require('./inputbar'),
    cookie = require('react-cookie'),
    apiHelper = require('../apiHelper');

var Shooooort = React.createClass({

  clearHistory: function() {
    this.setState({ links: [] });
    //a way around the problem below
    this.saveHistory([]);
  },

  getHistory: function() {
    var oldLinks = cookie.load('links');
    if (oldLinks === undefined ) {
      return;
    } else {
      for (var i = 0; i < oldLinks.length; i++) {
        //tell the client this is old data
        oldLinks[i].old = true;
      }
      this.setState({ links: oldLinks });
    }
  },

  saveHistory: function(links) {
    //I would like to use state here, but it always is
    //not the updated value from
    //submitLink(), and is missing the last link
    //so I've used links as a way around it
    cookie.save('links', links);
  },

  submitLink: function(url) {
    helper.postShorten(url, function(err, res, body) {
      console.log(err);
      console.log(res);
      console.log(body);
    })
    var newLink = [{
      shortcode: 'random_'+Math.floor(Math.random() * 9000),
      url: url,
      visits: Math.floor(Math.random() * 9000),
      lastVisited: new Date().toString(),
      old: false
    }];
    var newLinks = React.addons.update( this.state.links, {$unshift: newLink});
    //the documentation tells me this should work, but doesn't...
    this.setState({ links: newLinks }, this.saveHistory(newLinks));
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

module.exports = Shooooort;
