import assert from 'assert';
import axios from 'axios';
import nock from 'nock';

// import http from 'http';
import ApiClient from '../ApiClient';

const baseUrl = 'http://api.client.localhost';
const path = {
    success: '/success',
    fail: '/fail'
};
const url = `${baseUrl}${path}`;
const params = {test:"123"};
const results = { status: 'success' };
const response = { data: results };
const successMock = jest.fn(() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(response);
        }, 10);
    });
});
const failMock = jest.fn(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject();
        }, 1000);
    });
});

// jest.mock('axios');
// axios.get.mockResolvedValue(response);

describe('ApiClient', () => {
    beforeEach(() => {
        nock(baseUrl)
          .get(path)
        //   .persist()
          .reply(200, {
            name: 'chick-p'
          });
      })
      afterEach(() => {
        nock.cleanAll();
      });
    describe('constructor', () => {
        test('urlがセットされること', () => {
            const apiClient = new ApiClient(url);

            assert.strictEqual(apiClient.url, url);
        });
    });

    describe('success', () => {


        test('thenを通ること', async () => {
            // axios.get.mockImplementationOnce(() => Promise.resolve(response));
            const apiClient = new ApiClient(url);

            apiClient.get(params).then((data) => {
                expect(data).toEqual(results);
            });
        });

        test('catchを通らないこと', async () => {
            // axios.get.mockImplementationOnce(() => Promise.resolve(response));
            const apiClient = new ApiClient(url);
            const callback = jest.fn();

            apiClient
                .get()
                .then(jest.fn())
                .catch(callback)
                .finally(() => {
                    expect(callback).not.toHaveBeenCalled();
                });
        });
/*
        test('finallyを通ること', async () => {
            // axios.get.mockImplementationOnce(() => Promise.resolve(response));
            const apiClient = new ApiClient(url);
            const callback = jest.fn();

            apiClient
                .get()
                .then(callback)
                .finally(() => {
                    expect(callback).toHaveBeenCalled();
                });
        });

        test('responseが返ること', async () => {
            // axios.get.mockImplementationOnce(() => Promise.resolve(response));
            const apiClient = new ApiClient(url);

            apiClient.get().then((data) => {
                expect(data).toEqual(results);
            });
        });
*/
    });
/*
    describe('fail', () => {
        test('thenを通らないこと', async () => {
            // axios.get.mockImplementationOnce(() => Promise.reject());
            const apiClient = new ApiClient(url);
            const callback = jest.fn();

            apiClient
                .get()
                .then(callback)
                .catch(() => {
                    expect(callback).not.toHaveBeenCalled();
                });
        });

        test('catchを通ること', async () => {
            // axios.get.mockImplementationOnce(() => Promise.reject());
            const apiClient = new ApiClient(url);
            const callback = jest.fn();

            apiClient
                .get()
                .then(callback)
                .catch(() => {
                    expect(callback).not.toHaveBeenCalled();
                });
        });

        test('finallyを通ること', async () => {
            // axios.get.mockImplementationOnce(() => Promise.reject());
            const apiClient = new ApiClient(url);
            const successCallback = jest.fn();
            const failCallback = jest.fn();

            apiClient
                .get()
                .then(successCallback)
                .catch(failCallback)
                .finally(() => {
                    expect(successCallback).not.toHaveBeenCalled();
                    expect(failCallback).toHaveBeenCalled();
                });
        });
    });

    describe('cancel', () => {
        test('cancelされること', async () => {
            // axios.get.mockImplementationOnce(successMock);
            const apiClient = new ApiClient(url);
            const successCallback = jest.fn();
            const finallyCallback = jest.fn();

            apiClient.get().then(successCallback).finally(finallyCallback);

            apiClient.get({a: "b"}).then(() => {
                expect(successCallback).not.toHaveBeenCalled();
                expect(finallyCallback).not.toHaveBeenCalled();
            });
        });
    });
    */
});
