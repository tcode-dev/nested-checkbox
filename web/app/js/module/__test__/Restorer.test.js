import Restorer from '../Restorer';

const SELECTOR = {
    ROOT: '#j-root',
};

describe('Restorer', () => {
    let root;

    beforeEach(() => {
        document.body.innerHTML = `
<ul id="j-root">
    <li>
        <input type="checkbox" name="layer1_cd" value="1">
        <ul>
            <li>
                <input type="checkbox" name="layer2_cd" value="1-1">
            </li>
            <li>
                <input type="checkbox" name="layer2_cd" value="1-2">
                <ul>
                    <li>
                        <input type="checkbox" name="layer3_cd" value="1-2-1">
                    </li>
                    <li>
                        <input type="checkbox" name="layer3_cd" value="1-2-2">
                    </li>
                </ul>
            </li>
        </ul>
    </li>
</ul>
`;

        root = document.querySelector(SELECTOR.ROOT);
    });

    describe('restore', () => {
        test('指定したパラメータのdomが復元されること', () => {
            const checkbox = root.querySelector(`[name="layer1_cd"][value="1"]`);
            const params = [['layer1_cd', ['1']]];
            const restorer = new Restorer(root, params);

            restorer.restore();

            expect(checkbox.checked).toEqual(true);
        });

        test('指定したパラメータが複数ある場合、domが複数復元されること', () => {
            const checkbox1 = root.querySelector(`[name="layer2_cd"][value="1-1"]`);
            const checkbox2 = root.querySelector(`[name="layer3_cd"][value="1-2-2"]`);
            const params = [
                ['layer2_cd', ['1-1']],
                ['layer3_cd', ['1-2-2']],
            ];
            const restorer = new Restorer(root, params);

            restorer.restore();

            expect(checkbox1.checked).toEqual(true);
            expect(checkbox2.checked).toEqual(true);
        });

        test('domが復元されたときにイベントが発火すること', () => {
            const checkbox = root.querySelector(`[name="layer1_cd"][value="1"]`);
            const params = [['layer1_cd', ['1']]];
            const restorer = new Restorer(root, params);

            checkbox.addEventListener('change', (e) => {
                expect(e.target.checked).toEqual(true);
            });

            restorer.restore();
        });

        test('指定したパラメータが存在しない場合domが復元されないこと', () => {
            const params = [['layer1_cd', ['0']]];
            const restorer = new Restorer(root, params);

            restorer.restore();

            const checkbox = root.querySelector(`:checked`);

            expect(checkbox).toEqual(null);
        });

        test('空のパラメータを渡された場合domが復元されないこと', () => {
            const restorer = new Restorer(root, []);

            restorer.restore();

            const checkbox = root.querySelector(`:checked`);

            expect(checkbox).toEqual(null);
        });
    });
});
