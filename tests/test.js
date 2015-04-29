var expect = require('chai').expect,
    React = require('react/addons'),
    Shooooort = require('../scripts/components/shooooort'),
    LinkList = require('../scripts/components/linklist'),
    InputBar = require('../scripts/components/inputbar');

describe('Shooooort', function() {
  beforeEach(function() {
    TestUtils = React.addons.TestUtils;
    var mainComponent = <Shooooort />;
    TestUtils.renderIntoDocument(mainComponent);
  });

  afterEach(function() {
    React.unmountComponentAtNode(document.body);
    document.body.innerHTML = '';
  });

  it('main component should render', function() {
    var mainComponent = <Shooooort />;
    expect(mainComponent).to.exist;
  });

  it('LinkList should render', function() {
    var linklist = <LinkList />
    expect(linklist).to.exist;
  });

  it('InputBar should render', function() {
    var inputbar = <InputBar />
    expect(inputbar).to.exist;
  });

});
