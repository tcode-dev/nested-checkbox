import SearchParams from '../SearchParams';

const EXPECTED = [
    ['layer3_cd', ['1-2-2']],
    ['layer4_cd', ['1-3-2-1', '1-3-2-3']],
];

describe('SearchParams', () => {
    describe('parse', () => {
        it('queryがobjectに変換されること', () => {
            const query = 'layer3_cd=1-2-2&layer4_cd=1-3-2-1&layer4_cd=1-3-2-3';
            const searchParams = new SearchParams(query);
            const result = searchParams.parse();

            expect(result).toEqual(EXPECTED);
        });

        it('配列のqueryがobjectに変換されること', () => {
            const query = 'layer3_cd[]=1-2-2&layer4_cd[]=1-3-2-1&layer4_cd[]=1-3-2-3';
            const searchParams = new SearchParams(query);
            const result = searchParams.parse();

            expect(result).toEqual(EXPECTED);
        });
    });
});
