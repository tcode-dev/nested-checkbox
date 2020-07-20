import ApiClient from '../ApiClient';
import nock from 'nock';
import querystring from 'querystring';

const URL = 'http://localhost';
const PATH = '/api/search';
const PARAMS = { cd: '01' };
const QUERY = querystring.stringify(PARAMS);
const URL_PATH = `${URL}${PATH}`;
const PATH_QUERY = `${PATH}?${QUERY}`;
const RESULTS = { count: 123 };

describe('ApiClient', () => {
    describe('success', () => {
        beforeEach(() => {
            nock(URL).get(PATH_QUERY).reply(200, RESULTS);
        });

        it('thenを通ること', (done) => {
            const apiClient = new ApiClient(URL_PATH);

            apiClient.get(PARAMS).then(() => {
                done();
            });
        });

        it('catchを通らないこと', (done) => {
            const apiClient = new ApiClient(URL_PATH);
            const callback = jest.fn();

            apiClient
                .get(PARAMS)
                .then(jest.fn())
                .catch(callback)
                .finally(() => {
                    expect(callback).not.toHaveBeenCalled();
                    done();
                });
        });

        it('finallyを通ること', (done) => {
            const apiClient = new ApiClient(URL_PATH);

            apiClient
                .get(PARAMS)
                .then(jest.fn())
                .finally(() => {
                    done();
                });
        });

        it('responseが返ること', (done) => {
            const apiClient = new ApiClient(URL_PATH);

            apiClient.get(PARAMS).then((data) => {
                expect(data).toEqual(RESULTS);
                done();
            });
        });
    });

    describe('fail', () => {
        beforeEach(() => {
            nock(URL).get(PATH_QUERY).reply(400);
        });

        it('thenを通らないこと', (done) => {
            const apiClient = new ApiClient(URL_PATH);
            const callback = jest.fn();

            apiClient
                .get(PARAMS)
                .then(callback)
                .catch(() => {
                    expect(callback).not.toHaveBeenCalled();
                    done();
                });
        });

        it('catchを通ること', (done) => {
            const apiClient = new ApiClient(URL_PATH);

            apiClient
                .get(PARAMS)
                .then(jest.fn())
                .catch(() => {
                    done();
                });
        });

        it('finallyを通ること', (done) => {
            const apiClient = new ApiClient(URL_PATH);

            apiClient
                .get(PARAMS)
                .then(jest.fn())
                .catch(jest.fn())
                .finally(() => {
                    done();
                });
        });
    });

    describe('cancel', () => {
        beforeEach(() => {
            nock(URL).get(PATH_QUERY).reply(200, RESULTS);
        });

        it('cancelできること', (done) => {
            const apiClient = new ApiClient(URL_PATH);
            const successCallback = jest.fn();
            const finallyCallback = jest.fn();

            apiClient.get(PARAMS).then(successCallback).finally(finallyCallback);
            apiClient.cancel();

            expect(successCallback).not.toHaveBeenCalled();
            expect(finallyCallback).not.toHaveBeenCalled();
            done();
        });

        it('apiが連続で呼ばれた場合、過去の通信がcancelされること', (done) => {
            const apiClient = new ApiClient(URL_PATH);
            const successCallback = jest.fn();
            const finallyCallback = jest.fn();

            apiClient.get(PARAMS).then(successCallback).finally(finallyCallback);

            apiClient.get(PARAMS).then(() => {
                expect(successCallback).not.toHaveBeenCalled();
                expect(finallyCallback).not.toHaveBeenCalled();
                done();
            });
        });

        it('別のインスタンスはcancelされないこと', (done) => {
            const apiClient1 = new ApiClient(URL_PATH);
            const apiClient2 = new ApiClient(URL_PATH);
            const promise = apiClient1.get(PARAMS);

            apiClient2.get(PARAMS);

            Promise.all([promise, apiClient2.get(PARAMS)]).then(([data1, data2]) => {
                expect(data1).toEqual(RESULTS);
                expect(data2).toEqual(RESULTS);
                done();
            });
        });
    });
});
