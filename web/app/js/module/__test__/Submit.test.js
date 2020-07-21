import Submit from '../Submit';

const SELECTOR = {
    ROOT: '#j-form',
    BUTTON: '#j-button',
};

describe('Submit', () => {
    let root;
    let button;

    beforeEach(() => {
        document.body.innerHTML = `
<form id="j-form">
    <button type="submit" id="j-button">Submit</button>
</div>
`;

        root = document.querySelector(SELECTOR.ROOT);
        button = root.querySelector(SELECTOR.BUTTON);
    });

    describe('init', () => {
        it('submitされたとき、callbackが実行されること', () => {
            const mockCallback = jest.fn();
            const submit = new Submit(root, mockCallback);

            submit.init();

            expect(mockCallback).not.toHaveBeenCalled();

            button.click();

            expect(mockCallback).toHaveBeenCalled();
        });
    });
});
