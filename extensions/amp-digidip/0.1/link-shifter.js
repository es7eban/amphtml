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
   * @param {!AmpElement} ampElement
   * @param {!../../../src/service/viewer-impl.Viewer} viewer
   * @param {!../../../src/service/ampdoc-impl.AmpDoc} ampDoc
   */
  constructor(ampElement, viewer, ampDoc) {
    /** @private {?../../../src/service/viewer-impl.Viewer} */
    this.viewer_ = viewer;

    /** @private {?../../../src/service/ampdoc-impl.AmpDoc} */
    this.ampDoc_ = ampDoc;

    /** @private {?Event} */
    this.event_ = null;

    /** @private {?Object} */
    this.digidipOpts_ = getDigidipOptions(ampElement);

    /** @private {?RegExp} */
    this.regexDomainUrl_ = /^https?:\/\/(www\.)?([^\/:]*)(:\d+)?(\/.*)?$/;
  }

  /**
   * @param {!Event} event
   */
  clickHandler(event) {
    this.event_ = event;
    let htmlElement = event.srcElement;
    const trimmedDomain = this.viewer_.win.document.domain
        .replace(/(www\.)?(.*)/, '$2');

    // check if the element or a parent element of it is a link in case we got
    // a element that is child of the link element that we need
    while (htmlElement && htmlElement.nodeName !== 'A') {
      htmlElement = htmlElement.parentNode;
    }

    // if we could not find a valid link element, there's nothing to do
    if (!htmlElement) {
      return;
    }

    // check if there is a ignore_attribute and and ignore_pattern defined
    // and check if the current element or it's parent has it
    if (this.checkIsIgnore_(htmlElement)) {
      return;
    }

    if (this.wasShifted_(htmlElement, trimmedDomain)) {
      return;
    }

    if (this.isOnBlackList_(htmlElement)) {
      return;
    }

    this.getDigidipUrl(htmlElement);
  }

  /**
   * @param {!Element} htmlElement
   */
  checkIsIgnore_(htmlElement) {
    const isIgnore = Boolean(
        this.digidipOpts_.elementIgnoreAttribute !== '' &&
        this.digidipOpts_.elementIgnorePattern !== '');

    if (!isIgnore) {
      return false;
    }

    if (this.digidipOpts_.elementIgnoreConsiderParents === '1') {
      const rootNode = this.ampDoc_.getRootNode();
      let parentSearch = htmlElement;

      while (parentSearch && rootNode.filters(subItem => {
        return subItem === parentSearch;
      })) {
        if (this.hasPassCondition_(parentSearch)) {
          return true;
        }
        parentSearch = parentSearch.parentNode;
      }
    } else {
      if (this.hasPassCondition_(htmlElement)) {
        return true;
      }
    }

    return false;
  }

  /**
   * @param {!Element} htmlElement
   */
  hasPassCondition_(htmlElement) {
    let attributeValue = null;

    if (htmlElement.hasAttribute(this.digidipOpts_.elementIgnoreAttribute)) {
      attributeValue = htmlElement.getAttribute(
          this.digidipOpts_.elementIgnoreAttribute);

      const searchAttr = attributeValue.search(
          this.digidipOpts_.elementIgnorePattern);

      if (searchAttr !== -1) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param {} htmlElement
   * @param {string} trimmedDomain
   * @returns {boolean}
   * @private
   */
  wasShifted_(htmlElement, trimmedDomain) {
    const href = htmlElement.getAttribute('href');

    if (!(href && this.regexDomainUrl_.test(href) &&
            RegExp.$2 !== trimmedDomain)
    ) {
      return true;
    }

    return false;
  }

  isOnBlackList_(htmlElement) {
    const href = htmlElement.getAttribute('href');
    this.regexDomainUrl_.test(href);
    const targetHost = RegExp.$2;

    if (this.digidipOpts_.hostsIgnore.length > 0) {
      const targetTest = new RegExp(
          '(' + this.digidipOpts_.hostsIgnore
              .join('|').replace(/[\.]/g, '\\$&') + ')$',
          'i');
      if (targetTest.test(targetHost)) {
        return true;
      }
    }

    return false;
  }

  getDigidipUrl(htmlElement) {
    const ppRef = this.viewer_.getUnconfirmedReferrerUrl();
    const currUrl = this.viewer_.getResolvedViewerUrl();
    const {oldValHref, oldValTarget} =
        {oldValHref: htmlElement.href, oldValTarget: htmlElement.target};

    const newHref =
        this.digidipOpts_.urlVisit +
        encodeURIComponent(htmlElement.href) +
        (htmlElement.rev ?
          ('&ref=' + encodeURIComponent(htmlElement.rev)) : ''
        ) +
        (htmlElement.getAttribute('data-ddid') ?
          ('&wd_id=' +
              encodeURIComponent(htmlElement.getAttribute('data-ddid'))) : ''
        ) +
        (ppRef ? ('&ppref=' + encodeURIComponent(ppRef)) : '') +
        (currUrl ? ('&currurl=' + encodeURIComponent(currUrl)) : '');

    htmlElement.href = newHref;

    this.viewer_.win.setTimeout(() => {
      htmlElement.href = oldValHref;
      if (oldValTarget === '') {
        htmlElement.removeAttribute('target');
      } else {
        htmlElement.target = oldValTarget;
      }
    }, ((this.event_.type === 'contextmenu') ? 15000 : 500));
  }
}
