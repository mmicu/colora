const expect = require('chai').expect;

const isString = require('../bin/colora').isString;
const Theme = require('../bin/colora').Theme;

describe('Testing...', function() {
  it('Utils class', function() {
    // isString
    expect(isString('')).to.be.true;
    expect(isString(' ')).to.be.true;
    expect(isString(undefined)).to.be.false;
    expect(isString(null)).to.be.false;
  });
  
  it('Theme class', function() {
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
  });
});
