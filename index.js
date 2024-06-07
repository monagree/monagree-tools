#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printErr = exports.printOk = exports.printCyan = exports.printNorm = void 0;
var commander_1 = require("commander");
var kleur_1 = __importDefault(require("kleur"));
var classes_1 = require("./classes");
var helpers_1 = require("./helpers");
var firehelper_1 = require("./firehelper");
var webpack_1 = __importDefault(require("webpack"));
function intro(opts) {
    if (opts && opts.version) {
        printCyan('Monagree CLI version 1.0.9, Last updated 06-12-23');
        return;
    }
    console.log(rainbowText('Welcome to the Monagree Developer CLI tool. Use the following commands for your awesome design (call all commands, except create, from your project root folder)'));
    for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
        var com = commands_1[_i];
        console.log(kleur_1.default.cyan("monagree ".concat(com.command, " ")) + kleur_1.default.gray(com.desc));
    }
}
var commands = [
    new classes_1.cMeta('create', 'Create a new design'),
    new classes_1.cMeta('login', 'Login with your Monagree dev profile'),
    new classes_1.cMeta('logout', 'Sign out of the Monagree CLI'),
    new classes_1.cMeta('branch', 'Creates a new branch (eg thewebsite.com/branch1, thewebsite.com/branch2)'),
    new classes_1.cMeta('deploy', 'Bundles and deploys your entire design. Use `monagree deploy -b branch-id` to deploy specific branch. use `monagree deploy -l` to test locally'),
    new classes_1.cMeta('config', 'See info (id, branches, site_url ...) about your design'),
    new classes_1.cMeta('set-color', 'Set default colors for your design'),
];
function ncfg() {
    printErr('No config yet, run `monagree create` to create a new design');
}
function nfold() {
    printErr('Invalid. Call all commands (except create) from your project root folder');
}
function nsgn() {
    printErr('You need to login. Run `monagree login`');
}
function finInit1(loader, pid) {
    (0, helpers_1.addMonagreeSDK)(function (stg, msg) {
        clearInterval(loader);
        if (stg == 1) {
            printOk('SDK added. Happy coding! Dont forget to use `monagree branch the-branch-id` to create your pages');
        }
        else if (stg == 0) {
            printCyan('Finished but could not add Monagree SDK. Please run `npm install monagree` now');
        }
        finInit2(pid);
    });
}
function finInit2(pid) {
    (0, helpers_1.inquire)([
        {
            type: 'select',
            name: 'opn',
            message: 'Do you want to open VS code now? ',
            choices: ['yes', 'no'],
            validate: helpers_1.vv
        },
    ], function (ok, ans) {
        if (ok && ans.opn == 'yes') {
            (0, helpers_1.runCmd)('code .', function (stg, msg) {
                if (stg == 1) {
                    printCyan('Continue with the terminal in VS');
                    printOk('Happy coding!');
                    setTimeout(function () {
                        var exec = require('child_process').exec;
                        if (process.platform === 'win32') {
                            exec('taskkill /F /PID ' + process.pid);
                        }
                        else {
                            exec('kill -9 ' + process.pid);
                        }
                    }, 3000);
                }
                else if (stg == 0) {
                    printErr('Could not open VS code');
                    console.log(kleur_1.default.bgMagenta("NOTE: Run `cd ".concat(pid, "` before anything else")));
                }
                process.exit(0);
            });
        }
        else {
            console.log(kleur_1.default.bgMagenta("NOTE: Run `cd ".concat(pid, "` before anything else")));
            process.exit(0);
        }
    });
}
function getIdFromTitle(title) {
    var pid = title;
    pid = pid.toLowerCase().replace(' ', '_');
    return pid;
}
function proceedInit(ans) {
    ans = __assign(__assign({}, ans), { fold: 'src' });
    var bizTypes = ['e-commerce', 'delivery'];
    var bizTypes_id = ['s', 'l'];
    (0, helpers_1.inquire)([{
            type: 'select',
            name: 'c',
            message: 'e-commerce or delivery',
            choices: bizTypes.map(function (e) {
                return e;
            }),
            validate: helpers_1.vv
        }], function (ok, a) {
        if (ok) {
            var sel = a.c;
            var sel_id_1 = bizTypes_id[bizTypes.indexOf(sel)];
            var tc1 = { c1: sel };
            ans = __assign(__assign({}, ans), tc1);
            var tc2 = { c1_id: sel_id_1 };
            ans = __assign(__assign({}, ans), tc2);
            printNorm('Just a sec...');
            catHelp("meta/cats/".concat(sel_id_1), 'Choose Category', function (c, e2) {
                var tc1 = { c2: c.c };
                ans = __assign(__assign({}, ans), tc1);
                var tc2 = { c2_id: e2 };
                ans = __assign(__assign({}, ans), tc2);
                catHelp("meta/cats/".concat(sel_id_1, "/").concat(e2, "/sc"), 'use "spaces" to select as many sub-categories that apply', function (c, e3) {
                    var pid = getIdFromTitle(ans.title);
                    (0, helpers_1.cdIntoProject)(pid, function (ok) {
                        if (ok) {
                            process.chdir("".concat(process.cwd(), "/").concat(pid));
                            var homeDesc = 'Design entry point (usually home page)';
                            var tc1_1 = { c3: c.c };
                            ans = __assign(__assign({}, ans), tc1_1);
                            var tc2_1 = { c3_ids: e3 };
                            ans = __assign(__assign({}, ans), tc2_1);
                            ans = __assign(__assign({ id: (0, helpers_1.getCT)() }, ans), { branches: { home: { branch_desc: homeDesc } } });
                            (0, helpers_1.saveConfig)(JSON.stringify(ans));
                            printCyan("Config created, adding Monagree SDK ".concat(ans.lang == 'ts' ? '& TS tools' : '', " to package.json"));
                            var loader_1 = simulateLoader();
                            (0, helpers_1.initNpm)(pid, ans.desc, ans.c1);
                            (0, helpers_1.doBranch)('home', homeDesc, ans.fold, ans.lang, ans, function (ok) {
                                if (ans.lang == 'ts') {
                                    (0, helpers_1.setupTS)(function (ok) {
                                        if (ok) {
                                            finInit1(loader_1, pid);
                                        }
                                        else {
                                            printErr("TS setup failed. Please recreate project");
                                            process.exit(0);
                                        }
                                    });
                                }
                                else {
                                    finInit1(loader_1, pid);
                                }
                            });
                        }
                        else {
                            printErr('Failed. Is project name valid');
                            process.exit(0);
                        }
                    });
                }, true);
            });
        }
        else {
            printErr('Wizard was cancelled');
            process.exit(0);
        }
    });
}
function printConfig() {
    var cfg = (0, helpers_1.getConfig)();
    if (cfg) {
        delete cfg.id;
        delete cfg.c1_id;
        delete cfg.c2_id;
        delete cfg.c3_ids;
        console.log(cfg);
    }
    else {
        ncfg();
    }
}
//---
commander_1.program.option('-v, --version', 'Check CLI version').action(intro);
commander_1.program.command('help').action(intro);
commander_1.program.command(commands[6].command)
    .description(commands[6].desc)
    .action(function () {
    if (!(0, helpers_1.amInMonagreeFolder)()) {
        nfold();
        return;
    }
    var cfg = (0, helpers_1.getConfig)();
    if (!cfg) {
        ncfg();
        return;
    }
    (0, helpers_1.inquire)([
        {
            type: 'select',
            name: 'typ',
            message: 'Choose type of color to set',
            choices: ['primary', 'secondary', 'background', 'text'],
            validate: function (selectedIndices) {
                return selectedIndices && selectedIndices.length > 0 ? true : "Please choose type of color to set";
            }
        },
        {
            type: 'input',
            name: 'col',
            message: 'Enter Color Hex (eg #ffffff)',
            validate: helpers_1.vv
        }
    ], function (ok, a2) {
        if (ok) {
            cfg.colors[a2.typ] = a2.col;
            (0, helpers_1.saveConfig)(JSON.stringify(cfg));
            printOk("".concat(a2.typ, " color set successfully"));
        }
        else {
            printErr('Wizard was cancelled');
            (0, helpers_1.deleteFolder)(helpers_1.configFolder);
            process.exit(0);
        }
    });
});
commander_1.program.command(commands[5].command)
    .description(commands[5].desc)
    .action(function (opts) {
    printConfig();
});
commander_1.program.command(commands[0].command)
    .description(commands[0].desc)
    .option('-p, --print', 'Print config to terminal')
    .action(function (opts) {
    if (!(0, helpers_1.isSignedIn)()) {
        nsgn();
        return;
    }
    if (opts.print) {
        printConfig();
        return;
    }
    if (!(0, helpers_1.amInMonagreeFolder)()) {
        (0, helpers_1.inquire)([
            {
                type: 'input',
                name: 'title',
                message: 'Name your design: ',
                validate: helpers_1.vv
            },
            {
                type: 'input',
                name: 'desc',
                message: 'Describe it to businesses (short): ',
                validate: helpers_1.vv
            },
            {
                type: 'select',
                name: 'class',
                message: 'Choose a pricing: ',
                choices: ['regular', 'premium'],
                validate: helpers_1.vv
            },
            {
                type: 'select',
                name: 'lang',
                message: 'Are you using javascript(js) or typescript(ts): ',
                choices: ['js', 'ts'],
                validate: helpers_1.vv
            },
        ], function (ok, ans) {
            if (ok) {
                var pid = getIdFromTitle(ans.title);
                if ((0, helpers_1.foldExists)(pid)) {
                    printErr('A design with same name already exist in this folder');
                    return;
                }
                (0, helpers_1.inquire)([
                    {
                        type: 'input',
                        name: 'primary',
                        message: 'Enter Primary Color Hex: ',
                        validate: helpers_1.vv
                    },
                    {
                        type: 'input',
                        name: 'secondary',
                        message: 'Enter Secondary Color Hex: ',
                        validate: helpers_1.vv
                    },
                    {
                        type: 'input',
                        name: 'background',
                        message: 'Enter Background Color Hex: ',
                        validate: helpers_1.vv
                    },
                    {
                        type: 'input',
                        name: 'text',
                        message: 'Enter Text Color Hex: ',
                        validate: helpers_1.vv
                    },
                ], function (ok, cols) {
                    if (ok) {
                        ans = __assign(__assign({}, ans), { colors: cols });
                        (0, helpers_1.inquire)([{
                                type: 'select',
                                name: 'whi',
                                message: 'Are you building for a specific business?',
                                choices: ['yes (only that business can use it)', 'no (anyone can buy it)'],
                                validate: helpers_1.vv
                            }], function (ok, a) {
                            if (ok) {
                                if (a.whi.startsWith('yes')) {
                                    (0, helpers_1.inquire)([{
                                            type: 'input',
                                            name: 'bzid',
                                            message: 'Enter the biz\'s short code: ',
                                            validate: helpers_1.vv
                                        }], function (ok, a) {
                                        if (ok) {
                                            ans = __assign(__assign({}, ans), a);
                                            proceedInit(ans);
                                        }
                                        else {
                                            printErr('Wizard was cancelled');
                                            process.exit(0);
                                        }
                                    });
                                }
                                else {
                                    proceedInit(ans);
                                }
                            }
                            else {
                                printErr('Wizard was cancelled');
                                process.exit(0);
                            }
                        });
                    }
                    else {
                        printErr('Wizard was cancelled');
                        process.exit(0);
                    }
                });
            }
            else {
                printErr('Wizard was cancelled');
                process.exit(0);
            }
        });
    }
    else {
        printErr('This folder contains an existing design. Please run create from a folder dedicated to all your designs');
    }
});
function catHelp(path, msg, finise, isMulti) {
    var fMan = new firehelper_1.fireMan();
    fMan.getQuery(path, function (task) {
        if (task.isSuccessful()) {
            var c1_1 = [];
            var cls_1 = [];
            task.getResult().forEach(function (doc) {
                var ts = new classes_1.catEle(doc);
                c1_1.push(ts);
                cls_1.push(ts.getTitle());
            });
            (0, helpers_1.inquire)([
                {
                    type: isMulti ? 'multiselect' : 'select',
                    name: 'c',
                    message: msg,
                    choices: c1_1.map(function (c) {
                        return c.getTitle();
                    }),
                    validate: function (selectedIndices) {
                        return selectedIndices && selectedIndices.length > 0 ? true : isMulti ? 'Please select at least one option (use spaces)' : "Please ".concat(msg);
                    }
                }
            ], function (ok, a2) {
                if (ok) {
                    if (cls_1.indexOf(a2.c) != -1) {
                        var e = c1_1[cls_1.indexOf(a2.c)].getId();
                        finise(a2, e);
                    }
                    else {
                        var e = [];
                        for (var _i = 0, _a = a2.c; _i < _a.length; _i++) {
                            var ct = _a[_i];
                            var ae = c1_1[cls_1.indexOf(ct)].getId();
                            e.push(ae);
                        }
                        finise(a2, e);
                    }
                }
                else {
                    printErr('Wizard was cancelled');
                    (0, helpers_1.deleteFolder)(helpers_1.configFolder);
                    process.exit(0);
                }
            });
        }
        else {
            printErr('An error occurred');
            process.exit(0);
        }
    });
}
commander_1.program.command(commands[1].command)
    .description(commands[1].desc)
    .action(function () {
    if ((0, helpers_1.isSignedIn)()) {
        printCyan("Already signed in as ".concat((0, helpers_1.getDevSC)(), ", run `monagree logout` and try again"));
        return;
    }
    printNorm('To login, visit the link below');
    var url = "https://developers.monagree.com/auth/".concat(firehelper_1.maid, "/").concat((0, helpers_1.getDeviceToken)());
    printCyan(url);
    (0, helpers_1.goUrl)(url);
    (0, helpers_1.inquire)([
        {
            type: 'select',
            name: 'conf',
            message: 'Have you logged in: ',
            choices: ['no', 'yes'],
            validate: helpers_1.vv
        },
    ], function (ok, ans) {
        var fMan = new firehelper_1.fireMan();
        if (ok && ans.conf == 'yes') {
            var loader_2 = simulateLoader();
            fMan.getFS("mtks/".concat(firehelper_1.maid + (0, helpers_1.getDeviceToken)()), function (task) {
                clearInterval(loader_2);
                if (task._success && (0, firehelper_1.getData)(task.getResult(), 'v').length > 5) {
                    (0, helpers_1.setDevId)((0, firehelper_1.getData)(task.getResult(), 'v'));
                    (0, helpers_1.setDevSC)((0, firehelper_1.getData)(task.getResult(), 's'));
                    printOk("Login successful for ".concat((0, helpers_1.getDevSC)()));
                }
                else {
                    printErr('Login failed. Please try again');
                }
                process.exit(0);
            });
        }
        else {
            printErr('Login failed. Please try again');
            process.exit(0);
        }
    });
});
commander_1.program.command(commands[2].command)
    .description(commands[2].desc)
    .action(function () {
    (0, helpers_1.logout)(function (ok) {
        if (ok) {
            printOk('Logout successful');
            process.exit(0);
        }
        else {
            printErr('Logout Failed');
        }
    });
});
commander_1.program.command(commands[3].command)
    .description(commands[3].desc)
    .argument('<bid>', 'The branch ID (one word, eg - cart, orders, favs)')
    .action(function (bid) {
    if (!(0, helpers_1.amInMonagreeFolder)()) {
        nfold();
        return;
    }
    var cfg = (0, helpers_1.getConfig)();
    if (!cfg) {
        ncfg();
        return;
    }
    (0, helpers_1.inquire)([
        {
            type: 'input',
            name: 'branch_desc',
            message: 'What is this branch about?',
            validate: helpers_1.vv
        }
    ], function (ok, dsc) {
        if (ok) {
            (0, helpers_1.doBranch)(bid, dsc.branch_desc, cfg.fold, cfg.lang, cfg, function (ok) {
                cfg.branches[bid] = dsc;
                (0, helpers_1.saveConfig)(JSON.stringify(cfg));
                printOk("".concat(bid, " branch successfully created"));
            });
        }
        else {
            printErr('Wizard cancelled');
        }
    });
});
commander_1.program.command(commands[4].command)
    .description(commands[4].desc)
    .option('-l, --local', 'Deploys locally')
    .option('-b, --branch <bid>', 'Deploys the specified branch only')
    .action(function (opts) { return __awaiter(void 0, void 0, void 0, function () {
    var cfg, btd;
    return __generator(this, function (_a) {
        //TODO Check if design has been purchased and invalidate
        if (!(0, helpers_1.amInMonagreeFolder)()) {
            nfold();
            return [2 /*return*/];
        }
        cfg = (0, helpers_1.getConfig)();
        if (!cfg) {
            ncfg();
            return [2 /*return*/];
        }
        if (!(0, helpers_1.isSignedIn)()) {
            nsgn();
            return [2 /*return*/];
        }
        btd = [];
        if (opts.branch) {
            if (!Object.keys(cfg.branches).includes(opts.branch)) {
                printErr(opts.branch + ' branch not found');
                return [2 /*return*/];
            }
            btd.push(opts.branch);
        }
        else {
            btd = Object.keys(cfg.branches);
        }
        deployBranch(0, btd, cfg, opts, function (ok, index, files) {
            if (ok) {
                printOk("".concat(btd[index], " code bundled successfully"));
            }
            else {
                printErr("Bundle Failed. Problem at ".concat(btd[index], " branch"));
            }
        }, function () {
            if (opts.local) {
                process.chdir("".concat(process.cwd(), "/").concat(helpers_1.configFolder));
                (0, helpers_1.serveLocal)(function (ok) {
                    if (ok) {
                        printNorm('Use ctr + c to end server');
                        printCyan('Server is running at http://localhost:3310 (Hot-Reload available)');
                        (0, helpers_1.runCmd)("node server.js", function (stg, msg) {
                            if (stg == 1) {
                                printOk('Local server terminated');
                            }
                            if (stg == 0) {
                                printErr('Failed to start server');
                            }
                        });
                    }
                    else {
                        printErr('Could not serve locally');
                    }
                }, cfg, 'sample-biz-id');
            }
            else {
                var dMan_1 = new helpers_1.deployMan(cfg);
                printNorm("Preping to deploy ".concat(cfg.title));
                dMan_1.isGitAvailable(function (ok) {
                    if (ok) {
                        askForGitToken(cfg, function (ok, token) {
                            if (ok) {
                                dMan_1.configureGit(cfg, function (ok) { return __awaiter(void 0, void 0, void 0, function () {
                                    var contin, _i, btd_1, bid, loader_3, _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                if (!ok) return [3 /*break*/, 8];
                                                printCyan('Preparation successful. Deploying now');
                                                return [4 /*yield*/, dMan_1.addFile('README.md', true)];
                                            case 1:
                                                contin = _b.sent();
                                                _i = 0, btd_1 = btd;
                                                _b.label = 2;
                                            case 2:
                                                if (!(_i < btd_1.length)) return [3 /*break*/, 5];
                                                bid = btd_1[_i];
                                                if (!contin) {
                                                    return [3 /*break*/, 5];
                                                }
                                                return [4 /*yield*/, dMan_1.prepGit(bid)];
                                            case 3:
                                                contin = _b.sent();
                                                _b.label = 4;
                                            case 4:
                                                _i++;
                                                return [3 /*break*/, 2];
                                            case 5:
                                                loader_3 = simulateLoader();
                                                _a = contin;
                                                if (!_a) return [3 /*break*/, 7];
                                                return [4 /*yield*/, dMan_1.commitAndPush()];
                                            case 6:
                                                _a = (_b.sent());
                                                _b.label = 7;
                                            case 7:
                                                if (_a) {
                                                    printNorm('Notifying Monagree\'s global CDN');
                                                    dMan_1.prepare(function (ok) {
                                                        if (ok) {
                                                            dMan_1.createDesign(cfg, function (ok) {
                                                                clearInterval(loader_3);
                                                                if (ok) {
                                                                    printOk('Deploy successful. Awesome Job! ');
                                                                    var site = "https://monagree.com/".concat(cfg.id, "/sample-biz-id");
                                                                    cfg.site = site;
                                                                    (0, helpers_1.saveConfig)(JSON.stringify(cfg));
                                                                    printCyan("Your site is hosted at ".concat(site, ", run `monagree config` to see this url again. Dont forget to change sample-biz-id to preferred biz"));
                                                                }
                                                                else {
                                                                    printErr('Notification failed!');
                                                                }
                                                            });
                                                        }
                                                        else {
                                                            clearInterval(loader_3);
                                                            printErr('Notification failed!');
                                                        }
                                                    });
                                                }
                                                else {
                                                    clearInterval(loader_3);
                                                    printErr('Deploy failed!');
                                                }
                                                return [3 /*break*/, 9];
                                            case 8:
                                                printErr('Git config failed');
                                                _b.label = 9;
                                            case 9: return [2 /*return*/];
                                        }
                                    });
                                }); });
                            }
                            else {
                                printErr('Preparation failed');
                            }
                        });
                    }
                    else {
                        printErr('Git was not found on your pc. Download & Install Git and try deploy again');
                        var gitUrl = 'https://git-scm.com/download';
                        printCyan("Download at ".concat(gitUrl));
                        (0, helpers_1.goUrl)(gitUrl);
                    }
                });
            }
        });
        return [2 /*return*/];
    });
}); });
function askForGitToken(cfg, finise) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, helpers_1.gitTokenOk)()];
                case 1:
                    //TODO read token from server
                    if (_a.sent()) {
                        finise(true, (0, helpers_1.getGitToken)());
                        return [2 /*return*/];
                    }
                    printCyan('----------\n----------\n\n');
                    printCyan('CONFIGURE GITHUB');
                    printNorm('- Until someone buys your design, it will be hosted in a repo on your github profile (managed by Monagree)');
                    printNorm('- On the next step, you will generate an ACCESS_TOKEN for us to do this');
                    printNorm('- Make sure to use the github profile & username associated with dev/team - ' + (0, helpers_1.getDevSC)());
                    printNorm("- DO NOT make any change or edit any thing in this repo (repo_name = ".concat(cfg.id, ")"));
                    printNorm('- Consider naming the access token Monagree CLI so you dont mistakenly delete it\n');
                    printCyan('MOST IMPORTANT\n');
                    printNorm('When a link to your GITHUB is launched:');
                    printNorm('- Change `expiry` dropdown to `No Expiry`');
                    printNorm('- Tick the repo box under `Select scopes` (including all its children)');
                    printNorm('- Scroll to the bottom and click `Generate token`. Copy it and come back');
                    printCyan('----------\n----------\n\n');
                    (0, helpers_1.inquire)([
                        {
                            type: 'select',
                            name: 'cns',
                            message: 'Have you read the instructions above?',
                            choices: ['no', 'yes'],
                            validate: helpers_1.vv
                        }
                    ], function (ok, ans) {
                        if (ok && ans.cns == 'yes') {
                            printNorm('Visit the link below to generate a token');
                            var url = "https://github.com/settings/tokens/new";
                            printCyan(url);
                            (0, helpers_1.goUrl)(url);
                            (0, helpers_1.inquire)([
                                {
                                    type: 'input',
                                    name: 'tkn',
                                    message: 'Enter the token here: ',
                                    validate: helpers_1.vv
                                },
                                {
                                    type: 'input',
                                    name: 'usr',
                                    message: 'Enter your github username (case-sensitive): ',
                                    validate: helpers_1.vv
                                }
                            ], function (ok, ans) {
                                if (ok) {
                                    var loader_4 = simulateLoader();
                                    var dMan_2 = new helpers_1.deployMan(cfg);
                                    dMan_2.prepare(function (ok) {
                                        if (ok) {
                                            dMan_2.setGitToken(ans.tkn, ans.usr, function (ok) {
                                                clearInterval(loader_4);
                                                if (ok) {
                                                    askForGitToken(cfg, finise);
                                                }
                                                else {
                                                    printErr('Github Configuration failed. Maybe network');
                                                }
                                            });
                                        }
                                        else {
                                            clearInterval(loader_4);
                                            printErr('Github Configuration failed. Maybe network');
                                        }
                                    });
                                }
                                else {
                                    finise(false);
                                }
                            });
                        }
                        else {
                            finise(false);
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function deployBranch(index, bids, cfg, opts, finise, allDone) {
    if (bids.length == index) {
        allDone();
        return;
    }
    var bid = bids[index];
    printNorm("Bundling source code for ".concat(bid, "..."));
    var loader = simulateLoader();
    (0, webpack_1.default)((0, helpers_1.getWebpackConfig)(cfg.fold + '/' + bid, bid, cfg.lang, opts.local), function (err, stats) {
        var _a, _b;
        clearInterval(loader);
        if (err || !stats || stats.hasErrors()) {
            var errors = err || (stats && stats.toJson().errors) || [];
            console.error('Bundle failed with errors:');
            if (Array.isArray(errors)) {
                errors.forEach(function (error, index) {
                    console.error("Error ".concat(index + 1, ": ").concat(error['message'])); //NOTE: To print full error: JSON.stringify(error)
                });
            }
            else {
                console.error(errors);
            }
            finise(false, index);
        }
        else {
            if (stats.hasWarnings()) {
                var warnings = stats.toJson().warnings;
                if (warnings && warnings.length > 0) {
                    console.warn("".concat(warnings.length, " warning(s) found:"));
                    warnings.forEach(function (warning, index) {
                        console.warn("Warning ".concat(index + 1, ": ").concat(warning['message']));
                    });
                }
            }
            else {
                printCyan('Perfect code. No warnings found');
            }
            //finalHtml(bid,`Design ${cfg.id}`,cfg.bzid)
            finise(true, index, (_b = (_a = stats.toJson()) === null || _a === void 0 ? void 0 : _a.assetsByChunkName) === null || _b === void 0 ? void 0 : _b.main);
            var i = index + 1;
            deployBranch(i, bids, cfg, opts, finise, allDone);
        }
    });
}
var simulateLoader = function () {
    var frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    var i = 0;
    return setInterval(function () {
        process.stdout.write("\r".concat(kleur_1.default.green(frames[i]), " Loading..."));
        i = (i + 1) % frames.length;
    }, 80);
};
function printNorm(msg, ok) {
    console.log(ok ? kleur_1.default.cyan(msg) : kleur_1.default.white(msg));
}
exports.printNorm = printNorm;
function printCyan(msg) {
    console.log(kleur_1.default.cyan(msg));
}
exports.printCyan = printCyan;
function printOk(msg) {
    console.log(kleur_1.default.green(msg));
}
exports.printOk = printOk;
function printErr(msg) {
    console.log(kleur_1.default.red(msg));
}
exports.printErr = printErr;
function rainbowText(text) {
    var colors = [
        kleur_1.default.red,
        kleur_1.default.yellow,
        kleur_1.default.green,
        kleur_1.default.cyan,
        kleur_1.default.magenta,
    ];
    return text
        .split(' ')
        .map(function (char, index) { return colors[index % colors.length](char); })
        .join(' ');
}
commander_1.program.parse(process.argv);
