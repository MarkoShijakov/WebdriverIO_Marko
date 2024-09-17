const verifyHelpers = require('../helpers/verifyHelpers');

class CreateNewWalletPage {
    private phrasesTextList: string[] = [];  //create empty list
    private initialTabCount: number = 0;    //using this for tab number verification (for twitter part) 
    private originalTabHandle: string = ''; //created to store original tab name

    get copy_btn() {
        return $('//button[text()="Copy"]');
    }

    get copiedToClipboardPopUp() {
        return $('//div[@id="notistack-snackbar"]//*[@data-testid="InfoIcon"]');
    }

    //creating reusable locator
    getPhraseTxt_byOrder(phaseNumber: number) {
        return $(`//p[@data-index="${phaseNumber}"]`);
    }

    get iSavedMyRecoveryPhrase_btn() {
        return $('//button[contains(text(), "I SAVED MY RECOVERY PHRASE")]');
    }

    get paste_btn() {
        return $('//button[@data-id="paste_button"]');
    }

    //creating reusable locator
    getphrase_input(phaseNumber: number) {
        return $(`//input[@id="mnemonic-input-${phaseNumber}"]`);
    }

    get continue_btn() {
        return $('//button[contains(text(), "Continue")]');
    }

    get newPassword_input() {
        return $('//input[@id=":r2:"]');
    }

    get repeatPassword_input() {
        return $('//input[@id=":r3:"]');
    }

    get walletReady_txt() {
        return $('//p[contains(text(), "Your wallet is ready")]');
    }

    get followUsTwitter_btn() {
        return $('svg[data-icon="twitter"]')
    }

    // Methods:
    async clickCopyBtn() {
        await this.copy_btn.click();
        await this.copiedToClipboardPopUp.waitForExist({ timeout: 5000 });
    }

    //get text from all 12 elements with reusable locator
    async getFullRecoveryPhrase() {
        let recoveryPhrase = '';
        for (let i = 1; i < 13; i++) {
            recoveryPhrase += await this.getPhraseTxt_byOrder(i).getText() + ' ';
        }
        return recoveryPhrase.trim();
    }

    async verifyCopiedText() {
        const recoveryPhrase = await this.getFullRecoveryPhrase();
        await expect(browser).toHaveClipboardText(recoveryPhrase);
    }

    // Iterate through elements from 1 to 12 and get text
    async getAllPhrasesText() {
        const textList: string[] = [];
        for (let phaseNumber = 1; phaseNumber < 13; phaseNumber++) {
            const element = await this.getPhraseTxt_byOrder(phaseNumber);
            const text = await element.getText();
            textList.push(text);
        }
        this.phrasesTextList = textList;

        return textList;
    }

    async clickSavedMyRecoveryPhraseBtnAndConfirm() {
        await this.iSavedMyRecoveryPhrase_btn.click()
        await this.paste_btn.waitForDisplayed({ timeout: 5000 });
    }

    async fillInputsWithPhrases() {
        for (let i = 1; i <= this.phrasesTextList.length; i++) { // take one by one and add in empty fields
            const inputField = await this.getphrase_input(i - 1); // Locator for input field
            await inputField.setValue(this.phrasesTextList[i - 1]); // set value in input field
        }
    }

    async clickContinueBtn() {
        await this.continue_btn.click();
    }

    async verifyUserOnPasswordPage() {
        await this.newPassword_input.waitForExist({ timeout: 5000 });
    }

    //reusable method so we can assign password value by need so we don't need to hardcode that
    async enterPassword(password: string | number) {
        await this.newPassword_input.setValue(password);
        await this.repeatPassword_input.setValue(password);
    }

    async verifyWalletReady() {
        await this.walletReady_txt.waitForExist({ timeout: 5000 });
    }

    //method to verify new tab for twitter and to store name of original tab
    async clickFollowUsTwitterBtn() {
        this.initialTabCount = (await browser.getWindowHandles()).length; 
        this.originalTabHandle = await browser.getWindowHandle();
        await this.followUsTwitter_btn.click();
    }

    async verifyTwitterInNewTab() {
        await browser.switchWindow("https://x.com/solflare_wallet")  //this is also a verification for twitter tab. If there is no that url, test will fail
        const handlesAfterClickTwitter = await browser.getWindowHandles();  //verification for tab numbers
        return handlesAfterClickTwitter.length > this.initialTabCount; //using this for assert. In case of false, test will fail
    }

    async verifyTwitterTabClosed() {
        await browser.switchToWindow(this.originalTabHandle)
        const handlesAfterCloseTwitter = await browser.getWindowHandles();
        return handlesAfterCloseTwitter.length == this.initialTabCount; //using this for assert. In case of false, test will fail
    }

    async verifyUserIsInSollarePortfolio() {
        await expect(browser).toHaveUrl('https://solflare.com/portfolio'); //this will fail because we user will not be on that page after closing twitter
    }


}

module.exports = new CreateNewWalletPage();
