const { getUrlAndVerify } = require('../helpers/verifyHelpers');

class onboardPage {

    get iNeedANewWallet_btn() {
        return $('//button[@data-id="i_need_a_wallet_button"]');
    }



    //METHODS:

    //This method will click on I Need A New Wallet Button
    async clickIneedNewWalletBtn() {
        await this.iNeedANewWallet_btn.click();
        await getUrlAndVerify('create')
    }

}
module.exports = new onboardPage