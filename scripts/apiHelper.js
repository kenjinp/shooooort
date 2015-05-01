var config = require('../config'),
    request = require('ajax-request');

helper = {
  postShorten: function(url, cb) {
    request.post({
      url: config.api + 'shorten',
      method: 'POST',
      data: { 'url': url },
      headers: { 'Content-Type': 'application/json' }
    }, function(err, res, body){
      cb(err, res, body);
    });
  },

  getStats: function(shortcode, cb) {
    request({
      url: config.api + shortcode + '/stats',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }, cb(err, res, body));
  }
}

module.exports = helper;
