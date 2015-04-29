
//var TestUtils = require('react-test-utils');
var expect = require('chai').expect;

//var ReactTestUtils = addons.ReactTestUtils;

describe('tests', function() {
  it('test something', function() {
    var React = require('react/addons');
    var myComponent = require('../scripts/components/mycomponent.js');
    var TestUtils = React.addons.TestUtils;

    var hello = <myComponent hello="testing"/>;
    TestUtils.renderIntoDocument(hello);
    expect(hello.props.hello).to.equal('testing');
  });
});
