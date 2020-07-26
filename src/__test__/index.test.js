import NestedCheckbox from '../';

const SELECTOR = {
    NESTED_CHECKBOX: '#j-nestedCheckbox',
    NESTED: [
        {
            GROUP: '.j-nestedCheckbox__group--layer1',
            TRIGGER: '.j-nestedCheckbox__trigger--layer1',
        },
        {
            GROUP: '.j-nestedCheckbox__group--layer2',
            TRIGGER: '.j-nestedCheckbox__trigger--layer2',
        },
        {
            GROUP: '.j-nestedCheckbox__group--layer3',
            TRIGGER: '.j-nestedCheckbox__trigger--layer3',
        },
        {
            GROUP: '.j-nestedCheckbox__group--layer4',
            TRIGGER: '.j-nestedCheckbox__trigger--layer4',
        },
    ],
};

describe('nestedCheckbox', () => {
    let root;
    let rootCheckbox;
    let allCheckbox;

    beforeEach(() => {
        document.body.innerHTML = `
<ul id="j-nestedCheckbox">
    <li class="j-nestedCheckbox__group--layer1">
        <input type="checkbox" name="layer1_cd" value="1" class="j-nestedCheckbox__trigger--layer1">
        <ul>
            <li class="j-nestedCheckbox__group--layer2">
                <input type="checkbox" name="layer2_cd" value="1-1" class="j-nestedCheckbox__trigger--layer2">
            </li>
            <li class="j-nestedCheckbox__group--layer2">
                <input type="checkbox" name="layer2_cd" value="1-2" class="j-nestedCheckbox__trigger--layer2">
                <ul>
                    <li class="j-nestedCheckbox__group--layer3">
                        <input type="checkbox" name="layer3_cd" value="1-2-1" class="j-nestedCheckbox__trigger--layer3">
                    </li>
                    <li class="j-nestedCheckbox__group--layer3">
                        <input type="checkbox" name="layer3_cd" value="1-2-2" class="j-nestedCheckbox__trigger--layer3">
                    </li>
                </ul>
            </li>
            <li class="j-nestedCheckbox__group--layer2">
                <input type="checkbox" name="layer2_cd" value="1-3" class="j-nestedCheckbox__trigger--layer2">
                <ul>
                    <li class="j-nestedCheckbox__group--layer3">
                        <input type="checkbox" name="layer3_cd" value="1-3-1" class="j-nestedCheckbox__trigger--layer3">
                    </li>
                    <li class="j-nestedCheckbox__group--layer3">
                        <input type="checkbox" name="layer3_cd" value="1-3-2" class="j-nestedCheckbox__trigger--layer3">
                        <ul>
                            <li class="j-nestedCheckbox__group--layer4">
                                <input type="checkbox" name="layer4_cd" value="1-3-2-1" class="j-nestedCheckbox__trigger--layer4">
                            </li>
                            <li class="j-nestedCheckbox__group--layer4">
                                <input type="checkbox" name="layer4_cd" value="1-3-2-2" class="j-nestedCheckbox__trigger--layer4">
                            </li>
                            <li class="j-nestedCheckbox__group--layer4">
                                <input type="checkbox" name="layer4_cd" value="1-3-2-3" class="j-nestedCheckbox__trigger--layer4">
                            </li>
                        </ul>
                    </li>
                    <li class="j-nestedCheckbox__group--layer3">
                        <input type="checkbox" name="layer3_cd" value="1-3-3" class="j-nestedCheckbox__trigger--layer3">
                    </li>
                </ul>
            </li>
        </ul>
    </li>
</ul>
`;

        root = document.querySelector(SELECTOR.NESTED_CHECKBOX);
        rootCheckbox = root.querySelector('[name="layer1_cd"]');
        allCheckbox = root.querySelectorAll(`[type="checkbox"]`);
    });

    describe('init checked', () => {
        it('最上位のチェックがonになったとき、すべてのチェックがonになること', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);

            nestedCheckbox.init();

            root.querySelector('[name="layer1_cd"]').click();
            root.querySelectorAll(`[type="checkbox"]`).forEach((checkbox) => {
                expect(checkbox.checked).toEqual(true);
            });
        });

        it('最上位のチェックがoffになったとき、すべてのチェックがoffになること', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);

            nestedCheckbox.init();
            rootCheckbox.click();

            allCheckbox.forEach((checkbox) => {
                expect(checkbox.checked).toEqual(true);
            });

            rootCheckbox.click();

            allCheckbox.forEach((checkbox) => {
                expect(checkbox.checked).toEqual(false);
            });
        });

        it('2層目のチェックがonになったとき、配下のすべてのチェックがonになること', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);

            nestedCheckbox.init();
            root.querySelector('[name="layer2_cd"][value="1-2"]').click();

            root.querySelectorAll('[name="layer3_cd"][value="^1-2-"]').forEach((checkbox) => {
                expect(checkbox.checked).toEqual(true);
            });
        });

        it('2層目のチェックがすべてonになったとき、最上位のチェックがonになること', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);

            nestedCheckbox.init();
            root.querySelectorAll('[name="layer2_cd"]').forEach((checkbox) => {
                checkbox.click();
            });

            expect(rootCheckbox.checked).toEqual(true);
        });

        it('すべてのチェックがonの状態で2層目のチェックがoffになったとき、最上位のチェックがoffになること', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);

            nestedCheckbox.init();
            rootCheckbox.click();

            expect(rootCheckbox.checked).toEqual(true);

            root.querySelector('[name="layer2_cd"][value="1-2"]').click();

            expect(rootCheckbox.checked).toEqual(false);
        });

        it('引数のdomを省略しても動作すること', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED);

            nestedCheckbox.init();

            root.querySelector('[name="layer1_cd"]').click();
            root.querySelectorAll(`[type="checkbox"]`).forEach((checkbox) => {
                expect(checkbox.checked).toEqual(true);
            });
        });
    });

    describe('init indeterminate', () => {
        it('4層目の兄弟のチェックが一つ以上on、一つ以上offの場合、先祖のindeterminateがtrueになること', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);

            nestedCheckbox.init();
            root.querySelector('[name="layer4_cd"][value="1-3-2-1"]').click();

            expect(rootCheckbox.indeterminate).toEqual(true);
            expect(root.querySelector('[name="layer2_cd"][value="1-3"]').indeterminate).toEqual(true);
            expect(root.querySelector('[name="layer3_cd"][value="1-3-2"]').indeterminate).toEqual(true);
        });

        it('4層目の兄弟のチェックがすべてonの場合、親のindeterminateがfalse、先祖のindeterminateがtrueになること', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);

            nestedCheckbox.init();
            root.querySelector('[name="layer4_cd"][value="1-3-2-1"]').click();
            root.querySelector('[name="layer4_cd"][value="1-3-2-2"]').click();
            root.querySelector('[name="layer4_cd"][value="1-3-2-3"]').click();

            expect(rootCheckbox.indeterminate).toEqual(true);
            expect(root.querySelector('[name="layer2_cd"][value="1-3"]').indeterminate).toEqual(true);
            expect(root.querySelector('[name="layer3_cd"][value="1-3-2"]').indeterminate).toEqual(false);
        });
    });

    describe('setCallback', () => {
        it('最上位のチェックがonになったとき、callbackが呼ばれること', () => {
            const mockCallback = jest.fn();
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);

            nestedCheckbox.init();
            nestedCheckbox.setCallback(mockCallback);
            rootCheckbox.click();

            expect(mockCallback).toHaveBeenCalled();
        });

        it('最下層のチェックがonになったとき、callbackが呼ばれること', () => {
            const mockCallback = jest.fn();
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);

            nestedCheckbox.init();
            nestedCheckbox.setCallback(mockCallback);
            root.querySelector('[name="layer4_cd"][value="1-3-2-1"]').click();

            expect(mockCallback).toHaveBeenCalled();
        });
    });

    describe('getParameter', () => {
        it('最上位のチェックがonのとき、最上位のパラメータのみ取得できること', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);

            nestedCheckbox.init();
            rootCheckbox.click();

            expect(nestedCheckbox.getParameter()).toEqual({ layer1_cd: ['1'] });
        });

        it('2層目のみチェックがonのとき、2層目のパラメータのみ取得できること', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);

            nestedCheckbox.init();
            root.querySelector('[name="layer2_cd"][value="1-2"]').click();

            expect(nestedCheckbox.getParameter()).toEqual({ layer2_cd: ['1-2'] });
        });

        it('2層目のチェックがoff、3層目のパラメータが複数チェックがonのとき、3層目のパラメータが複数取得できること', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);

            nestedCheckbox.init();
            root.querySelector('[name="layer3_cd"][value="1-3-1"]').click();
            root.querySelector('[name="layer3_cd"][value="1-3-2"]').click();

            expect(nestedCheckbox.getParameter()).toEqual({ layer3_cd: ['1-3-1', '1-3-2'] });
        });
    });

    describe('restore', () => {
        it('queryStringを渡してdomが復元されること', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);
            const checkbox = root.querySelector(`[name="layer1_cd"][value="1"]`);
            const queryString = 'layer1_cd=1';

            nestedCheckbox.restore(queryString);

            expect(checkbox.checked).toEqual(true);
        });

        it('queryのobjectを渡してdomが復元されること', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);
            const checkbox = root.querySelector(`[name="layer1_cd"][value="1"]`);
            const queryMap = { layer1_cd: '1' };

            nestedCheckbox.restore(queryMap);

            expect(checkbox.checked).toEqual(true);
        });

        it('指定したパラメータが複数ある場合、domが複数復元されること', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);
            const checkbox1 = root.querySelector(`[name="layer2_cd"][value="1-1"]`);
            const checkbox2 = root.querySelector(`[name="layer3_cd"][value="1-2-2"]`);
            const queryString = 'layer2_cd=1-1&layer3_cd=1-2-2';

            nestedCheckbox.restore(queryString);

            expect(checkbox1.checked).toEqual(true);
            expect(checkbox2.checked).toEqual(true);
        });

        it('配列のqueryが渡された場合domが復元されること', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);
            const checkbox1 = root.querySelector(`[name="layer3_cd"][value="1-2-2"]`);
            const checkbox2 = root.querySelector(`[name="layer4_cd"][value="1-3-2-1"]`);
            const checkbox3 = root.querySelector(`[name="layer4_cd"][value="1-3-2-3"]`);
            const queryString = 'layer3_cd[]=1-2-2&layer4_cd[]=1-3-2-1&layer4_cd[]=1-3-2-3';

            nestedCheckbox.restore(queryString);

            expect(checkbox1.checked).toEqual(true);
            expect(checkbox2.checked).toEqual(true);
            expect(checkbox3.checked).toEqual(true);
        });

        it('domが復元されたときにイベントが発火すること', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);
            const checkbox = root.querySelector(`[name="layer1_cd"][value="1"]`);
            const queryString = 'layer1_cd=1';

            checkbox.addEventListener('change', (e) => {
                expect(e.target.checked).toEqual(true);
            });

            nestedCheckbox.restore(queryString);
        });

        it('指定したパラメータが存在しない場合domが復元されないこと', () => {
            const queryString = 'layer1_cd=0';
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);

            nestedCheckbox.restore(queryString);

            const checkbox = root.querySelector(`:checked`);

            expect(checkbox).toEqual(null);
        });

        it('空文字を渡された場合domが復元されないこと', () => {
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);
            const queryString = '';

            nestedCheckbox.restore(queryString);

            const checkbox = root.querySelector(`:checked`);

            expect(checkbox).toEqual(null);
        });
    });

    describe('pauseCallback', () => {
        it('callbackが呼ばれないこと', () => {
            const mockCallback = jest.fn();
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);

            nestedCheckbox.init();
            nestedCheckbox.setCallback(mockCallback);
            nestedCheckbox.pauseCallback();
            rootCheckbox.click();

            expect(mockCallback).not.toHaveBeenCalled();
        });
    });

    describe('startCallback', () => {
        it('callbackが呼ばれること', () => {
            const mockCallback = jest.fn();
            const nestedCheckbox = new NestedCheckbox(SELECTOR.NESTED, root);

            nestedCheckbox.init();
            nestedCheckbox.setCallback(mockCallback);
            nestedCheckbox.pauseCallback();
            nestedCheckbox.startCallback();
            rootCheckbox.click();

            expect(mockCallback).toHaveBeenCalled();
        });
    });
});
