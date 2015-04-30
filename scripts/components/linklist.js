var React = require('react'),
    ShortLink = require('./shortlink');

var LinkList = React.createClass({

  handleClearHistory: function() {
    this.props.onClearHistory();
  },

  render: function() {
    if (this.props.links.length > 0) {
      var links = this.props.links.map(function (link) {
        return (
          <ShortLink link={ link } key={ link.shortcode }/>
        )
      });
      return (
        <div className="list-holder">
          <h2>Previously shortened by you</h2>
          <span className="action clear" onClick={ this.handleClearHistory }>
            Clear history
          </span>
          <table>
            <tr>
              <th><p>Link</p></th>
              <th><p>Visits</p></th>
              <th><p>Last Visited</p></th>
            </tr>
            <tbody>
            { links }
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div className="list-holder">
          <h2>No links saved here yet!</h2>
        </div>
      )
    }
  }
});

module.exports = LinkList;
