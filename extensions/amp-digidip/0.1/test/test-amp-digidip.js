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

import * as DocumentReady from '../../../../src/document-ready';
import {Services} from '../../../../src/services';
import helpersMaker from './test-helpers';

describes.fakeWin('amp-digidip', {
  amp: {
    extensions: ['amp-digidip'],
  },
}, env => {

  let ampDigidip, ampDoc, digidipOpts, helpers;

  beforeEach(() => {
    ampDoc = env.ampdoc;

    digidipOpts = {
      'publisher-id': 'mysuperblog',
    };

    helpers = helpersMaker(env);
    ampDigidip = helpers.createAmpDigidip(digidipOpts);
  });

  afterEach(() => {
    env.sandbox.restore();
  });

  describe('digidipOptions', () => {
    it('Should show an error if publisher-id is missing', () => {
      ampDigidip = helpers.createAmpDigidip();

      allowConsoleError(() =>
        expect(() => {
          ampDigidip.buildCallback();
        }).to.throw()
      );
    });

    it('Should not show any error when specifying attr publisher-id', () => {
      ampDigidip = helpers.createAmpDigidip({
        'publisher-id': 'mysuperblog',
      });
      env.sandbox
          .stub(DocumentReady, 'whenDocumentReady')
          .returns(Promise.reject());

      expect(() => {
        ampDigidip.buildCallback();
      }).to.not.throw();
    });
  });

  describe('At loading amp-digidip extension', () => {
    it('should call method letsRockIt on buildCallback', () => {
      env.sandbox
          .stub(DocumentReady, 'whenDocumentReady')
          .returns(Promise.resolve());

      env.sandbox.stub(ampDigidip, 'letsRockIt_');

      return ampDigidip.buildCallback().then(() => {
        expect(ampDigidip.letsRockIt_.calledOnce).to.be.true;
      });
    });
  });
});
