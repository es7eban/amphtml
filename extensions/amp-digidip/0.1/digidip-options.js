/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {userAssert} from '../../../src/log';

const errors = {
  REQUIRED_URL_VISIT: 'the attribute url-visit is required',
};

/**
 * @param {!AmpElement} element
 * @return {!Object}
 */
export function getDigidipOptions(element) {
  return {
    urlVisit: getUrlVisit(element),
    urlWorddipWords: element.getAttribute('url-worddip-words'),
    useWorddip: element.getAttribute('use-worddip'),
    newTab: element.getAttribute('new-tab'),
    encodedXhrCredentials: element.getAttribute('encoded-xhr-credentials'),
    hostsIgnore: element.getAttribute('hosts-ignore').split('|'),
    readingWordsExclude: element.getAttribute('reading-words-exclude'),
    elementClickhandler: element.getAttribute('element-clickhandler'),
    elementClickhandlerAttribute: element.getAttribute(
        'element-clickhandler-attribute'),
    elementIgnoreAttribute: element.getAttribute('element-ignore-attribute'),
    elementIgnorePattern: element.getAttribute('element-ignore-pattern'),
    elementIgnoreConsiderParents: element.getAttribute(
        'element-ignore-consider-parents'),
  };
}

/**
 * @param {*} condition
 * @param {string} message
 */
function enforceDigipOptions(condition, message) {
  userAssert(
      condition,
      `<amp-digidip> something is wrong with option: ${message}`
  );
}

/**
 * @param {!Element} element
 * @return {string}
 */
function getUrlVisit(element) {
  const urlVisit = element.getAttribute('url-visit');
  enforceDigipOptions(urlVisit, errors.REQUIRED_URL_VISIT);

  return urlVisit;
}
