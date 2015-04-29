var React = require('react');

var LinkList = React.createClass({
  render: function() {
    var links = this.props.links.map(function (link) {
      return (
        <tr>
          <td> { link.shortUrl } </td>
          <td> { link.visits } </td>
          <td> { link.lastVisited } </td>
        </tr>
      )
    });
    return (
      <div className="list-holder">
        <h2>Previously shortened by you</h2>
        <span className="clear">Clear history</span>
        <table>
          <tr>
            <th>Link</th>
            <th>Visits</th>
            <th>Last Visited</th>
          </tr>
          { links }
        </table>
      </div>
    )
  }
});

module.exports = LinkList;
