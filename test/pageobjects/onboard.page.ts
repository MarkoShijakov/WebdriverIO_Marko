const { getUrlAndVerify } = require('../helpers/verifyHelpers');

class onboardPage {

    get iNeedANewWallet_btn() {
        return $('//button[@data-id="i_need_a_wallet_button"]');
    }

    get enterSolana_btn() {
        return $('//button//span[contains(text(), "Enter Solana")]');
    }


    //METHODS:

    //This method will click on I Need A New Wallet Button
    async clickIneedNewWalletBtn() {
        await this.iNeedANewWallet_btn.click();
        await getUrlAndVerify('create')
    }

    async clickEnterSolanaBtn() {
        await this.enterSolana_btn.click();
        await getUrlAndVerify('portfolio')
    }

}
module.exports = new onboardPage();