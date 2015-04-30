var React = require('react'),
    ReactZeroClipboard = require('react-zeroClipboard');

var ShortLink = React.createClass({
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
    var url = 'http://shooooort.com/' + this.props.link.shortcode;
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
        <td> { link.lastVisited } </td>
      </tr>
    )
  }
});

module.exports = ShortLink;
