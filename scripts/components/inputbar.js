var React = require('react');

var InputBar = React.createClass({

  handleButtonClick: function() {
    var url = React.findDOMNode(this.refs.inputBar).value;
    if (url !== '' && url !== ' ') {
      this.setState({
          button: 'disabled',
          input: 'input-bar'
      });
      React.findDOMNode(this.refs.inputBar).value = '';
      this.props.onSubmitLink(url);
    }
  },

  handleKeyPress: function(e) {
    if (e.keyCode === 13) {
      console.log('key');
      this.handleButtonClick();
    }
  },

  handleChange: function() {
    this.setState({
      button: 'active',
      input: 'input-bar has-input'
    });
  },

  getInitialState: function() {
    return {
      button: 'disabled',
      input: 'input-bar'
    };
  },

  render: function() {
    return (
      <div className="input-holder">
        <input
          className={ this.state.input }
          type="text"
          ref= "inputBar"
          placeholder="Paste the link you want to shorten here"
          onInput={ this.handleChange }
          onKeyDown={ this.handleKeyPress }/>
        <button
          ref="button"
          className={ this.state.button }
          type="button"
          onClick={ this.handleButtonClick }>
          <span>Shorten this link</span>
        </button>
      </div>
    )
  }
});

module.exports = InputBar;
