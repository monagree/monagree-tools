"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catEle = exports.cMeta = void 0;
var firehelper_1 = require("./firehelper");
var cMeta = /** @class */ (function () {
    function cMeta(command, desc) {
        this.command = command;
        this.desc = desc;
    }
    return cMeta;
}());
exports.cMeta = cMeta;
var catEle = /** @class */ (function () {
    function catEle(doc) {
        this.doc = doc;
    }
    catEle.prototype.getId = function () {
        return (0, firehelper_1.getDocId)(this.doc);
    };
    catEle.prototype.getTitle = function () {
        return (0, firehelper_1.getData)(this.doc, 't');
    };
    return catEle;
}());
exports.catEle = catEle;
