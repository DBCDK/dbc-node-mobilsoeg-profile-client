'use strict';

/**
 * @file
 * Client to handle interaction with the MobilSøg part of the DBC Profile Service
 *
 * @see http://profile-i01.dbc.dk:3001/explorer
 */

import request from 'request';

let endpoint = null;

/**
 * Save a like on a users profile
 *
 * @param {object }params
 * @return {Promise}
 */
export function saveLike(params) {
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
export function removeLike(params) {
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
export function updateLike(params) {
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
export function findMobilSoegProfile(params) {
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
export function init(config = null) {
  if (!config || !config.endpoint) {
    throw new Error('Expected config object but got null or no endpoint provided');
  }
  endpoint = config.endpoint;
}

export const METHODS = {
  findMobilSoegProfile: findMobilSoegProfile,
  removeLike: removeLike,
  saveLike: saveLike,
  updateLike: updateLike
};
