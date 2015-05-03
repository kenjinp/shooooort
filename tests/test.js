var expect = require('chai').expect,
    React = require('react/addons'),
    Shooooort = require('../scripts/components/shooooort'),
    LinkList = require('../scripts/components/linklist'),
    InputBar = require('../scripts/components/inputbar'),
    ShortLink = require('../scripts/components/shortlink'),
    cookie = require('react-cookie');

var testGlobals = {};

var linkDummy = [
  {
    shortcode: 'apple',
    url: 'http://macintosh.com/is/company/for/nerds',
    visits: 2341,
    lastVisited: '2012-04-23T18:25:43.511Z'
  },
  {
    shortcode: 'bannana',
    url: 'http://hammok.com/lol/roflmao/1/34',
    visits: 9001,
    lastVisited: '2013-01-14T20:34:22'
  },
  {
    shortcode: 'carrot',
    url: 'http://bugs.io/dfasd9w9/ifa9/ajodifsj',
    visits: 3,
    lastVisited: '2014-03-01T13:00:00Z'
  },
  {
    shortcode: 'long',
    url: 'http:supercalifragilisticexpialidocious/blah/blah/blah/blah/blah/blAH',
    visits: 999999,
    lastVisited: '2014-03-01T13:00:00Z'
  }
];

//holds all the tests
describe('Shooooort', function() {

  afterEach(function() {
    testGlobals = {};
    React.unmountComponentAtNode(document.body);
    document.body.innerHTML = '';
  });

  //render test for InputBar
  describe('InputBar', function() {

    beforeEach(function() {
      TestUtils = React.addons.TestUtils;
      testGlobals.tree = React.render(<InputBar />, document.body);
    });

    it('InputBar should render', function() {
      var links = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'input-holder');
      expect(links).to.have.length(1);
    });
  });

  //render test for LinkList
  describe('linkList', function() {

    beforeEach(function() {
      TestUtils = React.addons.TestUtils;
      testGlobals.tree = React.render(<LinkList links={ linkDummy }/>, document.body);
    });

    it('LinkList should render', function() {
      var links = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'list-holder');
      expect(links).to.have.length(1);
    });

    it('should have many shortlinks', function() {
      var links = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'summary');
      expect(links).to.have.length(linkDummy.length);
    });
  });

////////////////////////
//  BEHAVIOR TESTS!!! //
////////////////////////

  describe('clicking on shortlink should copy link address to clipboard', function() {
    it('links should generate zero-clipboard object on hover', function() {
      TestUtils = React.addons.TestUtils;
      testGlobals.tree = React.render(<LinkList links={ linkDummy }/>, document.body);
      var links = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'summary');
      TestUtils.Simulate.click(links[0]);
      setTimeout(function() {
        var hovered = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'zero-clipboard-is-hover');
        expect(hovered).to.have.length(1);
      });
    });
  });

  describe('clear history', function() {

    beforeEach(function() {
      TestUtils = React.addons.TestUtils;
      testGlobals.tree = React.render(<Shooooort />, document.body);
    });

    it('should remove the shortlinks', function() {
      var input = TestUtils.findRenderedDOMComponentWithTag(testGlobals.tree, 'input');
      var submitButton = TestUtils.findRenderedDOMComponentWithTag(testGlobals.tree, 'button');
      var beforeLinks = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'summary');
      TestUtils.Simulate.change(input, {target: { value: 'blahblah'} });
      TestUtils.Simulate.click(submitButton);
      setTimeout(function() {
        var button = TestUtils.findRenderedDOMComponentWithClass(testGlobals.tree, 'action');
        TestUtils.Simulate.click(button);
        var afterLinks = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'summary');
        expect(afterLinks).to.have.legth(1);
      });
    });

    it('should delete the cookies of history', function() {
      var input = TestUtils.findRenderedDOMComponentWithTag(testGlobals.tree, 'input');
      var submitButton = TestUtils.findRenderedDOMComponentWithTag(testGlobals.tree, 'button');
      var beforeLinks = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'summary');
      TestUtils.Simulate.change(input, {target: { value: 'blahblah'} });
      TestUtils.Simulate.click(submitButton);
      setTimeout(function() {
        var button = TestUtils.findRenderedDOMComponentWithClass(testGlobals.tree, 'action');
        TestUtils.Simulate.click(button);
        expect(cookie.load('links')).to.have.length(0);
      });
    });
  });



  describe('submit a new link', function() {

    beforeEach(function() {
      TestUtils = React.addons.TestUtils;
      testGlobals.tree = React.render(<Shooooort />, document.body);
    });

    it('should add a link when blahblah is submitted by button', function() {
      var input = TestUtils.findRenderedDOMComponentWithTag(testGlobals.tree, 'input');
      var button = TestUtils.findRenderedDOMComponentWithTag(testGlobals.tree, 'button');
      var beforeLinks = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'summary');
      TestUtils.Simulate.change(input, {target: { value: 'blahblah'} });
      TestUtils.Simulate.click(button);
      setTimeout(function() {
        var afterLinks = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'summary');
        expect(afterLinks - beforeLinks).to.be(1);
      });
    });

    it('should add a link when blahblah is submitted by pressing enter', function() {
      var input = TestUtils.findRenderedDOMComponentWithTag(testGlobals.tree, 'input');
      var button = TestUtils.findRenderedDOMComponentWithTag(testGlobals.tree, 'button');
      var beforeLinks = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'summary');
      TestUtils.Simulate.change(input, {target: { value: 'blahblah'} });
      TestUtils.Simulate.keyDown(input, {key: 'Enter'});
      setTimeout(function() {
        var afterLinks = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'summary');
        expect(afterLinks - beforeLinks).to.be(1);
      });
    });

    it('should have correct date format when something is submitted', function() {
      var input = TestUtils.findRenderedDOMComponentWithTag(testGlobals.tree, 'input');
      var button = TestUtils.findRenderedDOMComponentWithTag(testGlobals.tree, 'button');
      var beforeLinks = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'summary');
      TestUtils.Simulate.change(input, {target: { value: 'blahblah'} });
      TestUtils.Simulate.keyDown(input, {key: 'Enter'});
      setTimeout(function() {
        var time = TestUtils.srcyRenderedDOMComponentWithClass(testGlobals.tree, 'time');
        var value = time[0].value;
        expect(value).to.be('0 seconds ago');
      });
    });

    it('should not submit after nothing is submitted', function() {
      var input = TestUtils.findRenderedDOMComponentWithTag(testGlobals.tree, 'input');
      var button = TestUtils.findRenderedDOMComponentWithTag(testGlobals.tree, 'button');
      var beforeLinks = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'summary');
      TestUtils.Simulate.change(input, {target: { value: ''} });
      TestUtils.Simulate.keyDown(input, {key: 'Enter'});
      setTimeout(function() {
        var afterLinks = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'summary');
        expect(afterLinks - beforeLinks).to.be(0);
      });
    });

    it('should save the new history in cookies', function() {
      var input = TestUtils.findRenderedDOMComponentWithTag(testGlobals.tree, 'input');
      var button = TestUtils.findRenderedDOMComponentWithTag(testGlobals.tree, 'button');
      var beforeLinks = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'summary');
      TestUtils.Simulate.change(input, {target: { value: 'blahblah'} });
      TestUtils.Simulate.click(button);
      setTimeout(function() {
        expect(cookie.load('links')).to.have.length(1);
      });
    });
  });

});
