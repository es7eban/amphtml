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

import {LinkShifter} from './link-shifter';
import {Services} from '../../../src/services';
import {getDigidipOptions} from './digidip-options';
import {getScopeElements} from "../helper";

export class AmpDigidip extends AMP.BaseElement {

  /** @param {!AmpElement} element */
  constructor(element) {
    super(element);

    /** @private {?string} */
    this.href_ = '';

    /** @private {?../../../src/service/xhr-impl.Xhr} */
    this.xhr_ = null;

    /** @private {?../../../src/service/ampdoc-impl.AmpDoc} */
    this.ampDoc_ = null;

    /** @private {?../../../src/service/viewer-impl.Viewer} */
    this.viewer_ = null;

    /** @private {?../../../src/service/document-info-impl.DocumentInfoDef} */
    this.docInfo_ = null;

    /* @private {?./link-shifter} */
    this.shifter_ = null;

    /** @private {?Object} */
    this.digidipOpts_ = {};
  }

  /** @override */
  buildCallback() {
    this.xhr_ = Services.xhrFor(this.win);
    this.ampDoc_ = this.getAmpDoc();
    this.viewer_ = Services.viewerForDoc(this.ampDoc_);
    this.docInfo_ = Services.documentInfoForDoc(this.ampDoc_);

    //testing
    let list = getScopeElements(this.ampDoc_, {clickhandler_attribute:'class', element_clickhandler:'scopes'});
    console.log(typeof list);

    return this.ampDoc_.whenBodyAvailable()
        .then(() => this.viewer_.getReferrerUrl())
        .then(referrerUrl => {
          this.digidipOpts_ = getDigidipOptions(this.element, referrerUrl);
          this.letsRockIt_();
        });
  }

  /**
   * @private
   */
  letsRockIt_() {
    this.href_ = 'http://amazon.de/category?pid=777';
    this.shifter_ = new LinkShifter(this.digidipOpts_, this.href_);
  }

  /** @override */
  isLayoutSupported() {
    return true;
  }
}

AMP.extension('amp-digidip', '0.1', AMP => {
  AMP.registerElement('amp-digidip', AmpDigidip);
});
