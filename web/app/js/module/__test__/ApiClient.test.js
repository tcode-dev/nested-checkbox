import ApiClient from '../ApiClient';
import nock from 'nock';
import querystring from 'querystring';

const url = 'http://localhost';
const path = '/api/search';
const params = { cd: '01' };
const results = { count: 123 };
const query = querystring.stringify(params);
const urlPath = `${url}${path}`;
const pathQuery = `${path}?${query}`;

describe('ApiClient', () => {
    describe('constructor', () => {
        it('urlがセットされること', () => {
            const apiClient = new ApiClient(urlPath);

            expect(apiClient.url).toEqual(urlPath);
        });
    });

    describe('success', () => {
        beforeEach(() => {
            nock(url).get(pathQuery).reply(200, results);
        });

        it('thenを通ること', (done) => {
            const apiClient = new ApiClient(urlPath);

            apiClient.get(params).then(() => {
                done();
            });
        });

        it('catchを通らないこと', (done) => {
            const apiClient = new ApiClient(urlPath);
            const callback = jest.fn();

            apiClient
                .get(params)
                .then(jest.fn())
                .catch(callback)
                .finally(() => {
                    expect(callback).not.toHaveBeenCalled();
                    done();
                });
        });

        it('finallyを通ること', (done) => {
            const apiClient = new ApiClient(urlPath);

            apiClient
                .get(params)
                .then(jest.fn())
                .finally(() => {
                    done();
                });
        });

        it('responseが返ること', (done) => {
            const apiClient = new ApiClient(urlPath);

            apiClient.get(params).then((data) => {
                expect(data).toEqual(results);
                done();
            });
        });
    });

    describe('fail', () => {
        beforeEach(() => {
            nock(url).get(pathQuery).reply(400);
        });

        it('thenを通らないこと', (done) => {
            const apiClient = new ApiClient(urlPath);
            const callback = jest.fn();

            return apiClient
                .get(params)
                .then(callback)
                .catch(() => {
                    expect(callback).not.toHaveBeenCalled();
                    done();
                });
        });

        it('catchを通ること', (done) => {
            const apiClient = new ApiClient(urlPath);

            apiClient
                .get(params)
                .then(jest.fn())
                .catch(() => {
                    done();
                });
        });

        it('finallyを通ること', (done) => {
            const apiClient = new ApiClient(urlPath);

            apiClient
                .get(params)
                .then(jest.fn())
                .catch(jest.fn())
                .finally(() => {
                    done();
                });
        });
    });

    describe('cancel', () => {
        beforeEach(() => {
            nock(url).get(pathQuery).reply(200, results);
        });

        it('cancelできること', (done) => {
            const apiClient = new ApiClient(urlPath);
            const successCallback = jest.fn();
            const finallyCallback = jest.fn();

            apiClient.get(params).then(successCallback).finally(finallyCallback);
            apiClient.cancel();

            expect(successCallback).not.toHaveBeenCalled();
            expect(finallyCallback).not.toHaveBeenCalled();
            done();
        });

        it('apiが連続で呼ばれた場合、過去の通信がcancelされること', (done) => {
            const apiClient = new ApiClient(urlPath);
            const successCallback = jest.fn();
            const finallyCallback = jest.fn();

            apiClient.get(params).then(successCallback).finally(finallyCallback);

            apiClient.get(params).then(() => {
                expect(successCallback).not.toHaveBeenCalled();
                expect(finallyCallback).not.toHaveBeenCalled();
                done();
            });
        });
    });
});
