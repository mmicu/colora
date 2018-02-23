const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');

const lib = require('../bin/colora');
const MyUtils = lib.MyUtils;
const Theme = lib.Theme;

// actual: dictionary
// expected: Map
function checkSelectors(actual, expected) {
}

describe('Testing utils', function() {
  it('Utils class', function() {
      // isString
    expect(MyUtils.isString('')).to.be.true;
    expect(MyUtils.isString(' ')).to.be.true;
    expect(MyUtils.isString(undefined)).to.be.false;
    expect(MyUtils.isString(null)).to.be.false;
  });
});
  
describe('Testing "Theme class"', function() {
  it('Simpe theme', function() {
    var name = 'name';
    var path = 'path';
    var t = new Theme(name, path);
    
    expect(name).to.be.equal(t.name);
    expect(path).to.be.equal(t.path);
    
    // addSelector
    t.addSelector('foo');
    t.addSelector('foo');
    expect(t.selectors.size).to.be.equal(1);
    t.addSelector('foo2');
    expect(t.selectors.size).to.be.equal(2);
    t.addSelector('foo2');
    expect(t.selectors.size).to.be.equal(2);
    t.addSelector('foo3');
    t.addSelector('foo4');
    expect(t.selectors.size).to.be.equal(4);
    
    // addProperty
    t.addSelector('foo');
    expect(t.selectors.size).to.be.equal(4);
      // add one property
    t.addProperty('prop_a', 'prop_a_value');
    expect(t.getPropertyBySelector('prop_a', 'foo')).to.be.equal('prop_a_value');
      // add the same property with a different value
    t.addProperty('prop_a', 'prop_new_value');
    expect(t.getPropertyBySelector('prop_a', 'foo')).to.be.equal('prop_new_value');
  });
  
  it('mono-blue theme', function() {
    var name = 'mono-blue';
    var path_ = path.resolve(__dirname, 'themes', name + '.css');
    expect(fs.existsSync(path_)).to.be.true;
    
    var t = new Theme(name, path_);
    
    expect(name).to.be.equal(t.name);
    expect(path_).to.be.equal(t.path);
    
    t.parseCSS(function(data) {
      expect('error' in data).to.be.true;
      expect('desc' in data).to.be.true;
      expect(data['error']).to.be.false;
      expect(data['desc']).to.be.null;
      
        // .it_does_not_exist
      var sDoesNotExist = t.getPropertiesBySelector('.it_does_not_exist');
      expect(sDoesNotExist).to.be.null;
      
        // .hljs
      {
        var a_hljsProps = t.getPropertiesBySelector('.hljs');
        var e_hljsProps = {
          'display': 'block',
          'overflow-x': 'auto',
          'padding': '0.5em',
          'background': '#eaeef3',
          'font-weight': 'bold',
          'color': '#00193a'
        };
        for (var [key, value] of a_hljsProps) {
          expect(key in e_hljsProps).to.be.true;
          expect(e_hljsProps[key]).to.equal(value);
        }
      }
      
        //
      {
        var selectors = [
          'hljs-keyword', 'hljs-selector-tag', 'hljs-title', 'hljs-section',
          'hljs-doctag', 'hljs-name', 'hljs-strong',
        ];
        var fwKey = 'font-weight';
        var fwValue = 'bold';
        it('a', function() {
          checkSelectors('a','a','s')
        });
        selectors.forEach(function(s) {
          var props = t.getPropertiesBySelector('.' + s);
          expect(props).to.not.be.null;
          expect(props).to.not.be.undefined;
          expect(props.has(fwKey)).to.be.true;
          expect(e_hljsProps[fwKey]).to.equal(fwValue);
        });
      }
    });
  });
});
