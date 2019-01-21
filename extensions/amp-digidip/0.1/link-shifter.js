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

import {getDigidipOptions} from './digidip-options';

export class LinkShifter {
  /**
   * @param {string} merchantUrl
   * @param {!../../../src/service/viewer-impl.Viewer} viewer
   * @param {!../../../src/service/ampdoc-impl.AmpDoc} ampDoc
   */
  constructor(merchantUrl, viewer, ampDoc) {
    /** @private {?string} */
    this.merchantUrl_ = merchantUrl;

    /** @private {?../../../src/service/viewer-impl.Viewer} */
    this.viewer_ = viewer;

    /** @private {?../../../src/service/ampdoc-impl.AmpDoc} */
    this.ampDoc_ = ampDoc;

    /** @private {?Object} */
    this.digidipOpts_ = getDigidipOptions(this.element);
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

    // check if the element or a parent element of it is a link in case we got
    // a element that is child of the link element that we need
    while (element && element.nodeName !== 'A') {
      element = element.parentNode;
    }

    // if we could not find a valid link element, there's nothing to do
    if (!element) {
      return;
    }

    // check if there is a ignore_attribute and and ignore_pattern defined
    // and check if the current element or it's parent has it
    if (this.checkIsIgnore_(element)) {
      return;
    }

    if (this.wasShifted_(element, trimmedDomain)) {
      return;
    }

    if (this.isOnBlackList_) {
      return;
    }
  }

  /**
   * @param {!Element} element
   */
  checkIsIgnore_(element) {
    const isIgnore = Boolean(
        this.digidipOpts_.elementIgnoreAttribute !== '' &&
        this.digidipOpts_.elementIgnorePattern !== '');

    if (!isIgnore) {
      return false;
    }

    if (this.digidipOpts_.elementIgnoreConsiderParents === '1') {
      const rootNode = this.ampDoc_.getRootNode();
      let parentSearch = element;

      while (parentSearch && rootNode.filters(subItem => {
        return subItem === parentSearch;
      })) {
        if (this.hasPassCondition_(parentSearch)) {
          return true;
        }
        parentSearch = parentSearch.parentNode;
      }
    } else {
      if (this.hasPassCondition_(element)) {
        return true;
      }
    }

    return false;
  }

  /**
   * @param {!Element} element
   */
  hasPassCondition_(element) {
    let attributeValue = null;

    if (element.hasAttribute(this.digidipOpts_.elementIgnoreAttribute)) {
      attributeValue = element.getAttribute(
          this.digidipOpts_.elementIgnoreAttribute);

      const searchAttr = attributeValue.search(
          this.digidipOpts_.elementIgnorePattern);

      if (searchAttr !== -1) {
        return true;
      }
    }
    return false;
  }

  wasShifted_(element, trimmedDomain) {
    const href = element.getAttribute('href');

    if (!(href && /^https?:\/\/(www\.)?([^\/:]*)(:\d+)?(\/.*)?$/.test(href) &&
            RegExp.$2 !== trimmedDomain)
    ) {
      return true;
    }
  }

  /*getDigidipUrl() {
   const ppRef = this.viewer_.getUnconfirmedReferrerUrl();
   const currUrl = this.viewer_.getResolvedViewerUrl();
  }*/
}
