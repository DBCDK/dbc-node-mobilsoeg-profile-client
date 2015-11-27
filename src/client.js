'use strict';

/**
 * @file
 * Client to handle interaction with the MobilSøg part of the DBC Profile Service
 *
 * @see http://profile-i01.dbc.dk:3001/explorer
 */

import request from 'request';

/**
 * Save a like on a users profile
 *
 * @param {object }params
 * @return {Promise}
 */
function saveLike(endpoint, params) {
  const mobilSoegProfileId = params.mobilSoegProfileId;
  const item_id = params.item_id;
  const value = params.value;

  return new Promise((resolve) => {
    const url = endpoint + 'api/MobilSoegProfiles/' + mobilSoegProfileId + '/likes';
    request.post(
      {
        url: url,
        form: {
          item_id: item_id,
          value: value
        }
      },
      (err, httpResponse) => {
        resolve(httpResponse);
      }
    );
  });
}

/**
 * Remove a like on a users profile
 *
 * @param {object} params
 * @return {Promise}
 */
function removeLike(endpoint, params) {
  const mobilSoegProfileId = params.mobilSoegProfileId;
  const id = params.id;

  return new Promise((resolve) => {
    const url = endpoint + 'api/MobilSoegProfiles/' + mobilSoegProfileId + '/likes/' + id;
    request.del(
      {
        url: url,
        form: {}
      },
      (err, httpResponse) => {
        resolve(httpResponse);
      }
    );
  });
}

/**
 * Update a like on a users profile
 *
 * @param {object} params
 * @return {Promise}
 */
function updateLike(endpoint, params) {
  const mobilSoegProfileId = params.mobilSoegProfileId;
  const id = params.id;
  const value = params.value;

  return new Promise((resolve) => {
    const url = endpoint + 'api/MobilSoegProfiles/' + mobilSoegProfileId + '/likes/' + id;
    request.put(
      {
        url: url,
        form: {
          value: value
        }
      },
      (err, httpResponse) => {
        resolve(httpResponse);
      }
    );
  });
}

/**
 * Requests a specific user profile from the profile service.
 * @param {{agencyid: string, loanerid: string}} params
 *
 * @see http://profile-i01.dbc.dk:3001/explorer/#!/MobilSoegProfiles/findMobilSoegProfile
 */
function findMobilSoegProfile(endpoint, params) {
  const {loanerid, agencyid} = params;
  const url = `${endpoint}api/MobilSoegProfiles/findMobilSoegProfile`;

  return new Promise((resolve, reject) => {
    request.get(
      {
        url: url,
        json: {
          agencyid: agencyid,
          loanerid: loanerid
        }
      },
      (err, httpResponse) => {
        if (err) {
          reject({err: err, httpResponse: httpResponse});
        }
        else {
          resolve(httpResponse);
        }
      }
    );
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
export default function MobilSoegProfileClient(config = null) {
  if (!config || !config.endpoint) {
    throw new Error('Expected config object but got null or no endpoint provided');
  }
  const endpoint = config.endpoint;

  return {
    findMobilSoegProfile: findMobilSoegProfile.bind(null, endpoint),
    removeLike: removeLike.bind(null, endpoint),
    saveLike: saveLike.bind(null, endpoint),
    updateLike: updateLike.bind(null, endpoint)
  };
}
