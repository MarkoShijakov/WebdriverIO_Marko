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

    //creating reusable locator
    getToggleBtn_byOrder(toggleOrder: number) {
        return $(`(//div[@data-testid="virtuoso-item-list"]//button)[${toggleOrder}]`);
    }

    get save_btn() {
        return $('//button//span[contains(text(), "Save")]')
    }

    //creating reusable locator
    getRecoveryPhraseText_byOrder(toggleOrder: number) {
        return $(`(//div[@data-testid="virtuoso-item-list"]//div[@data-index=${toggleOrder}]//span)[2]`);
    }

    //this will take total number of visible toggle buttons
    async getVisibleToggleBtnElementsNumber() {
        const visibleButtons = await $$('//div[@data-testid="virtuoso-item-list"]//button[not(contains(@style, "display: none"))]');
        return visibleButtons.length;
    }

    //creating reusable locator so I can use one locator for all wallets
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

    //verification for disabled toggle
    async verifyToggleDisabled(toggleNumber: number) {
        await expect(this.getToggleBtn_byOrder(toggleNumber)).toHaveAttribute('disabled');
    }

    //method to verify toggle state. Calling this from spec file. For checked state add 'checked'
    //also add toggle number
    async verifyToggleState(toggleNumber: number, state: string) {
        await expect(this.getToggleBtn_byOrder(toggleNumber)).toHaveAttribute('data-state', state);
    }

    //this will click on toggle button by toggle number
    async clickToggleBtnByOrder(toggleNumber: number) {
        await this.getToggleBtn_byOrder(toggleNumber).click();

    }

    async clickSaveBtn() {
        await this.save_btn.click();
    }

    //this will get recovery phrase text from reusable toggle by number
    async getRecoveryPhraseText(toggleOrder: number) {
        const text = await this.getRecoveryPhraseText_byOrder(toggleOrder).getText();
        return text
    }

    //method that will iterate through the checked toggle elements and will store phrase text in list
    async getCheckedRecoveryPhrasesList() {
        const checkedPhrases = [];
        const totalButtons = await this.getVisibleToggleBtnElementsNumber();
        console.log('total number of elements is: ' + totalButtons) //just for user to see the number of total elements. Must be the same as visible elements in previous page
        for (let i = 1; i <= totalButtons; i++) {

            const toggleState = await this.getToggleBtn_byOrder(i).getAttribute('data-state');

            if (toggleState === 'checked') { //if element contains checked, go inside and store text in list
                const text = await this.getRecoveryPhraseText(i - 1);  //this element is using index (from 0) and because of that we need -1
                checkedPhrases.push(text); //push test into the list
            }

        }
        console.log('Checked phrase list is: ' + checkedPhrases)  //just for user to see the list
        return checkedPhrases; //return list
    }

    //reusable method to get phrase from specific wallet
    async getRecoveryPhraseTextFromMyWallet(walletNumber: number) {
        const text = await this.getRecoveryPhraseTextFromMyWallet_byOrder(walletNumber).getText();
        return text
    }

    //get number of total phrases in wallets (basically total number of wallets)
    async getTotalRecoveryPhrasesElementsFromMyWallet() {
        const items = await $$('//div[@data-id="section-title"]/following-sibling::div[1]//span[contains(text(), "Wallet")]/ancestor::div[1]/following-sibling::div[1]//span');
        return items.length;
    }

    //this method will iterate through all walets phrases and will add them in list to compare later with checked recovery phrases list
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