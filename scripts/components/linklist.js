var React = require('react'),
    ShortLink = require('./shortlink');

var LinkList = React.createClass({
  render: function() {
    var links = this.props.links.map(function (link) {
      return (
        <ShortLink link={ link } key={ link.shortcode }/>
      )
    });
    return (
      <div className="list-holder">
        <h2>Previously shortened by you</h2>
        <span className="action">Clear history</span>
        <table>
          <tr>
            <th><p>Link</p></th>
            <th><p>Visits</p></th>
            <th><p>Last Visited</p></th>
          </tr>
          { links }
        </table>
      </div>
    )
  }
});

module.exports = LinkList;
