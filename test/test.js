const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const util = require('util');

const lib = require('../bin/colora');
const MyUtils = lib.MyUtils;
const Theme = lib.Theme;

function checkSelectors(themeObj, selectors, expected) {
  selectors.forEach(function(selector) {
    var actual = themeObj.getPropertiesBySelector('.' + selector);
    expect(expected, util.format('Problem with selector "%s"', selector))
      .to.deep.equal(actual);
  });
}

describe('Testing utils', function() {
  it('Utils class', function() {
      // isString
    expect(MyUtils.isString()).to.be.false;
    expect(MyUtils.isString(undefined)).to.be.false;
    expect(MyUtils.isString(null)).to.be.false;
    expect(MyUtils.isString('')).to.be.true;
    expect(MyUtils.isString(' ')).to.be.true;
      // isArray
    expect(MyUtils.isArray(undefined)).to.be.false;
    expect(MyUtils.isArray(null)).to.be.false;
    expect(MyUtils.isArray()).to.be.false;
    expect(MyUtils.isArray([])).to.be.true;
    expect(MyUtils.isArray([undefined])).to.be.true;
    expect(MyUtils.isArray([null])).to.be.true;
      // isBoolean
    expect(MyUtils.isBoolean()).to.be.false;
    expect(MyUtils.isBoolean(undefined)).to.be.false;
    expect(MyUtils.isBoolean(null)).to.be.false;
    expect(MyUtils.isBoolean(true)).to.be.true;
    expect(MyUtils.isBoolean(false)).to.be.true;
      // isNull
    expect(MyUtils.isNull()).to.be.true;
    expect(MyUtils.isNull(undefined)).to.be.true;
    expect(MyUtils.isNull(null)).to.be.true;
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
    expect(t.selectorsSize).to.be.equal(1);
    t.addSelector('foo2');
    expect(t.selectorsSize).to.be.equal(2);
    t.addSelector('foo2');
    expect(t.selectorsSize).to.be.equal(2);
    t.addSelector('foo3');
    t.addSelector('foo4');
    expect(t.selectorsSize).to.be.equal(4);
    
    // addProperty
    t.addSelector('foo');
    expect(t.selectorsSize).to.be.equal(4);
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
      
      var actual, expected, selectors, attr;
      
        // .hljs
      selectors = [ 'hljs' ];
      expected = {
        'display': 'block',
        'overflow-x': 'auto',
        'padding': '0.5em',
        'background': '#eaeef3',
        'font-weight': 'bold',
        'color': '#00193a'
      };
      checkSelectors(t, selectors, expected);
      
        // .hljs-keyword, .hljs-keyword, .hljs-doctag, .hljs-strong
      selectors = [
        'hljs-keyword', 'hljs-keyword', 'hljs-doctag', 'hljs-strong'
      ];
      expected = { 'font-weight': 'bold' };
      checkSelectors(t, selectors, expected);
      
        // .hljs-title, .hljs-section, .hljs-name
      selectors = [
        'hljs-title', 'hljs-section', 'hljs-name'
      ];
      expected = {
        'font-weight': 'bold',
        'color': '#0048ab'
      };
      checkSelectors(t, selectors, expected);
      
        // .hljs-string, .hljs-built_in, .hljs-literal, .hljs-type
        // .hljs-addition, .hljs-tag, .hljs-quote, .hljs-selector-id
        // .hljs-selector-class
      selectors = [
        'hljs-string', 'hljs-built_in', 'hljs-literal', 'hljs-type',
        'hljs-addition', 'hljs-tag', 'hljs-quote', 'hljs-selector-id',
        'hljs-selector-class'
      ];
      expected = { 'color': '#0048ab' };
      checkSelectors(t, selectors, expected);
      
        // hljs-meta, hljs-subst, hljs-symbol, hljs-regexp, hljs-attribute, 
        // hljs-deletion, hljs-variable, hljs-template-variable, hljs-link,
        // hljs-bullet 
      selectors = [
        'hljs-meta', 'hljs-subst', 'hljs-symbol', 'hljs-regexp', 'hljs-attribute', 
        'hljs-deletion', 'hljs-variable', 'hljs-template-variable', 'hljs-link',
        'hljs-bullet'
      ];
      expected = { 'color': '#4c81c9' };
      checkSelectors(t, selectors, expected);
        
        // hljs-emphasis
      selectors = [ 'hljs-emphasis' ];
      expected = { 'font-style': 'italic' };
      checkSelectors(t, selectors, expected);
    });
  });
});
