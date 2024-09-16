const homePage = require('../pageobjects/home.page');
const navigation = require('../helpers/navigation');
const onboardPage = require('../pageobjects/onboard.page');
const createNewWallet = require('../pageobjects/createNewWallet.page');
const portfolioPage = require('../pageobjects/portfolio.page');
const walletManagment = require('../pageobjects/walletManagement.page');

describe('Scenario 3 test', function () {
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
        await onboardPage.clickEnterSolanaBtn();
        await portfolioPage.clickWalletManagementBtn();
        await expect(walletManagment.mainWallet_item).toBeDisplayed();
        await walletManagment.clickPlusIcon();
        await walletManagment.clickManageRecoveryPhraseBtn();
        await walletManagment.verifyToggleDisabled(1);
        await walletManagment.verifyToggleState(1, 'checked');
        await walletManagment.clickToggleBtnByOrder(3);
        await walletManagment.verifyToggleState(3, 'checked');
        await walletManagment.clickToggleBtnByOrder(4);
        await walletManagment.verifyToggleState(4, 'checked');
        const checkedPhrases = await walletManagment.getCheckedRecoveryPhrasesList();
        await walletManagment.clickSaveBtn();
        await browser.pause(1000); //Wait for wallet (if I have time, I will add waitForElement...)
        const myWalletPhrases = await walletManagment.getAllRecoveryPhrasesFromMyWalletList();
        expect(checkedPhrases).toEqual(myWalletPhrases);

    });
});
