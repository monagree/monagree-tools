"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocId = exports.getData = exports.fireMan = exports.getACT = exports.atkey = exports.maid = void 0;
var axios_1 = __importDefault(require("axios"));
var helpers_1 = require("./helpers");
exports.maid = 'cli';
exports.atkey = exports.maid + (0, helpers_1.getDeviceToken)();
function getACT(finise) {
    axios_1.default.post('https://us-central1-monagree-apps.cloudfunctions.net/generateOAuthToken', {
        key: exports.atkey
    }).then(function (response) {
        finise(true, response.data.accessToken);
    }).catch(function (error) {
        console.error('Error calling Cloud Function:', error);
        finise(false);
    });
}
exports.getACT = getACT;
var fireMan = /** @class */ (function () {
    function fireMan() {
    }
    fireMan.prototype.prepare = function (finise) {
        var _this = this;
        getACT(function (ok, token) {
            if (ok) {
                _this.accessToken = token;
            }
            finise(ok);
        });
    };
    fireMan.prototype.setFS = function (path, pld, task) {
        var _this = this;
        if (!this.accessToken) {
            this.prepare(function (ok) {
                if (ok) {
                    _this.setFS(path, pld, task);
                }
                else {
                    task(new fsSet(false));
                }
            });
            return;
        }
        var data = {
            fields: Object.entries(pld).reduce(function (acc, _a) {
                var _b;
                var key = _a[0], value = _a[1];
                if (Array.isArray(value)) {
                    // Handle array values
                    acc[key] = {
                        arrayValue: {
                            values: value.map(function (item) {
                                var _a;
                                return _a = {},
                                    _a[Number.isInteger(item) ? 'integerValue' : 'stringValue'] = item,
                                    _a;
                            })
                        }
                    };
                }
                else {
                    // Handle non-array values
                    acc[key] = (_b = {},
                        _b[Number.isInteger(value) ? 'integerValue' : 'stringValue'] = value,
                        _b);
                }
                return acc;
            }, {})
        };
        var firestoreUrl = "https://firestore.googleapis.com/v1/projects/monagree-apps/databases/(default)/documents/".concat(path);
        var headers = {
            'Authorization': "Bearer ".concat(this.accessToken),
            'Content-Type': 'application/json',
        };
        // Make the POST request to create a document
        axios_1.default.patch(firestoreUrl, data, { headers: headers })
            .then(function (response) {
            task(new fsSet(true));
        })
            .catch(function (error) {
            console.error('Error creating document:', error.response ? error.response.data : error.message);
            task(new fsSet(false, error.message));
        });
    };
    fireMan.prototype.getFS = function (path, task) {
        var _this = this;
        if (!this.accessToken) {
            this.prepare(function (ok) {
                if (ok) {
                    _this.getFS(path, task);
                }
                else {
                    task(new fsTask(false));
                }
            });
            return;
        }
        var firestoreUrl = "https://firestore.googleapis.com/v1/projects/monagree-apps/databases/(default)/documents/".concat(path);
        var headers = {
            'Authorization': "Bearer ".concat(this.accessToken),
            'Content-Type': 'application/json',
        };
        axios_1.default.get(firestoreUrl, { headers: headers })
            .then(function (response) {
            var retrievedData = response.data;
            task(new fsTask(true, undefined, retrievedData));
        })
            .catch(function (error) {
            console.error('Error retrieving document:', error.response ? error.response.data : error.message);
            task(new fsTask(false, error.message));
        });
    };
    fireMan.prototype.getQuery = function (path, task) {
        var _this = this;
        if (!this.accessToken) {
            this.prepare(function (ok) {
                if (ok) {
                    _this.getQuery(path, task);
                }
                else {
                    task(new queryTask(false));
                }
            });
            return;
        }
        var firestoreUrl = "https://firestore.googleapis.com/v1/projects/monagree-apps/databases/(default)/documents/".concat(path);
        var headers = {
            'Authorization': "Bearer ".concat(this.accessToken),
            'Content-Type': 'application/json',
        };
        // Make the GET request to retrieve all documents in the collection
        axios_1.default.get(firestoreUrl, { headers: headers })
            .then(function (response) {
            // Process the retrieved data
            var documents = response.data.documents;
            task(new queryTask(true, undefined, documents));
        })
            .catch(function (error) {
            console.error('Error retrieving documents:', error.response ? error.response.data : error.message);
            task(new queryTask(false));
        });
    };
    return fireMan;
}());
exports.fireMan = fireMan;
function getData(doc, key) {
    if (!doc) {
        return "";
    }
    return doc.fields[key].stringValue;
}
exports.getData = getData;
function getDocId(doc) {
    var documentPath = doc.name;
    return documentPath.split('/').pop();
}
exports.getDocId = getDocId;
var fsSet = /** @class */ (function () {
    function fsSet(_success, _e) {
        this._success = _success;
        this._e = _e;
    }
    Object.defineProperty(fsSet.prototype, "getEr", {
        get: function () {
            return getErrMsg(this._e);
        },
        enumerable: false,
        configurable: true
    });
    return fsSet;
}());
var fsTask = /** @class */ (function () {
    function fsTask(_success, _e, _snapshot) {
        this._success = _success;
        this._snapshot = _snapshot;
        this._e = _e;
        this._exists = (!_success ? false : _snapshot != undefined);
    }
    fsTask.prototype.getVRes = function () {
        return getData(this._snapshot, "v");
    };
    fsTask.prototype.getEr = function () {
        return getErrMsg(this._e);
    };
    fsTask.prototype.isSuccessful = function () {
        return this._success;
    };
    fsTask.prototype.exists = function () {
        return this._exists;
    };
    fsTask.prototype.getResult = function () {
        return this._snapshot;
    };
    return fsTask;
}());
var queryTask = /** @class */ (function () {
    function queryTask(_success, _e, _snapshot) {
        this._success = _success;
        this._snapshot = _snapshot;
        this._e = _e;
        this._exists = (!_success ? false : (_snapshot.length != 0));
    }
    queryTask.prototype.getEr = function () {
        return getErrMsg(this._e);
    };
    queryTask.prototype.isSuccessful = function () {
        return this._success;
    };
    queryTask.prototype.getResult = function () {
        return this._snapshot;
    };
    return queryTask;
}());
function getEC(e) {
    if (e) {
        if (e.startsWith('[firebase_auth/network-request-failed]')) {
            return 0;
        }
        if (e.startsWith('[firebase_auth/wrong-password]')) {
            return 1;
        }
        if (e.startsWith('[firebase_auth/too-many-requests]')) {
            return 2;
        }
        if (e.startsWith('[firebase_auth/user-not-found]')) {
            return 4;
        }
    }
    return 3;
}
function getErrMsg(e) {
    if (getEC(e) === 0) {
        return 'Network Error';
    }
    else if (getEC(e) === 2) {
        return 'Too many attempts. To protect this account, we will not allow sign in for a while. Please try again later. ';
    }
    else if (getEC(e) === 1) {
        return 'Invalid Credentials';
    }
    else {
        return 'An error occurred. Please try again';
    }
}
