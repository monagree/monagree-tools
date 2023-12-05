"use strict";
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
exports.setupTS = exports.doBranch = exports.deployMan = exports.loginMan = exports.initNpm = exports.serveLocal = exports.getWebpackConfig = exports.runCmd = exports.addMonagreeSDK = exports.setDevSC = exports.setDevId = exports.gitTokenOk = exports.getGitUN = exports.getGitToken = exports.getDevSC = exports.getDevId = exports.isSignedIn = exports.logout = exports.getDeviceToken = exports.getCT = exports.foldExists = exports.amInMonagreeFolder = exports.goUrl = exports.inquire = exports.deleteFolder = exports.getConfig = exports.saveToFile = exports.saveConfig = exports.cdIntoProject = exports.hasConfig = exports.vv = exports.decrypt = exports.encrypt = exports.configFolder = void 0;
var child_process_1 = require("child_process");
var crypto_1 = __importDefault(require("crypto"));
var fs_1 = __importDefault(require("fs"));
var os_1 = __importDefault(require("os"));
var path_1 = __importDefault(require("path"));
var enquirer_1 = require("enquirer");
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var axios_1 = __importDefault(require("axios"));
var octokit_1 = require("octokit");
var simple_git_1 = __importDefault(require("simple-git"));
var firehelper_1 = require("./firehelper");
var _1 = require(".");
var secretKey = crypto_1.default.createHash('sha256').update('rondanfel').digest('base64').substr(0, 32);
var iv = 'f0a1b2c3d4e5f678901234567890abcd';
var SPfolder = path_1.default.join(os_1.default.homedir(), '.monagree');
exports.configFolder = '.monagree';
function encrypt(data) {
    var cipher = crypto_1.default.createCipheriv('aes-256-cbc', secretKey, Buffer.from(iv, 'hex'));
    var encryptedData = cipher.update(data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
}
exports.encrypt = encrypt;
function decrypt(enc) {
    var decipher = crypto_1.default.createDecipheriv('aes-256-cbc', secretKey, Buffer.from(iv, 'hex'));
    var decryptedData = decipher.update(enc, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
    return decryptedData;
}
exports.decrypt = decrypt;
// Function to encrypt and save sensitive data in the user's home directory
function saveSP(key, data, useConfigFold) {
    if (!fs_1.default.existsSync(SPfolder)) {
        fs_1.default.mkdirSync(SPfolder, { recursive: true });
    }
    var encryptedFilePath = path_1.default.join(useConfigFold ? exports.configFolder : SPfolder, key);
    fs_1.default.writeFileSync(encryptedFilePath, encrypt(data), 'utf-8');
}
var vv = function (selectedIndices) {
    return selectedIndices && selectedIndices.length > 0 ? true : "Please enter something";
};
exports.vv = vv;
// Function to decrypt and retrieve sensitive data from the user's home directory
function getSP(key, useConfigFold) {
    try {
        var encryptedFilePath = path_1.default.join(useConfigFold ? exports.configFolder : SPfolder, key);
        var encryptedData = fs_1.default.readFileSync(encryptedFilePath, 'utf-8');
        return decrypt(encryptedData);
    }
    catch (error) {
        return '';
    }
}
function hasConfig() {
    var cf = path_1.default.join(exports.configFolder, 'monagree.config');
    return fs_1.default.existsSync(cf);
}
exports.hasConfig = hasConfig;
function cdIntoProject(pid, finise) {
    if (fs_1.default.existsSync(pid)) {
        finise(false);
        return;
    }
    try {
        fs_1.default.mkdirSync(pid);
        finise(true);
    }
    catch (error) {
        console.error('Error creating directory:', error.message);
        finise(false);
    }
}
exports.cdIntoProject = cdIntoProject;
function saveConfig(data) {
    saveToFile(exports.configFolder, 'monagree.config', encrypt(data));
    saveToFile(exports.configFolder, '.eslintrc.js', "// .eslintrc.js\n\n  module.exports = {\n    env: {\n      browser: true,\n      es6: true, // Target ECMAScript 5 for broader compatibility\n      commonjs: true,\n    },\n    extends: 'eslint:recommended',\n    parserOptions: {\n      ecmaVersion: 2015, // Use ECMAScript 5 for broader compatibility\n      sourceType: 'module',\n    },\n    rules: {\n      \"semi\": \"off\",\n      // Additional rules can be added here if needed\n    },\n  };\n  ");
}
exports.saveConfig = saveConfig;
function saveToFile(folder, filename, data, dont_overwrite) {
    if (folder.length > 0 && !fs_1.default.existsSync(folder)) {
        fs_1.default.mkdirSync(folder, { recursive: true });
    }
    if (dont_overwrite && fs_1.default.existsSync(path_1.default.join(folder, filename))) {
        return;
    }
    try {
        fs_1.default.writeFileSync(path_1.default.join(folder, filename), data, 'utf-8');
    }
    catch (e) {
        console.error(e);
    }
}
exports.saveToFile = saveToFile;
function getConfig() {
    try {
        var encryptedFilePath = path_1.default.join(exports.configFolder, 'monagree.config');
        var encryptedData = fs_1.default.readFileSync(encryptedFilePath, 'utf-8');
        return JSON.parse(decrypt(encryptedData));
    }
    catch (error) {
        return undefined;
    }
}
exports.getConfig = getConfig;
function deleteFolder(folder, finise) {
    fs_1.default.readdir(folder, function (err, files) {
        if (err) {
            if (finise) {
                finise(false);
            }
            return;
        }
        files.forEach(function (file) {
            var filePath = path_1.default.join(folder, file);
            // Check if it's a file (not a directory)
            if (fs_1.default.statSync(filePath).isFile()) {
                fs_1.default.unlinkSync(filePath);
            }
        });
        if (finise) {
            finise(true);
        }
    });
}
exports.deleteFolder = deleteFolder;
function inquire(prompts, finise) {
    (0, enquirer_1.prompt)(prompts)
        .then(function (answers) {
        finise(true, answers);
    }).catch(function (e) {
        console.error(e);
        finise(false);
    });
}
exports.inquire = inquire;
// Function to open the URL based on the operating system
function goUrl(url) {
    var command = process.platform === 'darwin'
        ? "open ".concat(url)
        : process.platform === 'win32'
            ? "start ".concat(url)
            : "xdg-open ".concat(url);
    (0, child_process_1.exec)(command, function (error) {
        if (error) {
            console.error("Error opening URL: ".concat(error.message));
        }
    });
}
exports.goUrl = goUrl;
function amInMonagreeFolder() {
    return foldExists(exports.configFolder);
}
exports.amInMonagreeFolder = amInMonagreeFolder;
function foldExists(folder) {
    return fs_1.default.existsSync(folder);
}
exports.foldExists = foldExists;
function getCT() {
    return Date.now().toString();
}
exports.getCT = getCT;
function getDeviceToken() {
    var dtkn = getSP('dtkn');
    if (dtkn.length > 0) {
        return dtkn;
    }
    dtkn = getCT();
    saveSP('dtkn', dtkn);
    return dtkn;
}
exports.getDeviceToken = getDeviceToken;
function logout(finise) {
    fs_1.default.readdir(SPfolder, function (err, files) {
        if (err) {
            finise(false);
            return;
        }
        files.forEach(function (file) {
            var filePath = path_1.default.join(SPfolder, file);
            // Check if it's a file (not a directory)
            if (fs_1.default.statSync(filePath).isFile()) {
                fs_1.default.unlinkSync(filePath);
            }
        });
        finise(true);
    });
}
exports.logout = logout;
function isSignedIn() {
    return getDevId().length > 0;
}
exports.isSignedIn = isSignedIn;
function getDevId() {
    return getSP('devid');
}
exports.getDevId = getDevId;
function getDevSC() {
    return getSP('devsc');
}
exports.getDevSC = getDevSC;
function getGitToken() {
    return getSP('gtoken' + getDevId());
}
exports.getGitToken = getGitToken;
function getGitUN() {
    return getSP('gun' + getDevId());
}
exports.getGitUN = getGitUN;
function gitTokenOk() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (getGitToken().length == 0) {
                return [2 /*return*/, false];
            }
            //TODO A way to use the API to check token SCOPE and EXPIRY
            return [2 /*return*/, true];
        });
    });
}
exports.gitTokenOk = gitTokenOk;
function setDevId(did) {
    saveSP('devid', did);
}
exports.setDevId = setDevId;
function setDevSC(dml) {
    saveSP('devsc', dml);
}
exports.setDevSC = setDevSC;
function addMonagreeSDK(finise) {
    runCmd("npm install monagree", finise);
}
exports.addMonagreeSDK = addMonagreeSDK;
function runCmd(command, finise) {
    var _a;
    var childProcess = (0, child_process_1.exec)(command);
    // Listen for messages from the child process
    (_a = childProcess.stdout) === null || _a === void 0 ? void 0 : _a.on('data', function (data) {
        var dt = data;
        if (dt.startsWith('L')) {
            (0, _1.printCyan)('Loading...');
        }
        if (dt.startsWith('E')) {
            (0, _1.printErr)(dt.substring(1));
        }
        if (dt.startsWith('W')) {
            console.warn(dt.substring(1));
        }
        if (dt.startsWith('C')) {
            (0, _1.printCyan)(dt.substring(1));
        }
        if (dt.startsWith('G')) {
            (0, _1.printOk)(dt.substring(1));
        }
        finise(2, data);
    });
    childProcess.on('error', function (error) {
        console.error("Error: ".concat(error.message));
        finise(0, error.message);
    });
}
exports.runCmd = runCmd;
function getWebpackConfig(folder, bid, lang, isDebug, iMoved) {
    return {
        mode: (isDebug ? 'development' : 'production'),
        entry: ".".concat(iMoved ? '.' : '', "/").concat(folder, "/index.").concat(lang), // or './src/index.ts' for TypeScript
        output: {
            filename: "".concat(bid, ".js"),
            path: path_1.default.join(process.cwd(), iMoved ? '' : exports.configFolder, 'dist', bid),
        },
        module: {
            rules: [
                {
                    test: /\.(js|ts)$/, // This captures both .js and .ts files
                    exclude: /node_modules/,
                    use: [
                        require.resolve('babel-loader'),
                        {
                            loader: require.resolve('eslint-loader'),
                            options: {
                                configFile: path_1.default.join(iMoved ? '' : exports.configFolder, '.eslintrc.js'),
                            },
                        },
                    ],
                },
                {
                    test: /\.html$/,
                    use: [require.resolve('html-loader')],
                },
                {
                    test: /\.css$/,
                    use: [mini_css_extract_plugin_1.default.loader, require.resolve('css-loader'), require.resolve('postcss-loader')],
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    type: 'asset/resource',
                    use: [require.resolve('file-loader')],
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [require.resolve('style-loader'), require.resolve('css-loader'), require.resolve('sass-loader')],
                },
            ],
        },
        plugins: [
            new mini_css_extract_plugin_1.default({
                filename: 'styles.css'
            }),
        ],
        resolve: {
            extensions: ['.js', '.ts'], // include '.ts' for TypeScript
        },
        // ...other configurations
    };
}
exports.getWebpackConfig = getWebpackConfig;
function serveLocal(finise, cfg, bzid) {
    saveToFile('', 'start.html', "<!doctype html>\n  <html lang=\"en\">\n  <head>\n      <meta charset=\"UTF-8\">\n      <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n      <title>Monagree Design</title>\n      <script id=\"djs\"></script>\n      <script>\n          const up = window.location.href.split('//')[1].split('/')\n          let bz = '".concat(bzid !== null && bzid !== void 0 ? bzid : '', "',br = ''\n          if(bz.length <3){\n              bz = up[2]\n              br = up[3]\n          }else{\n              br = up[2]\n          }\n          if(!br || br.length < 2){\n            br = 'home'\n          }\n          const ws = new WebSocket('ws://localhost:3000');\n          ws.addEventListener('message', (event) => {\n          if (event.data === br) {\n              window.location.reload();\n          }\n          });\n      </script>\n      <link href=\"\" rel=\"stylesheet\" id=\"dst\">\n      <script defer=\"defer\">\n          const currentUrl = window.location.href.split('//')[1]\n          const urlParts = currentUrl.split('/')\n          const designId = urlParts[1]\n          let bizId = '").concat(bzid !== null && bzid !== void 0 ? bzid : '', "',branchId = ''\n          if(bizId.length <3){\n              bizId = urlParts[2]\n              branchId = urlParts[3]\n          }else{\n              branchId = urlParts[2]\n          }\n          if(!branchId || branchId.length < 2){\n            branchId = 'home'\n          }\n          if(bizId){\n            localStorage.setItem('bzid',bizId)\n            const scriptElement = document.getElementById('djs');\n            scriptElement.src = `//localhost:3310/${designId}/${branchId}/${branchId}.js`;\n            scriptElement.defer = true;\n            scriptElement.addEventListener('load', () => {\n              \n            });\n            scriptElement.addEventListener('error', (error) => {\n              \n            });\n            document.getElementById('dst').href = `//localhost:3310/${designId}/${branchId}/styles.css`;\n            document.title = `DA NAME`;\n          }else{\n            //400\n          }\n      </script>\n  </head>\n  <body>\n      <div id=\"monapp\"></div>\n  </body>\n  </html>"));
    saveToFile('', 'server.js', "const port = 3310;\n  const express = require('".concat(path_1.default.normalize(require.resolve('express')).replace(/\\/g, '/'), "');\n  const path = require('path');\n  const fs = require('fs');\n  const { exec } = require('child_process');\n  const WebSocket = require('").concat(path_1.default.normalize(require.resolve('ws')).replace(/\\/g, '/'), "');\n  const http = require('http');\n  const webpack = require('").concat(path_1.default.normalize(require.resolve('webpack')).replace(/\\/g, '/'), "');\n  const MiniCssExtractPlugin = require('").concat(path_1.default.normalize(require.resolve('mini-css-extract-plugin')).replace(/\\/g, '/'), "');\n  \n  const app = express();\n  const server = http.createServer(app);\n  const wss = new WebSocket.Server({ server });\n  \n  const configFold = '").concat(exports.configFolder, "';\n  const dtw = path.join(__dirname, '..', 'src')\n  let handling = false\n  function getCFG(bid){\n      let wcfg = ").concat(JSON.stringify(getWebpackConfig(cfg.fold + '/' + 'TBID', 'TBID', cfg.lang, true, true), function (key, value) {
        if (key == 'test') {
            var rg = value.toString();
            if (rg.includes('js')) {
                return 'js';
            }
            else if (rg.includes('html')) {
                return 'html';
            }
            else if (rg.includes('css')) {
                return 'css';
            }
            else if (rg.includes('png')) {
                return 'png';
            }
            else if (rg.includes('s[ac]ss')) {
                return 'sass';
            }
            return value.toString();
        }
        if (key === 'plugins') {
            return 'plg';
        }
        if (key.startsWith('plugins.') && key !== 'plugins') {
            return undefined;
        }
        if (key == 'exclude') {
            return 'nmd';
        }
        return value;
    }), "\n      const jss = JSON.stringify(wcfg,(key,value)=>{\n        if(key=='test'){\n          const rg = value.toString()\n          if(rg.includes('js')){\n            return 'js'\n          }else if(rg.includes('html')){\n            return 'html'\n          }else if(rg.includes('css')){\n            return 'css'\n          }else if(rg.includes('png')){\n            return 'png'\n          }else if(rg.includes('s[ac]ss')){\n            return 'sass'\n          }\n          return value.toString()\n        }\n        if (key === 'plugins') {\n          return 'plg';\n        }\n        if (key.startsWith('plugins.') && key !== 'plugins') {\n          return undefined;\n        }\n        if(key == 'exclude'){\n          return 'nmd'\n        }\n        return value\n      })\n      const parsedConfig = JSON.parse(jss, (key, value) => {\n        if (key=='test') {\n            const vs = value.toString()\n            if(vs.includes('js')){\n                return /\\.(js|ts)$/\n            }else if(vs.includes('html')){\n                return /\\.html$/\n            }else if(vs.includes('css')){\n                return /\\.css$/\n            }else if(vs.includes('png')){\n                return /\\.(png|svg|jpg|gif)$/\n            }else if(vs.includes('sass')){\n                return /\\.s[ac]ss$/\n            }\n        }\n        if(key == 'exclude'){\n            return /node_modules/\n        }\n        if (key === 'plugins') {\n            return [\n                new MiniCssExtractPlugin({\n                    filename: 'styles.css'\n                })\n            ];\n          }\n        if(value.toString().includes('TBID')){\n            return value.replace(/TBID/g,bid)\n        }\n        return value;\n      });\n    return parsedConfig\n  }\n  \n  const watcher = fs.watch(dtw, { recursive: true }, (eventType, fn) => {\n      // Check if the event is a change (file modified)\n      if(handling){\n          return\n      }\n      if (eventType === 'change') {\n        handling = true\n        const bid = fn.split('\\\\')[0]\n      console.log('L')\n      webpack(getCFG(bid), (err, stats) => {\n        if (err || !stats || stats.hasErrors()) {\n          const errors = err || (stats && stats.toJson().errors) || [];\n          \n          console.log('EBundle failed with errors:');\n    \n          if (Array.isArray(errors)) {\n            errors.forEach((error, index) => {\n              console.log(`EError ${index + 1}: ${JSON.stringify(error)}`);\n            });\n          } else {\n            console.log('E'+errors);\n          }\n          handling = false\n        } else {\n          if(stats.hasWarnings()){\n            const warnings = stats.toJson().warnings;\n            if (warnings && warnings.length > 0) {\n              console.log(`W${warnings.length} warning(s) found:`);\n              warnings.forEach((warning, index) => {\n                console.log(`WWarning ${index + 1}: ${JSON.stringify(warning)}`);\n              });\n            }\n          }else{\n            console.log('CPerfect code. No warnings found')\n          }\n          console.log('GRebuild complete. Invoking reload')\n          wss.clients.forEach((client) => {\n            if (client.readyState === WebSocket.OPEN) {\n              // Send a reload signal to the connected clients\n              client.send(bid);\n            }\n          });\n          handling = false\n        }\n      });\n      }\n  });\n  \n  \n  app.get('/:did', (req, res) => {\n  const did = req.params.did;\n  res.sendFile(path.join(__dirname, 'pages.html'));\n  });\n  \n  app.get('/:did/:bid', (req, res) => {\n  const did = req.params.did;\n  const bid = req.params.bid || 'home';\n  res.sendFile(path.join(__dirname, 'start.html'));\n  });\n  \n  app.get('/:did/:bid/:filename', (req, res) => {\n  const did = req.params.did;\n  const bid = req.params.bid;\n  const filename = req.params.filename;\n  res.sendFile(path.join(__dirname, 'dist', bid, filename));\n  });\n\n  server.listen(3000, () => {\n  });\n  \n  app.listen(port, () => {\n  console.log(`Server is running at http://localhost:${port}`);\n  exec(`start http://localhost:${port}/").concat(cfg.id, "`);\n  });\n  \n  process.on('exit', () => {\n      watcher.close();\n      console.log('File watcher closed.');\n  });"));
    saveToFile('', 'pages.html', "<!doctype html>\n  <html lang=\"en\">\n  \n  <head>\n      <meta charset=\"UTF-8\">\n      <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n      <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Pacifico&display=swap\">\n      <title>".concat(cfg.title, "</title>\n      <style>\n          body{\n              font-family: 'Pacifico', sans-serif;\n              margin: 0;\n              padding: 0;\n              background-color: lavender;\n              width: 100vw;\n              height: 100vh;\n              display: flex;\n              flex-direction: column;\n              align-items: center;\n              justify-content: center;\n          }\n          a {\n            text-decoration: none;\n            color: inherit; \n          }\n          h2, h3{\n              margin: 5px;\n          }\n          p{\n              font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;\n              margin: 5px;\n          }\n          .dsgs{\n              display: flex;\n              flex-wrap: wrap;\n              margin-top: 30px;\n          }\n          .page{\n              padding: 10px;\n              box-sizing: border-box;\n              min-width: 120px;\n              height: 150px;\n              border-radius: 10px;\n              display: flex;\n              flex-direction: column;\n              align-items: center;\n              justify-content: center;\n              margin: 10px;\n              cursor: pointer;\n          }\n          .dv{\n              height: 50px;\n          }\n          #a{\n              background-color: rgba(152, 216, 202,0.2);\n              color: rgba(0, 0, 0,0.5);\n              transition: color 0.5s ease-in-out, background-color 0.5s ease-in-out, transform 0.5s ease-in-out;\n          }\n          #a:hover{\n              background-color: rgb(152, 221, 202);\n              color: black;\n              transform: scale(1.05);\n          }\n          #b{\n              background-color: rgba(216, 163, 163,0.2);\n              color: rgba(0, 0, 0,0.5);\n              transition: color 0.5s ease-in-out, background-color 0.5s ease-in-out, transform 0.5s ease-in-out;\n          }\n          #b:hover{\n              background-color: rgb(216, 163, 163);\n              color: black;\n              transform: scale(1.05);\n          }\n          #c{\n              background-color: rgba(174, 174, 255,0.2);\n              color: rgba(0, 0, 0,0.5);\n              transition: color 0.5s ease-in-out, background-color 0.5s ease-in-out, transform 0.5s ease-in-out;\n          }\n          #c:hover{\n              background-color: rgb(174, 174, 255);\n              color: black;\n              transform: scale(1.05);\n          }\n      </style>\n  </head>\n  \n  <body>\n      <h1 style=\"color: blue;\">").concat(cfg.title, "</h1>\n      <p>Choose a branch to start with (Query params are on you)</p>\n      <div class=\"dsgs\">\n          ").concat(Object.keys(cfg.branches).map(function (bid, i) {
        return getBranchMini(cfg.id, bid, i);
    }), "\n      </div>\n  </body>\n  \n  </html>"));
    finise(true);
}
exports.serveLocal = serveLocal;
function getBranchMini(did, bid, j) {
    var i = j;
    while (i > 2) {
        i = i - 3;
    }
    var cid = i == 0 ? 'a' : i == 1 ? 'b' : 'c';
    return "<a href=\"/".concat(did, "/").concat(bid, "\">\n  <div class=\"page\" id=\"").concat(cid, "\">\n      <img class=\"dv\" src=\"https://developers.monagree.com/static/media/dev.7316fd80843a79e423ae.png\">\n      <h3>").concat(bid, "</h3>\n  </div>\n</a>");
}
function initNpm(pid, desc, type) {
    saveToFile('', 'package.json', "{\n    \"name\": \"".concat(pid, "\",\n    \"version\": \"1.0.0\",\n    \"description\": \"").concat(desc, "\",\n    \"main\": \"").concat(exports.configFolder, "/dist/home/home.js\",\n    \"scripts\": {\n      \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n    },\n    \"keywords\": [\"").concat(type, "\",\"website\",\"monagree\"],\n    \"author\": \"").concat(getDevSC(), "\",\n    \"license\": \"ISC\",\n    \"dependencies\": {\n    }\n  }\n  "));
}
exports.initNpm = initNpm;
var loginMan = /** @class */ (function () {
    function loginMan() {
    }
    loginMan.prototype.prepare = function (finise) {
        var _this = this;
        (0, firehelper_1.getACT)(function (ok, token) {
            if (ok) {
                _this.accessToken = token;
            }
            finise(ok);
        });
    };
    loginMan.prototype.getStatus = function () {
    };
    return loginMan;
}());
exports.loginMan = loginMan;
var deployMan = /** @class */ (function () {
    function deployMan(cfg) {
        this.branchName = 'gh-pages';
        this.repoName = cfg.id;
        this.owner = getGitUN();
        this.time = Date.now().toString();
        this.baseFolder = path_1.default.join(process.cwd(), exports.configFolder, 'dist');
        this.git = (0, simple_git_1.default)({
            baseDir: this.baseFolder,
        });
    }
    deployMan.prototype.prepare = function (finise) {
        var _this = this;
        (0, firehelper_1.getACT)(function (ok, token) {
            if (ok) {
                _this.accessToken = token;
            }
            finise(ok);
        });
    };
    deployMan.prototype.setGitToken = function (tkn, u_name, finise) {
        var fMan = new firehelper_1.fireMan();
        fMan.setFS("profiles/".concat(getDevId(), "/tkns/git"), {
            t: tkn,
            u: u_name
        }, function (task) {
            if (task._success) {
                saveSP('gtoken' + getDevId(), tkn);
                saveSP('gun' + getDevId(), u_name);
                finise(true);
            }
            else {
                finise(false);
            }
        });
    };
    deployMan.prototype.createDesign = function (cfg, finise) {
        var fMan = new firehelper_1.fireMan();
        fMan.setFS("profiles/".concat(getDevId(), "/designs/").concat(cfg.id), {
            t: cfg.title,
            d: cfg.desc,
            a: getDevId(),
            p: cfg.class == '  premium' ? 1 : 0,
            e: cfg.c1.startsWith('e') ? 1 : 0,
            h: 0,
            l: this.time,
            c: cfg.c3
        }, function (task) {
            finise(task._success);
        });
    };
    deployMan.prototype.uploadFile = function (fileName, bid) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, noExt, storageUrl, fileContent, headers, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = path_1.default.join(process.cwd(), exports.configFolder, 'dist', bid, fileName);
                        noExt = fileName.split('.')[0];
                        storageUrl = "https://firebasestorage.googleapis.com/v0/b/monagree-felix/o/monagree%2F".concat(noExt);
                        console.log(storageUrl);
                        fileContent = fs_1.default.readFileSync(filePath);
                        headers = {
                            'Authorization': "Bearer ".concat(this.accessToken),
                            'Content-Type': 'application/octet-stream', // Set the content type based on your file type
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.post(storageUrl, fileContent, { headers: headers })];
                    case 2:
                        response = _a.sent();
                        console.log('File uploaded successfully:', response.data);
                        return [2 /*return*/, true];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error uploading file:', error_1.response ? error_1.response.data : error_1.message);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    deployMan.prototype.isGitAvailable = function (finise) {
        (0, simple_git_1.default)().version().then(function (v) {
            finise(v.installed);
        }).catch(function (e) {
            console.error(e);
            finise(false);
        });
    };
    deployMan.prototype._proceedGC = function (cfg, finise) {
        var _this = this;
        if (getSP('gitconfiged', true).length > 0) {
            finise(true);
            return;
        }
        inquire([
            {
                type: 'input',
                name: 'name',
                message: 'Enter developer name: ',
                validate: exports.vv
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter email: ',
                validate: exports.vv
            }
        ], function (ok, ans) { return __awaiter(_this, void 0, void 0, function () {
            var configError_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!ok) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.git.addConfig('user.name', ans.name)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.git.addConfig('user.email', ans.email)];
                    case 3:
                        _a.sent();
                        saveToFile(path_1.default.join(exports.configFolder, 'dist'), 'README.md', "# ".concat(cfg.title, "\n### by ").concat(ans.name, "\n\n## DO NOT EDIT THIS REPO\n\nThis repo was generated by the Monagree CLI tool to host your design pending when it will have its first purchase (after which it will be permanently moved to Monagree's global CDN).  Any change to this repo may invalidate your design on Monagree.  To make changes, use the CLI tool."));
                        saveSP('gitconfiged', 'SET', true);
                        finise(true);
                        return [3 /*break*/, 5];
                    case 4:
                        configError_1 = _a.sent();
                        console.error('Error setting Git configuration:', configError_1.message);
                        finise(false);
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        finise(false);
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); });
    };
    deployMan.prototype.configureGit = function (cfg, finise) {
        var _this = this;
        this.git.checkIsRepo().then(function (ok) {
            if (ok) {
                _this._proceedGC(cfg, finise);
            }
            else {
                _this.git.init().then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                    var octokit, repoInfoResponse, ok_1, e_1, repoFullName, repoUrl, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 9, , 10]);
                                octokit = new octokit_1.Octokit({
                                    auth: getGitToken(),
                                });
                                return [4 /*yield*/, this.git.checkoutLocalBranch(this.branchName)];
                            case 1:
                                _a.sent();
                                repoInfoResponse = void 0;
                                ok_1 = true;
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                return [4 /*yield*/, octokit.rest.repos.get({
                                        owner: this.owner,
                                        repo: this.repoName,
                                    })];
                            case 3:
                                repoInfoResponse = _a.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                e_1 = _a.sent();
                                ok_1 = e_1.status == 404;
                                return [3 /*break*/, 5];
                            case 5:
                                if (!ok_1) {
                                    return [2 /*return*/, false];
                                }
                                if (!!repoInfoResponse) return [3 /*break*/, 7];
                                return [4 /*yield*/, octokit.rest.repos.createForAuthenticatedUser({
                                        name: this.repoName,
                                        private: false,
                                        description: cfg.title + ' | ' + cfg.desc,
                                    })];
                            case 6:
                                repoInfoResponse = _a.sent();
                                _a.label = 7;
                            case 7:
                                repoFullName = repoInfoResponse.data.full_name;
                                repoUrl = repoInfoResponse.data.html_url;
                                // Add GitHub repository as a remote
                                return [4 /*yield*/, this.git.addRemote('origin', repoUrl)];
                            case 8:
                                // Add GitHub repository as a remote
                                _a.sent();
                                this._proceedGC(cfg, finise);
                                return [3 /*break*/, 10];
                            case 9:
                                error_2 = _a.sent();
                                deleteFolder(path_1.default.join(exports.configFolder, 'dist', '.git'));
                                console.error(error_2);
                                finise(false);
                                return [3 /*break*/, 10];
                            case 10: return [2 /*return*/];
                        }
                    });
                }); }).catch(function (e) {
                    console.error(e);
                    finise(false);
                });
            }
        }).catch(function (e) {
            console.error(e);
            finise(false);
        });
    };
    deployMan.prototype.prepGit = function (bid) {
        return __awaiter(this, void 0, void 0, function () {
            var files, _i, files_1, file, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, listFiles(path_1.default.join(this.baseFolder, bid))];
                    case 1:
                        files = _a.sent();
                        _i = 0, files_1 = files;
                        _a.label = 2;
                    case 2:
                        if (!(_i < files_1.length)) return [3 /*break*/, 5];
                        file = files_1[_i];
                        return [4 /*yield*/, this.addFile(path_1.default.join(bid, file))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, true];
                    case 6:
                        error_3 = _a.sent();
                        console.error('Error:c', error_3.message);
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    deployMan.prototype.addFile = function (filepath, dontThrow) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.git.add(filepath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_4 = _a.sent();
                        if (dontThrow) {
                            console.error('Error:c', error_4.message);
                            return [2 /*return*/, false];
                        }
                        else {
                            throw error_4;
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    deployMan.prototype.commitAndPush = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.git.commit(this.time)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.git.push('origin', this.branchName)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        error_5 = _a.sent();
                        console.error('Error:', error_5.message);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return deployMan;
}());
exports.deployMan = deployMan;
function listFiles(folder) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                return [2 /*return*/, fs_1.default.readdirSync(folder)];
            }
            catch (e) {
                throw e;
            }
            return [2 /*return*/];
        });
    });
}
function doBranch(bid, desc, fold, lang, finise) {
    var rdm = "DONT EDIT THIS FILE\n\nbranch_id:".concat(bid, "\nbranch_desc:").concat(desc, "\n\n  This is a branch in your design. It represents a new path on the website (eg monagree.com/designid/branchid).\n\n\n\n  CODING GUIDELINES:\n\n\n  - The index.").concat(lang, " file is your main design (entry point)\n\n  - You can create as many html & css files as you need and import them into your ").concat(lang, " file as components\n\n  - The main website should be injected into an element with id -monapp- see index.").concat(lang, " for more info\n\n  - Run `monagree branch your-branch-id` to create a new branch\n\n\n  https://developers.monagree.com/docs/cli/branch");
    saveToFile("".concat(fold, "/").concat(bid), 'readme.md', rdm);
    saveToFile("".concat(fold, "/").concat(bid), 'index.html', "<!DOCTYPE html>\n  <html lang=\"en\">\n      <head>\n          <meta charset=\"UTF-8\">\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n          <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Pacifico&display=swap\">\n          <title>That Business Name</title>\n          <link rel=\"stylesheet\" href=\"index.css\">\n      </head>\n      <body>\n          <div class=\"ctr\">\n              <img class=\"devicon\" src=\"https://developers.monagree.com/static/media/dev.7316fd80843a79e423ae.png\" alt=\"Monagree Developers\">\n              <h1>We Create Magic</h1>\n              <p>Start that awesome design. The world is waiting</p>\n          </div>\n          <div class=\"btmflt\">\n              <p>Monagree Developers | ".concat(bid, "</p>\n          </div>\n      </body>\n  </html>\n  "));
    saveToFile("".concat(fold, "/").concat(bid), 'index.css', "/* Some default styles */\n\n  body {\n      font-family: 'Pacifico', sans-serif;\n      margin: 0;\n      padding: 0;\n      background-color: lavender;\n  }\n  \n  h1, h2 {\n      color: blue;\n      margin: 5px;\n  }\n  \n  p {\n      color: #333;\n      margin: 5px;\n  }\n  \n  /* Custom Style */\n  .ctr{\n      width: 100vw;\n      height: 100vh;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n  }\n  \n  .devicon{\n      width: 100px;\n  }\n  \n  .btmflt{\n      position: absolute;\n      bottom: 0;\n      width: 100vw;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      margin-bottom: 30px;\n  }\n  .btmflt p{\n      color: grey;\n  }");
    saveToFile("".concat(fold, "/").concat(bid), 'index.' + lang, lang == 'ts' ? "// Import CSS files like this\n  import './index.css';\n  \n  // Import html files like this (named)\n  import landing from './index.html';\n  \n  // The main webpage is set like this (edit as you want, but id must be `monapp`)\n  const appElement = document.getElementById('monapp');\n  appElement.innerHTML = landing;\n  " : "// Import CSS files like this\n  import './index.css';\n  // Import html files like this (named)\n  import landing from './index.html';\n  //You may also import JS files\n  \n  //The main webpage is set like this (edit as you want, but id must be `monapp`)\n  const appElement = document.getElementById('monapp');\n  appElement.innerHTML = landing;");
    finise(true);
}
exports.doBranch = doBranch;
function setupTS(finise) {
    var tsCommand = 'npm install --save-dev ts-loader typings-for-css-modules-loader';
    runCmd(tsCommand, function (stg, msg) {
        if (stg == 1) {
            saveToFile('', 'tsconfig.json', "{\n        \"compilerOptions\": {\n          // ... other options\n          \"module\": \"commonjs\",\n          \"target\": \"es5\",\n          \"esModuleInterop\": true,\n          \"moduleResolution\": \"node\",\n          \"jsx\": \"react\",\n          \"typeRoots\": [\"./node_modules/@types\", \"./typings\"]\n        },\n        \"exclude\": [\"node_modules\"]\n      }\n      ");
            saveToFile('', 'html.d.ts', "declare module '*.html' {\n        const content: string;\n        export default content;\n      }");
            finise(true);
        }
        if (stg == 0) {
            finise(false);
        }
    });
}
exports.setupTS = setupTS;
