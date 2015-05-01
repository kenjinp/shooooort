var React = require('react'),
    ShortLink = require('./shortlink');

var LinkList = React.createClass({

  handleClearHistory: function() {
    this.props.onClearHistory();
  },

  hasLinks: function() {
    return !!this.props.links.length;
  },

  classSwitch: function() {
    var className = this.hasLinks() ? 'action clear' : 'hidden'
    return className;
  },

  links: function() {
    return this.props.links.map(function (link) {
      return <ShortLink link={ link } key={ link.shortcode }/>
    });
  },

  titleLabel: function() {
    if(this.hasLinks()) {
      return "Previously shortened by you";
    } else {
      return "No links saved here yet!";
    }
  },

  title: function() {
    return (
      <div className="list-title">
        <h2>{ this.titleLabel() }</h2>
        <span className={ this.classSwitch() } onClick={ this.handleClearHistory }>
          Clear history
        </span>
      </div>
    )
  },

  list: function() {
    if (!this.hasLinks()) return;

    return (
      <div className="list-content">
        <table>
          <tr>
            <th><p>Link</p></th>
            <th><p>Visits</p></th>
            <th><p>Last Visited</p></th>
          </tr>
          <tbody>
          { this.links() }
          </tbody>
        </table>
      </div>
    )
  },

  render: function() {
    return (
      <div className="list-holder">
        { this.title() }
        { this.list() }
      </div>
    )
  }
});

module.exports = LinkList;
