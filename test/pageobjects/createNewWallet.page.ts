const clipboardy = require('clipboardy');
const assert = require('assert');

class CreateNewWalletPage {

    get copy_btn() {
        return $('//button[text()="Copy"]');
    }

    getPhraseTxt_byOrder(phaseNumber: number) {
        return $(`//p[@data-index="${phaseNumber}"]`);
    }

    // Methods:
    async clickCopyBtn() {
        await this.copy_btn.click();
    }

    async readCopiedText() {
        const copiedText = await clipboardy.read();
        return copiedText;
    }

    async getFullRecoveryPhrase() {
        let recoveryPhrase = '';
        for (let i = 0; i < 12; i++) {
            recoveryPhrase += await this.getPhraseTxt_byOrder(i).getText() + ' ';
        }
        return recoveryPhrase.trim();
    }

    async verifyCopiedText() {
        await this.clickCopyBtn();
        const copiedText = await this.readCopiedText();
        const recoveryPhrase = await this.getFullRecoveryPhrase();
        assert.strictEqual(copiedText, recoveryPhrase, 'Copied text does not match the recovery phrase.');
    }
}

module.exports = new CreateNewWalletPage();
