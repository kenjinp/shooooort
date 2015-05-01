var React = require('react'),
    ReactZeroClipboard = require('react-zeroClipboard');

var ShortLink = React.createClass({

  timeSince: function() {
    var date = new Date(this.props.link.lastVisited)

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds";
  },

  handleCopy: function() {

    this.setState({ copied: true });
  },

  handleLeave: function() {
    this.setState({ copied: false });
  },

  message: function() {
    message = this.state.copied ? 'Copied' : 'Click to copy this link';
    return message;
  },

  getInitialState: function() {
    //is there a better way to do this besides state?
    return ({ copied: false });
  },

  newLinkFlag: function() {
    if (this.props.link.old === false) {
      return <span className="new-link-flag"></span>
    }
  },

  render: function() {
    var link = this.props.link
    var url = 'http://shooooort.com/' + link.shortcode;

    return (
      <tr>
        <ReactZeroClipboard text={ url } >
          <td className="summary" onClick={ this.handleCopy } onMouseLeave={ this.handleLeave }>
            { this.newLinkFlag() }
            <span className="short">shooooort.com/</span>
            <span className="shortcode">{ link.shortcode }</span>
            <span className="action" id="clip">{ this.message() }</span>
            <p>
              { link.url }
            </p>
          </td>
        </ReactZeroClipboard>
        <td> { link.visits } </td>
        <td className="time">{ this.timeSince() }</td>
      </tr>
    )
  }
});

module.exports = ShortLink;
