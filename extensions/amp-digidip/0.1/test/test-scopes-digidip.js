import '../amp-digidip';
import {getScopeElements} from "../helper";

describes.realWin('amp-digidip', {
  amp: {
    extensions: ['amp-digidip'],
  },
}, env => {

  let win;
  let doc;


  beforeEach(() => {

    win = env.win;
    doc = new DOMParser().parseFromString('<div id="scope"></div><div class="scope"></div><div class="scope"><div class="scope"></div></div>', 'text/html');

  });

  it('Shoud find html node when there are no scope options', () => {

    const scopes = getScopeElements(doc, {elementClickhandlerAttribute: '', elementClickhandler: ''});

    expect(scopes[0].localName).to.equal('html');

  });

  it('Shoud find one scope node', () => {

    const scopes = getScopeElements(doc, {elementClickhandlerAttribute: 'id', elementClickhandler: 'scope'});

    expect(Object.keys(scopes).length).to.equal(1);

  });

  it('Shoud find two scope nodes', () => {

    const scopes = getScopeElements(doc, {elementClickhandlerAttribute: 'class', elementClickhandler: 'scope'});

    expect(Object.keys(scopes).length).to.equal(2);

  });


});
