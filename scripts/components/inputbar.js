var React = require('react');

var InputBar = React.createClass({

  handleButtonClick: function() {
    var url = this.state.inputValue;
    if (url.trim() !== '') {
      this.setState({ inputValue: '' });
      this.props.onSubmitLink(url);
    }
  },

  handleKeyPress: function(e) {
    if (e.keyCode === 13)
      this.handleButtonClick();
  },

  handleInputChange: function(e) {
    this.setState({
      inputValue: e.target.value
    });
  },

  classSwitch: function() {
    var className = this.state.inputValue !== '' ? 'active' : 'disabled';
      return className;
  },

  getInitialState: function() {
    return {
      inputValue: '',
    };
  },

  render: function() {
    return (
      <div className="input-holder">
        <input
          className={ this.classSwitch() }
          type="text"
          ref= "inputBar"
          placeholder="Paste the link you want to shorten here"
          value={ this.state.inputValue }
          onKeyDown={ this.handleKeyPress }
          onChange={ this.handleInputChange }/>
        <button
          ref="button"
          className={ this.classSwitch() }
          type="button"
          onClick={ this.handleButtonClick }>
          <span>Shorten this link</span>
        </button>
      </div>
    )
  }
});

module.exports = InputBar;
