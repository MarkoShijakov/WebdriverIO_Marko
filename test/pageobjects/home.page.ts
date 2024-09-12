const onboard_page = require('../pageobjects/onboard.page');
class homePage {

    get accessWallet_btn () {
        return $('//a[text()="Access wallet"]');
    }


    //METHODS:

    //This method will click and verify Acess Wallet Button
    
    async clickAccessWalletBtn() {
        await this.accessWallet_btn.click();
        await onboard_page.accessWallet_btn.isExisting();
    }


}

module.exports = new homePage