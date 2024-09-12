class CreateNewWalletPage {

    get copy_btn() {
        return $('//button[text()="Copy"]');
    }

    get copiedToClipboardPopUp() {
        return $('//div[@id="notistack-snackbar"]//*[@data-testid="InfoIcon"]')
    }

    getPhraseTxt_byOrder(phaseNumber: number) {
        return $(`//p[@data-index="${phaseNumber}"]`);
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


}

module.exports = new CreateNewWalletPage();
