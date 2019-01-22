import '../amp-digidip';
import {getScopeElements} from "../../helper";

describes.realWin('amp-digidip', {
  amp: {
    extensions: ['amp-digidip'],
  },
}, env => {

  let win;

  beforeEach(() => {

    win = env.win;

  });

  it('Shoud find html node when there are no scope options', () => {

    let scopes = getScopeElements(env.ampdoc, {elementClickhandlerAttribute: '', elementClickhandler: ''});

    expect(scopes[0].localName).to.equal('html');

  });

  it('Shoud find one scope node', () => {

    let scopes = getScopeElements(env.ampdoc, {elementClickhandlerAttribute: 'id', elementClickhandler: 'scope'});

    expect(Object.keys(scopes).length).to.equal(1);

  });


});
