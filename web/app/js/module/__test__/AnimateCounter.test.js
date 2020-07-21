import AnimateCounter from '../AnimateCounter';

const SELECTOR = {
    SEARCH_RESULT: '#j-searchResult',
};

describe('AnimateCounter', () => {
    let searchResult;

    beforeEach(() => {
        document.body.innerHTML = `<span id="j-searchResult">0</span>`;

        searchResult = document.querySelector(SELECTOR.SEARCH_RESULT);
    });

    describe('start', () => {
        it('アニメーション終了後、domに数値が反映されていること', (done) => {
            const count = 10;
            const animateCounter = new AnimateCounter(searchResult);

            animateCounter.start(count).then(() => {
                expect(parseInt(searchResult.textContent, 10)).toEqual(count);

                done();
            });
        });

        it('アニメーションが連続して実行された場合、過去のアニメーションがキャンセルされること', (done) => {
            const firstCount = 10;
            const secondCount = 20;
            const animateCounter = new AnimateCounter(searchResult);

            animateCounter.start(firstCount);

            animateCounter.start(secondCount).then(() => {
                expect(parseInt(searchResult.textContent, 10)).toEqual(secondCount);

                done();
            });
        });
    });
});
