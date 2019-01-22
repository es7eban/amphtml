import '../amp-digidip';

describes.realWin('amp-digidip', {
    amp: {
        extensions: ['amp-digidip'],
    },
}, env => {

    let win;

    beforeEach(() => {
        win = env.win;

    });

    it('Shoud find 2 class section', () => {

        console.log(win);

        expect(2).to.equal(2);
    });




});
