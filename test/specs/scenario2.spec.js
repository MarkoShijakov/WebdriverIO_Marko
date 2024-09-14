const homePage = require('../pageobjects/home.page');
const navigation = require('../helpers/navigation');
const onboardPage = require('../pageobjects/onboard.page');
const createNewWallet = require('../pageobjects/createNewWallet.page');
const verifyHelpers = require('../helpers/verifyHelpers');

describe('Scenario 2 test', function () {
    before(async function () {
        await navigation.openHomePage();
    });

    it('First step', async function () {
        await homePage.clickAccessWalletBtn();
        await onboardPage.clickIneedNewWalletBtn();
        await createNewWallet.getAllPhrasesText();
        await createNewWallet.clickSavedMyRecoveryPhraseBtnAndConfirm();
        await createNewWallet.fillInputsWithPhrases();
        await createNewWallet.clickContinueBtn();
        await createNewWallet.verifyUserOnPasswordPage()
        await createNewWallet.enterPassword('MyPassword123%')
        await createNewWallet.clickContinueBtn();
        await createNewWallet.verifyWalletReady();
        await createNewWallet.clickFollowUsTwitterBtn();
        await createNewWallet.verifyTwitterInNewTab();
        await browser.closeWindow();
        await createNewWallet.verifyTwitterTabClosed();
        await verifyHelpers.getUrlAndVerify('solflare.com/portfolio')
    });
});
