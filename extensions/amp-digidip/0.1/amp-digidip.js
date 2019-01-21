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

    /** @private {?string} */
    this.merchantUrl_ = '';

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
    let list = getScopeElements(this.ampDoc_, {clickhandler_attribute:'class', element_clickhandler:'scope'});
    console.log(list);

    return this.ampDoc_.whenBodyAvailable()
        .then(() => {
          this.digidipOpts_ = getDigidipOptions(this.element);
          this.letsRockIt_();
        });
  }

  /**
   * @private
   */
  letsRockIt_() {
    // const rootNode = this.ampDoc_.getRootNode();

    /*if (this.digidipOpts_.elementClickhandler !== ''
        && this.digidipOpts_.elementClickhandlerAttribute !== '') {
      let tmpRootNodes = false;
      let scope = '';

      switch (this.digidipOpts_.elementClickhandlerAttribute) {
        case 'id':
          scope = '#';
          tmpRootNodes = rootNode.querySelector;
      }
    }*/

    const doc = this.ampDoc_.getRootNode();

    console.log(doc);

    const list = doc.querySelectorAll('a');

    this.merchantUrl_ = 'http://amazon.de/category?pid=777';
    this.shifter_ = new LinkShifter(
        this.merchantUrl_,
        this.viewer_,
        this.ampDoc_);

    list.forEach(anchor => {
      anchor.addEventListener('click', event => {
        this.shifter_.clickHandler(event);
      });

      anchor.addEventListener('contextmenu', event => {
        this.shifter_.clickHandler(event);
      });
    });

  }

  /** @override */
  isLayoutSupported() {
    return true;
  }
}

AMP.extension('amp-digidip', '0.1', AMP => {
  AMP.registerElement('amp-digidip', AmpDigidip);
});
