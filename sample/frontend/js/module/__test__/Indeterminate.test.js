import assert from 'assert';
import Indeterminate from '../Indeterminate';

const SELECTOR = {
    ROOT: '#j-form',
    INDETERMINATE: '#j-indeterminate',
    STATE: {
        INDETERMINATE: 'is-indeterminateEnabled',
    },
};

describe('Indeterminate', () => {
    let root;
    let indeterminate;

    beforeEach(() => {
        document.body.innerHTML = `
<form id="j-form">
    <input type="checkbox" id="j-indeterminate">
</div>
`;

        root = document.querySelector(SELECTOR.ROOT);
        indeterminate = root.querySelector(SELECTOR.INDETERMINATE);
    });

    describe('init', () => {
        it('checkがonになったとき、classが付与されること', () => {
            const indeterminateInstance = new Indeterminate(root, indeterminate, SELECTOR.STATE.INDETERMINATE);

            indeterminateInstance.init();
            indeterminate.click();

            assert.ok(root.classList.contains(SELECTOR.STATE.INDETERMINATE));
        });

        it('checkがoffになったとき、classが外れること', () => {
            const indeterminateInstance = new Indeterminate(root, indeterminate, SELECTOR.STATE.INDETERMINATE);

            indeterminateInstance.init();
            indeterminate.click();

            assert.ok(root.classList.contains(SELECTOR.STATE.INDETERMINATE));

            indeterminate.click();

            assert.ok(!root.classList.contains(SELECTOR.STATE.INDETERMINATE));
        });
    });
});
