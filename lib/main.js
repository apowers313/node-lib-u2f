var ffi = require("ffi");
var ref = require("ref");

module.exports = u2fLib;

function u2fLib(library, params) {
    if (typeof library !== "string") {
        return "typeError: expected 'library' argument to be string path to dynamic library";
    }
    this.libName = library;

    this.lib = ffi.Library(library, {
        // XXX: C++ mangled names, not sure if this is platform / compiler specific
        '_Z10U2Fob_initP5U2Fob': ["int", ["pointer"]],
        '_Z12U2Fob_createv': ["pointer", []],
        '_Z10U2Fob_openP5U2FobPKc': ["int", ["pointer", "string"]],
        '_Z9makeFramejhmPKv': ["pointer", ["int32", "uint8", "uint32", ref.refType("string")]],
        '_Z18U2Fob_sendHidFrameP5U2FobP12U2FHID_FRAME': ["int", ["pointer", ref.refType("string")]],
        '_Z21U2Fob_receiveHidFrameP5U2FobP12U2FHID_FRAMEf': ["int", ["pointer", ref.refType("string"), "float"]],
    });
    this.U2Fob_init = this.lib._Z10U2Fob_initP5U2Fob;
    this.U2Fob_create = this.lib._Z12U2Fob_createv;
    this.U2Fob_open = this.lib._Z10U2Fob_openP5U2FobPKc;
    this.U2Fob_sendHidFrame = this.lib._Z18U2Fob_sendHidFrameP5U2FobP12U2FHID_FRAME;
    this.U2Fob_receiveHidFrame = this.lib._Z21U2Fob_receiveHidFrameP5U2FobP12U2FHID_FRAMEf;
    this.makeFrame = this.lib._Z9makeFramejhmPKv;

    var ret = this.init(params);
    if (ret !== 0) {
        throw (Error (this.libName + ": init failed with error: " + ret));
    }
}

u2fLib.prototype.init = function(params) {
    // TODO: pass params as ref-struct
    if (params === undefined) params = null;

    // var ret = this.lib.init(params);
    // if (ret !== 0) {
    //     console.log(this.libName + ": init failed with value: " + ret);
    // }
    this.initDone = true;

    return 0;
};
