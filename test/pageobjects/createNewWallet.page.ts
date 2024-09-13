class CreateNewWalletPage {
    private phrasesTextList: string[] = [];

    get copy_btn() {
        return $('//button[text()="Copy"]');
    }

    get copiedToClipboardPopUp() {
        return $('//div[@id="notistack-snackbar"]//*[@data-testid="InfoIcon"]');
    }

    getPhraseTxt_byOrder(phaseNumber: number) {
        return $(`//p[@data-index="${phaseNumber}"]`);
    }

    get iSavedMyRecoveryPhrase_btn() {
        return $('//button[contains(text(), "I SAVED MY RECOVERY PHRASE")]');
    }

    get paste_btn() {
        return $('//button[@data-id="paste_button"]');
    }

    getphrase_input(phaseNumber: number) {
        return $(`//input[@id="mnemonic-input-${phaseNumber}"]`);
    }

    // Methods:
    async clickCopyBtn() {
        await this.copy_btn.click();
        await this.copiedToClipboardPopUp.waitForExist({ timeout: 5000 });
    }

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

    async getAllPhrasesText() {
        const textList: string[] = [];

        // Iterate through elements from 1 to 12
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
        // Get text from getAllPhrasesText list
        // const phrases = await this.getAllPhrasesText();
        
         // take one by one and add in empty fields
         for (let i = 1; i <= this.phrasesTextList.length; i++) { // change loop condition to <= phrasesTextList.length
            const inputField = await this.getphrase_input(i - 1); // Lokator za input polje
            await inputField.setValue(this.phrasesTextList[i - 1]); // Postavi vrednost
        }
        await browser.pause(5000)
    }

}

module.exports = new CreateNewWalletPage();
