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

import '../amp-digidip';
import {LinkShifter} from '../link-shifter';
import {Services} from '../../../../src/services';
import {mockData} from './mockData';
import helpersMaker from './test-helpers';

describes.fakeWin('amp-digidip', {
  amp: {
    extensions: ['amp-digidip'],
  },
}, env => {

  let ampDoc, viewer, ampDigidip, helpers;

  beforeEach(() => {
    ampDoc = env.ampdoc;
    viewer = Services.viewerForDoc(ampDoc);

    helpers = helpersMaker(env);
    ampDigidip = helpers.createAmpDigidip({
      'publisher-id': 'stylebudget',
    });
  });

  afterEach(() => {
    env.sandbox.restore();
  });

  describe('URL shifting', () => {
    it('Should generate digidip URL base on mock data', () => {
      for (const i in mockData) {
        const urlParams = {
          ppRef: mockData[i].ppRef,
          currUrl: mockData[i].currUrl,
        };
        const el = document.createElement('a');
        el.setAttribute('href', mockData[i].href);

        const elementDigidip = helpers.getAmpDigidipElement({
          'publisher-id': mockData[i].publisherId,
        });

        const shifter = new LinkShifter(
            elementDigidip,
            viewer,
            ampDoc
        );
        const digidipUrl = shifter.getDigidipUrl(el, urlParams);

        expect(mockData[i].finaUrl).to.equal(digidipUrl);
      }
    });

  });
});
