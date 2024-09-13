const homePage = require('../pageobjects/home.page');
const navigation = require('../helpers/navigation');
const onboardPage = require('../pageobjects/onboard.page');
const createNewWallet = require('../pageobjects/createNewWallet.page');

describe('Scenario 2 test', function () {
    before(async function () {
        await navigation.openHomePage();
    });

    it('First step', async function () {
        await homePage.clickAccessWalletBtn();
        await onboardPage.clickIneedNewWalletBtn();
        await createNewWallet.getAllPhrasesText();
        await createNewWallet.clickSavedMyRecoveryPhraseBtnAndConfirm()
        await createNewWallet.fillInputsWithPhrases()


    });
});
