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

export class LinkShifter {

  /**
   * @param {!Object} digidipOpts
   * @param {string} merchantUrl
   * @param {!../../../src/service/viewer-impl.Viewer} viewer
   */
  constructor(digidipOpts, merchantUrl, viewer) {
    /** @private {?Object} */
    this.digidipOpts_ = digidipOpts;

    /** @private {?string} */
    this.merchantUrl_ = merchantUrl;

    /** @private {!../../../src/service/viewer-impl.Viewer} */
    this.viewer_ = viewer;
  }

  /**
   * @param {!Event} event
   */
  clickHandler(event) {
    let element = event.srcElement;
    let trimmedDomain = this.viewer_.win.document.domain
        .replace(/(www\.)?(.*)/, '$2');
    let targetHost = '';
    let targetTest = undefined;
    let parentSearch = '';
    let href = '';

    console.log('element click handler', element);
    // check if the element or a parent element of it is a link
    while (element && element.nodeName !== 'A') {
      console.log('element.nodeName', element.nodeName);
      element = element.parentNode;
    }

    console.log('element after while', element);
    console.log('event', event);
    console.log('event.srcElement', event.srcElement);
  }

  /*getDigidipUrl() {
   const ppRef = this.viewer_.getUnconfirmedReferrerUrl();
   const currUrl = this.viewer_.getResolvedViewerUrl();
  }*/
}
