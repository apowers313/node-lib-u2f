var ffi = require("ffi");

module.exports = u2fLib;

function u2fLib(library, params) {
    if (typeof library !== "string") {
        return "typeError: expected 'library' argument to be string path to dynamic library";
    }
    this.libName = library;

    this.lib = ffi.Library(library, {
        'init': ["int", ["pointer"]],
    });

    var ret = this.init(params);
    if (ret !== 0) {
        throw (Error (this.libName + ": init failed with error: " + ret));
    }
}

u2fLib.prototype.init = function(params) {
    // TODO: pass params as ref-struct
    if (params === undefined) params = null;

    var ret = this.lib.init(params);
    if (ret !== 0) {
        console.log(this.libName + ": init failed with value: " + ret);
    }
    this.initDone = true;

    return ret;
};