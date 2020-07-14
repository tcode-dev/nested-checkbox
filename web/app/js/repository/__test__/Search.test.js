import axios from 'axios';
import Search from '../Search';

jest.mock('axios');

describe('Search', () => {
    describe('get', () => {
        test('検索結果が返ること', () => {
            const searchResults = { count: 12 };
            const response = { data: searchResults };
            axios.get.mockResolvedValue(response);
            const search = new Search();

            return search.get().then((data) => {
                expect(data).toEqual(searchResults);
            });
        });

        test('エラーの場合、callbackが実行されないこと', () => {
            axios.get.mockImplementation(() => Promise.reject());
            const search = new Search();
            const callback = jest.fn();

            return search
                .get()
                .then(callback)
                .catch(() => {
                    expect(callback).not.toHaveBeenCalled();
                });
        });
    });
});
