import assert from 'assert';
import UrlCreator from '../UrlCreator';

const url = 'http://localhost';

describe('create', () => {
    test('パラメータが?で連結されること', () => {
        const urlCreator = new UrlCreator(url, { a: 1 });

        assert.strictEqual(urlCreator.create(), `${url}?a=1`);
    });

    test('パラメータが&で連結されること', () => {
        const urlCreator = new UrlCreator(`${url}?a=1`, { b: 1 });

        assert.strictEqual(urlCreator.create(), `${url}?a=1&b=1`);
    });
});
