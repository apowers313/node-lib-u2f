var U2FLib = require ("../index.js");
var assert = require ("chai").assert;


describe ("main test", function() {
    var u;
    it("does init", function() {
        // this.timeout(5000);
        u = new U2FLib("./lib/u2f-lib.dylib");
        assert.isFunction(u.init);
        assert.isTrue(u.initDone);
    });

    it("does U2Fob_create", function() {
        // this.timeout(5000);
        assert.isFunction(u.U2Fob_create);
        u.U2Fob_create();
    });

    it.skip("does U2Fob_open", function() {
        // this.timeout(5000);
        u = new U2FLib("./lib/u2f-lib.dylib");
        assert.isFunction(u.init);
        assert.isTrue(u.initDone);

        assert.isFunction(u.U2Fob_init);
        var dev = u.U2Fob_create();
        var ret = u.U2Fob_open(dev, "IOService:/AppleACPIPlatformExpert/PCI0@0/AppleACPIPCI/XHC1@14/XHC1@14000000/HS05@14200000/Yubikey NEO OTP+U2F+CCID@14200000/IOUSBHostInterface@1/IOUSBHostHIDDevice@14200000,1");
        assert.strictEqual(ret, 0);
    });

    it.skip("does U2Fob_init", function() {
        // this.timeout(5000);
        u = new U2FLib("./lib/u2f-lib.dylib");
        assert.isFunction(u.init);
        assert.isTrue(u.initDone);

        assert.isFunction(u.U2Fob_init);
        var dev = u.U2Fob_create();
        var ret = u.U2Fob_init(dev);
        assert.strictEqual(ret, 0);
    });

    it.skip("test_Idle", function() {
        // this.timeout(5000);
        u = new U2FLib("./lib/u2f-lib.dylib");
        assert.isFunction(u.init);
        assert.isTrue(u.initDone);

        assert.isFunction(u.U2Fob_init);
        var dev = u.U2Fob_create();
        var ret = u.U2Fob_open(dev, "IOService:/AppleACPIPlatformExpert/PCI0@0/AppleACPIPCI/XHC1@14/XHC1@14000000/HS05@14200000/Yubikey NEO OTP+U2F+CCID@14200000/IOUSBHostInterface@1/IOUSBHostHIDDevice@14200000,1");
        assert.strictEqual(ret, 0);

        // var buf = u.getBuf();
        var buf = new Buffer(1024);

        ret = u.U2Fob_receiveHidFrame(dev, buf, 0.3);
        assert.strictEqual(ret, -5);
    });

    it("test_Init", function() {
        // this.timeout(5000);
        u = new U2FLib("./lib/u2f-lib.dylib");
        assert.isFunction(u.init);
        assert.isTrue(u.initDone);

        assert.isFunction(u.U2Fob_init);
        var dev = u.U2Fob_create();
        var ret = u.U2Fob_open(dev, "IOService:/AppleACPIPlatformExpert/PCI0@0/AppleACPIPCI/XHC1@14/XHC1@14000000/HS05@14200000/Yubikey NEO OTP+U2F+CCID@14200000/IOUSBHostInterface@1/IOUSBHostHIDDevice@14200000,1");
        assert.strictEqual(ret, 0);

        // var buf = u.getBuf();
        var buf = new Buffer(1024);

        const TYPE_INIT = 0x80;
        const U2FHID_INIT = (TYPE_INIT | 6);
        const INIT_NONCE_SIZE = 8;

        var f = u.makeFrame(-1, U2FHID_INIT, INIT_NONCE_SIZE, null);
        console.log ("new frame:", f);

        // send
        u.U2Fob_sendHidFrame(dev, f);
        ret = u.U2Fob_receiveHidFrame(dev, buf, 1.0);
        assert.strictEqual(ret, 0);
    });
});