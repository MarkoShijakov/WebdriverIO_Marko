class portfolioPage {

    get walletManagement_btn() {
        return $('//a[@href="/settings"]/following-sibling::button');
    }

    //METHODS:

    async clickWalletManagementBtn() {
        await this.walletManagement_btn.click();
    }
}

module.exports = new portfolioPage();