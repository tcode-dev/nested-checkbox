import PageTransition from '../PageTransition';

const URL = 'http://localhost/api/search?';
const PARAMS = { cd: '01' };

describe('PageTransition', () => {
    describe('transition', () => {
        it('location.assignに文字列化されたurlが渡されること', () => {
            const pageTransition = new PageTransition(URL);
            const mock = jest.fn();
            const originalWindow = { ...window };
            const spy = jest.spyOn(global, 'window', 'get').mockImplementation(() => ({
                ...originalWindow,
                location: {
                    ...originalWindow.location,
                    assign: mock,
                },
            }));

            pageTransition.transition(PARAMS);

            expect(mock).toHaveBeenCalled();
            expect(mock).toBeCalledWith(`${URL}cd=01`);

            spy.mockRestore();
        });
    });
});
