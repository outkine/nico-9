"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.getAll = getAll;
exports.create = create;
exports.update = update;
exports.del = del;
exports.default = _default;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function processSingle(_x) {
  return _processSingle.apply(this, arguments);
}

function _processSingle() {
  _processSingle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(promise) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return promise;

          case 2:
            result = _context.sent;
            return _context.abrupt("return", result.exists ? result.data() : null);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _processSingle.apply(this, arguments);
}

function processMultiple(_x2) {
  return _processMultiple.apply(this, arguments);
}

function _processMultiple() {
  _processMultiple = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(promise) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return promise;

          case 2:
            return _context2.abrupt("return", _context2.sent.docs);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _processMultiple.apply(this, arguments);
}

function get(_x3) {
  return _get.apply(this, arguments);
}

function _get() {
  _get = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(name) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", _defineProperty({}, name, function () {
              var _ref14 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3(_, _ref12, _ref13) {
                var id, db;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        id = _ref12.id;
                        db = _ref13.db;
                        return _context3.abrupt("return", processSingle(db.collection(name).doc(id).get()));

                      case 3:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, this);
              }));

              return function (_x4, _x5, _x6) {
                return _ref14.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _get.apply(this, arguments);
}

function getAll(name) {
  return _defineProperty({}, name + 's', function (_, args, _ref) {
    var db = _ref.db;
    return processMultiple(db.collection(name).get());
  });
}

function create(name) {
  return _defineProperty({}, 'create' + capitalize(name), function (_, _ref3, _ref4) {
    var id = _ref3.id,
        other = _objectWithoutProperties(_ref3, ["id"]);

    var db = _ref4.db;
    return db.collection(name).doc(id).set(other);
  });
}

function update(name) {
  return _defineProperty({}, 'update' + capitalize(name), function (_, _ref6, _ref7) {
    var id = _ref6.id,
        other = _objectWithoutProperties(_ref6, ["id"]);

    var db = _ref7.db;
    return db.collection(name).doc(id).update(other);
  });
}

function del(name) {
  return _defineProperty({}, 'delete' + capitalize(name), function (_, _ref9, _ref10) {
    var id = _ref9.id;
    var db = _ref10.db;
    return db.collection(name).doc(id).delete();
  });
}

function _default(db, name) {
  return {
    Query: _objectSpread({}, get(db, name), getAll(db, name)),
    Mutation: _objectSpread({}, create(db, name), update(db, name), del(db, name))
  };
}