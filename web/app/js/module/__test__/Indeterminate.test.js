import assert from 'assert';
import Indeterminate from '../Indeterminate';

const SELECTOR = {
    ROOT: '#j-form',
    INDETERMINATE: '#j-indeterminate',
    STATE: {
        INDETERMINATE: 'is-indeterminateEnabled',
    },
};

let root;
let indeterminate;

describe('Indeterminate', () => {
    beforeEach(() => {
        document.body.innerHTML = `
<form id="j-form" class="form">
    <input type="checkbox" id="j-indeterminate">
</div>
`;

        root = document.querySelector(SELECTOR.ROOT);
        indeterminate = root.querySelector(SELECTOR.INDETERMINATE);
    });

    describe('init', () => {
        test('checkがonになったとき、classが付与されること', () => {
            const indeterminateInstance = new Indeterminate(root, indeterminate, SELECTOR.STATE.INDETERMINATE);

            indeterminateInstance.init();

            indeterminate.click();

            assert.ok(root.classList.contains(SELECTOR.STATE.INDETERMINATE));
        });

        test('checkがoffになったとき、classが外れること', () => {
            const indeterminateInstance = new Indeterminate(root, indeterminate, SELECTOR.STATE.INDETERMINATE);

            indeterminateInstance.init();

            indeterminate.click();

            assert.ok(root.classList.contains(SELECTOR.STATE.INDETERMINATE));

            indeterminate.click();

            assert.ok(!root.classList.contains(SELECTOR.STATE.INDETERMINATE));
        });
    });
});
