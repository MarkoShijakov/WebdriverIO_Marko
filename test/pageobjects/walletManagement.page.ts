class walletManagment {

    get mainWallet_item() {
        return $('//div[@role="dialog"]//span[contains(text(), "Main Wallet")]');
    }

    get addNewWallet_btn() {
        return $('//div[@data-id="page-title"]/following::button[1]')
    }

    get manageRecoveryPhrase_btn() {
        return $('//span[contains(text(), "Manage recovery phrase")]')
    }

    getToggleBtn_byOrder(toggleOrder: number) {
        return $(`(//div[@data-testid="virtuoso-item-list"]//button)[${toggleOrder}]`);
    }

    get save_btn() {
        return $('//button//span[contains(text(), "Save")]')
    }

    getRecoveryPhraseText_byOrder(toggleOrder: number) {
        return $(`(//div[@data-testid="virtuoso-item-list"]//div[@data-index=${toggleOrder}]//span)[2]`);
    }

    async getVisibleToggleBtnElementsNumber() {
        const visibleButtons = await $$('//div[@data-testid="virtuoso-item-list"]//button[not(contains(@style, "display: none"))]');
        return visibleButtons.length;
    }

    getRecoveryPhraseTextFromMyWallet_byOrder(walletNumber: number) {
        return $(`(//div[@data-id="section-title"]/following-sibling::div[1]//span[contains(text(), 'Wallet')]/ancestor::div[1]/following-sibling::div[1]//span)[${walletNumber}]`);
    }

    // METHODS:

    async clickPlusIcon() {
        await this.addNewWallet_btn.click();
    }

    async clickManageRecoveryPhraseBtn() {
        await this.manageRecoveryPhrase_btn.click();
    }

    async verifyToggleDisabled(toggleNumber: number) {
        await expect(this.getToggleBtn_byOrder(toggleNumber)).toHaveAttribute('disabled');
    }

    async verifyToggleState(toggleNumber: number, state: string) {
        await expect(this.getToggleBtn_byOrder(toggleNumber)).toHaveAttribute('data-state', state);
    }

    async clickToggleBtnByOrder(toggleNumber: number) {
        await this.getToggleBtn_byOrder(toggleNumber).click();

    }

    async clickSaveBtn() {
        await this.save_btn.click();
    }

    async getRecoveryPhraseText(toggleOrder: number) {
        const text = await this.getRecoveryPhraseText_byOrder(toggleOrder).getText();
        return text
    }

    async getCheckedRecoveryPhrasesList() {
        const checkedPhrases = [];
        const totalButtons = await this.getVisibleToggleBtnElementsNumber();
        console.log('total number of elements is: ' + totalButtons)
        for (let i = 1; i <= totalButtons; i++) {

            const toggleState = await this.getToggleBtn_byOrder(i).getAttribute('data-state');

            if (toggleState === 'checked') {
                const text = await this.getRecoveryPhraseText(i - 1);  //this element is using index (from 0)
                checkedPhrases.push(text);
            }

        }
        console.log('Checked phrase list is: ' + checkedPhrases)
        return checkedPhrases;
    }

    async getRecoveryPhraseTextFromMyWallet(walletNumber: number) {
        const text = await this.getRecoveryPhraseTextFromMyWallet_byOrder(walletNumber).getText();
        return text
    }

    async getTotalRecoveryPhrasesElementsFromMyWallet() {
        const items = await $$('//div[@data-id="section-title"]/following-sibling::div[1]//span[contains(text(), "Wallet")]/ancestor::div[1]/following-sibling::div[1]//span');
        return items.length;
    }

    async getAllRecoveryPhrasesFromMyWalletList() {
        const totalItems = await this.getTotalRecoveryPhrasesElementsFromMyWallet();
        const phrases = [];

        for (let i = 1; i <= totalItems; i++) {

            const text = await this.getRecoveryPhraseTextFromMyWallet(i);
            phrases.push(text);

        }
        console.log('My wallet phrase list is: ' + phrases)
        return phrases;
    }

 }
module.exports = new walletManagment();