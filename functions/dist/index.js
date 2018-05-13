"use strict";

require("@babel/polyfill");

var _path = _interopRequireDefault(require("path"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _apolloServerExpress = require("apollo-server-express");

var admin = _interopRequireWildcard(require("firebase-admin"));

var functions = _interopRequireWildcard(require("firebase-functions"));

var _secretFirebase = _interopRequireDefault(require("../secret-firebase"));

var _secretGoogle = _interopRequireDefault(require("../secret-google"));

var _secretTesting = _interopRequireDefault(require("../secret-testing"));

var _schema = _interopRequireDefault(require("./schema"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

admin.initializeApp({
  credential: admin.credential.cert(_secretFirebase.default),
  databaseURL: 'https://event0-portal.firebaseio.com'
});
var db = admin.firestore();
var app = (0, _express.default)();
app.use((0, _morgan.default)('tiny'));
app.use((0, _cors.default)());
app.post('/graphql', _bodyParser.default.json(),
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, id, response, json, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req.context = {};

            if (!req.get('Authorization')) {
              _context.next = 26;
              break;
            }

            token = req.get('Authorization').split(' ')[1];

            if (!(token === _secretTesting.default.token)) {
              _context.next = 7;
              break;
            }

            id = _secretTesting.default.id;
            _context.next = 20;
            break;

          case 7:
            _context.next = 9;
            return (0, _nodeFetch.default)('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + token);

          case 9:
            response = _context.sent;

            if (!(response.status !== 200)) {
              _context.next = 13;
              break;
            }

            res.status(401).json({
              error: 'Invalid token.'
            });
            return _context.abrupt("return");

          case 13:
            _context.next = 15;
            return response.json();

          case 15:
            json = _context.sent;

            if (!(json.aud !== _secretGoogle.default.web.client_id || Date.now() > json.exp * 1000 || json.error_description)) {
              _context.next = 19;
              break;
            }

            res.status(401).json({
              error: 'Invalid token.'
            });
            return _context.abrupt("return");

          case 19:
            id = json.sub;

          case 20:
            _context.next = 22;
            return db.collection('users').doc(id).get();

          case 22:
            user = _context.sent;

            if (!user.exists) {
              req.context.newUser = true;
            }

            _context.next = 28;
            break;

          case 26:
            res.status(401).json({
              error: 'Missing authorization header.'
            });
            return _context.abrupt("return");

          case 28:
            next();

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(), (0, _apolloServerExpress.graphqlExpress)(function (req) {
  return {
    context: _objectSpread({}, req.context, {
      db: db
    }),
    schema: _schema.default
  };
}));

if (process.env.NODE_ENV === 'development') {
  app.get('/graphiql', (0, _apolloServerExpress.graphiqlExpress)(function () {
    return {
      passHeader: "'Authorization': 'Bearer ".concat(_secretTesting.default.token, "'")
    };
  }));
}

if (process.env.HOT) {
  var webpack = require('webpack');

  var config = require('../../webpack.config.browser');

  var compiler = webpack(config);
  app.get('*', require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: 'minimal'
  }));
  app.get('*', require('webpack-hot-middleware')(compiler));
} else {
  app.get('*', _express.default.static(_path.default.resolve('public')));
}

function render(html) {
  return "\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <title>event0 portal</title>\n        <link rel=\"stylesheet\" href=\"main.css\">\n      </head>\n\n      <body>\n        <div id=\"app\">".concat(html, "</div>\n        <script src=\"client.bundle.js\"></script>\n      </body>\n    </html>\n  ");
}

app.get('*', function (req, res, next) {
  if (process.env.HOT) {
    res.send(render(''));
  } else {
    var App = _react.default.createFactory(require('../build/server.bundle.js').default);

    var context = {};
    var content = (0, _server.renderToString)(App({
      url: req.url,
      context: context
    }));

    switch (context.status) {
      case 302:
        return res.redirect(302, context.url);

      case 404:
        return res.status(404);
    }

    res.send(render(content));
  }
});
module.exports.server = functions.https.onRequest(app);

if (process.env.NODE_ENV === 'development') {
  app.listen(3000, function () {
    return console.log('Listening on http://localhost:3000');
  });
}