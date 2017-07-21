var U2FLib = require ("../index.js");
var assert = require ("chai").assert;


describe ("main test", function() {
    it("does init", function() {
        // this.timeout(5000);
        var u = new U2FLib("./lib/u2f-lib.dylib");
        assert.isFunction(u.init);
        assert(u.initDone);
    });
});