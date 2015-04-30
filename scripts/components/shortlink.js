var React = require('react'),
    ReactZeroClipboard = require('react-zeroClipboard');

var ShortLink = React.createClass({

  timeSince: function(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  },

  handleCopy: function() {
    this.setState({ msg: 'Copied!' });
  },

  handleLeave: function() {
    this.setState({ msg: 'Click to copy this link' });
  },

  getInitialState: function() {
    return {msg: 'Click to copy this link'};
  },

  render: function() {
    var link = this.props.link
    var url = 'http://shooooort.com/' + link.shortcode;
    var timeSince = this.timeSince(new Date(link.lastVisited)) + ' ago';
    return (
      <tr>
        <ReactZeroClipboard text={ url } >
          <td className="summary" onClick={ this.handleCopy } onMouseLeave={ this.handleLeave }>
            <span className="short">shooooort.com/</span>
            <span className="shortcode">{ link.shortcode }</span>
            <span className="action" id="clip">{ this.state.msg }</span>
            <p>
              { link.url }
            </p>
          </td>
        </ReactZeroClipboard>
        <td> { link.visits } </td>
        <td className="time">{ timeSince }</td>
      </tr>
    )
  }
});

module.exports = ShortLink;
