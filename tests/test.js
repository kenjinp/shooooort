var expect = require('chai').expect,
    React = require('react/addons'),
    Shooooort = require('../scripts/components/shooooort'),
    LinkList = require('../scripts/components/linklist'),
    InputBar = require('../scripts/components/inputbar'),
    ShortLink = require('../scripts/components/shortlink');

var testGlobals = {};

describe('Shooooort', function() {
  beforeEach(function() {
    TestUtils = React.addons.TestUtils;
    testGlobals.tree = React.render(<Shooooort />, document.body);
  });

  afterEach(function() {
    testGlobals = {};
    React.unmountComponentAtNode(document.body);
    document.body.innerHTML = '';
  });

  describe('InputBar', function() {
    it('InputBar should render', function() {
      var links = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'input-holder');
      expect(links).to.have.length(1);
    });
  });


  describe('linkList', function() {

    var linkDummy = [
      {
        shortcode: 'apple',
        url: 'http://macintosh.com/is/company/for/nerds',
        visits: 2341,
        lastVisited: '2 days ago'
      },
      {
        shortcode: 'bannana',
        url: 'http://hammok.com/lol/roflmao/1/34',
        visits: 9001,
        lastVisited: '1 days ago'
      },
      {
        shortcode: 'carrot',
        url: 'http://bugs.io/dfasd9w9/ifa9/ajodifsj',
        visits: 3,
        lastVisited: '1 month ago'
      },
      {
        shortcode: 'long',
        url: 'http:supercalifragilisticexpialidocious/blah/blah/blah/blah/blah/blAH',
        visits: 999999,
        lastVisited: '7 months ago'
      }
    ]

    it('LinkList should render', function() {
      var links = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'list-holder');
      expect(links).to.have.length(1);
    });

    it('should have many shortlinks', function() {
      var links = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'summary');
      expect(links).to.have.length(linkDummy.length);
    });

    it('links should generate zero-clipboard on hover', function() {
      var links = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'summary');
      TestUtils.Simulate.click(links[0]);
      setTimeout(function() {
        var hovered = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.tree, 'zero-clipboard-is-hover');
        expect(hovered).to.have.length(1);
      });
    });

  });

});
