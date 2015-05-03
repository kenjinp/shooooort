var React = require('react/addons'),
    LinkList = require('./linklist'),
    InputBar = require('./inputbar'),
    cookie = require('react-cookie'),
    config = require('../../config'),
    request = require('ajax-request');
    Q = require('q');

var Shooooort = React.createClass({

  getShortcode: function(url) {
    var deferred = Q.defer(),
        postUrl = config.api + 'shorten';
    request.post({
      url: postUrl,
      method: 'POST',
      data: { 'url': url },
      headers: { 'Content-Type': 'application/json' },
      json: true
    }, function(err, res, data) {
      if(err) deferred.reject(console.log(err));
      deferred.resolve(data.shortcode);
    });
    return deferred.promise;
  },

  getStats: function(shortcode, url) {
    var deferred = Q.defer();
    request({
      url: config.api + shortcode + '/stats',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      json: true
    }, function(err, res, data) {
      if(err) deferred.reject(console.log(err));
      var linkInfo = {
        url: url,
        shortcode: shortcode,
        visits: data.redirectCount,
        lastVisited: data.lastSeenDate,
      };
      deferred.resolve(linkInfo);
    });
    return deferred.promise;
  },

  clearHistory: function() {
    this.setState({ links: [] });
    //a way around the problem below
    this.saveHistory([]);
  },

  getHistory: function() {
    var oldLinks = cookie.load('links');
    if (oldLinks === undefined ) return;
    for (var i = 0; i < oldLinks.length; i++) {
      var shortcode = oldLinks[i].shortcode;
      var url = oldLinks[i].url;
      var self = this;
      this.getStats(shortcode, url)
        .then(function(linkInfo) {
          return self.buildLinks([{
            shortcode: linkInfo.shortcode,
            url: linkInfo.url,
            visits: linkInfo.visits,
            lastVisited: linkInfo.lastVisited,
            old: true
          }], false);
        }).done();
    }
  },

  saveHistory: function(links) {
    //I would like to use state here, but it always is
    //not the updated value from
    //submitLink(), and is missing the last link
    //so I've used links as a way around it
    cookie.save('links', links);
  },

  buildLinks: function(newLink, save) {
    var newLinks = React.addons.update( this.state.links, {$unshift: newLink});
    //the documentation tells me this should work, but doesn't...
    if (save) {
      this.setState({ links: newLinks }, this.saveHistory(newLinks));
    } else {
      this.setState({ links: newLinks });
    }

  },

  submitLink: function(url) {
    var self = this;
    this.getShortcode(url)
      .then(function(shortcode) {
        return self.getStats(shortcode, url);
      })
      .then(function(linkInfo) {
        var newLink = [{
          shortcode: linkInfo.shortcode,
          url: linkInfo.url,
          visits: linkInfo.visits,
          lastVisited: linkInfo.lastVisited,
          old: false
        }];
        self.buildLinks(newLink, true);
      });
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
