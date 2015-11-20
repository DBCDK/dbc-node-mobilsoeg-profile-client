'use strict';

/**
 * @file
 * Client to handle interaction with the MobilSøg part of the DBC Profile Service
 *
 * @see http://profile-i01.dbc.dk:3001/explorer
 */

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.saveLike = saveLike;
exports.removeLike = removeLike;
exports.updateLike = updateLike;
exports.findMobilSoegProfile = findMobilSoegProfile;
exports.init = init;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var endpoint = null;

/**
 * Save a like on a users profile
 *
 * @param {object }params
 * @return {Promise}
 */

function saveLike(params) {
  var mobilSoegProfileId = params.mobilSoegProfileId;
  var item_id = params.item_id;
  var value = params.value;

  return new Promise(function (resolve) {
    var url = endpoint + 'api/MobilSoegProfiles/' + mobilSoegProfileId + '/likes';
    _request2['default'].post({
      url: url,
      form: {
        item_id: item_id,
        value: value
      }
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Remove a like on a users profile
 *
 * @param {object} params
 * @return {Promise}
 */

function removeLike(params) {
  var mobilSoegProfileId = params.mobilSoegProfileId;
  var id = params.id;

  return new Promise(function (resolve) {
    var url = endpoint + 'api/MobilSoegProfiles/' + mobilSoegProfileId + '/likes/' + id;
    _request2['default'].del({
      url: url,
      form: {}
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Update a like on a users profile
 *
 * @param {object} params
 * @return {Promise}
 */

function updateLike(params) {
  var mobilSoegProfileId = params.mobilSoegProfileId;
  var id = params.id;
  var value = params.value;

  return new Promise(function (resolve) {
    var url = endpoint + 'api/MobilSoegProfiles/' + mobilSoegProfileId + '/likes/' + id;
    _request2['default'].put({
      url: url,
      form: {
        value: value
      }
    }, function (err, httpResponse) {
      resolve(httpResponse);
    });
  });
}

/**
 * Requests a specific user profile from the profile service.
 * @param {{agencyid: string, loanerid: string}} params
 *
 * @see http://profile-i01.dbc.dk:3001/explorer/#!/MobilSoegProfiles/findMobilSoegProfile
 */

function findMobilSoegProfile(params) {
  var loanerid = params.loanerid;
  var agencyid = params.agencyid;

  var url = endpoint + 'api/MobilSoegProfiles/findMobilSoegProfile';

  return new Promise(function (resolve, reject) {
    _request2['default'].get({
      url: url,
      json: {
        agencyid: agencyid,
        loanerid: loanerid
      }
    }, function (err, httpResponse) {
      if (err) {
        reject({ err: err, httpResponse: httpResponse });
      } else {
        resolve(httpResponse);
      }
    });
  });
}

/**
 * Setting the necessary paramerters for the client to be usable.
 * The endpoint is only set if endpoint is null to allow setting it through
 * environment variables.
 *
 * @param {Object} config Config object with the necessary parameters to use
 * the webservice
 */

function init() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

  if (!config || !config.endpoint) {
    throw new Error('Expected config object but got null or no endpoint provided');
  }
  endpoint = config.endpoint;
}

var METHODS = {
  findMobilSoegProfile: findMobilSoegProfile,
  removeLike: removeLike,
  saveLike: saveLike,
  updateLike: updateLike
};
exports.METHODS = METHODS;