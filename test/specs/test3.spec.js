const homePage = require('../pageobjects/home.page');
const navigation = require('../helpers/navigation');
const onboardPage = require('../pageobjects/onboard.page');
const createNewWallet = require('../pageobjects/createNewWallet.page');
const portfolioPage = require('../pageobjects/portfolio.page');
const walletManagment = require('../pageobjects/walletManagement.page');
import logger from '../logger/logger';

describe('Test 3: Wallet Management and Recovery Phrases', function () {
    before(async function () {
        await navigation.openHomePage();
    });

    it('should manage recovery phrases and verify updated wallet phrases', async function () {
        logger.info('User is on Home Page and clicks on Access Wallet button');
        await homePage.clickAccessWalletBtn();

        logger.info('User clicks on "I need a new wallet" button');
        await onboardPage.clickIneedNewWalletBtn();

        logger.info('User retrieves all recovery phrases');
        await createNewWallet.getAllPhrasesText();

        logger.info('User clicks "Saved my recovery phrase" button and confirms');
        await createNewWallet.clickSavedMyRecoveryPhraseBtnAndConfirm();

        logger.info('User fills inputs with recovery phrases');
        await createNewWallet.fillInputsWithPhrases();

        logger.info('User clicks Continue button');
        await createNewWallet.clickContinueBtn();

        logger.info('Verifying user is on password page');
        await createNewWallet.verifyUserOnPasswordPage();

        logger.info('User enters password');
        await createNewWallet.enterPassword('MyPassword123%');

        logger.info('User clicks Continue button');
        await createNewWallet.clickContinueBtn();

        logger.info('Verifying wallet is ready');
        await createNewWallet.verifyWalletReady();

        logger.info('User clicks Enter Solana button');
        await onboardPage.clickEnterSolanaBtn();

        logger.info('User clicks Wallet Management button');
        await portfolioPage.clickWalletManagementBtn();

        logger.info('Verifying main wallet item is displayed');
        await expect(walletManagment.mainWallet_item).toBeDisplayed();

        logger.info('User clicks plus icon');
        await walletManagment.clickPlusIcon();

        logger.info('User clicks Manage Recovery Phrase button');
        await walletManagment.clickManageRecoveryPhraseBtn();

        logger.info('Verifying toggle is disabled for the first item');
        await walletManagment.verifyToggleDisabled(1);

        logger.info('Verifying toggle state is checked for the first item');
        await walletManagment.verifyToggleState(1, 'checked');

        logger.info('User clicks toggle button for the third item');
        await walletManagment.clickToggleBtnByOrder(3);

        logger.info('Verifying toggle state is checked for the third item');
        await walletManagment.verifyToggleState(3, 'checked');

        logger.info('User clicks toggle button for the fourth item');
        await walletManagment.clickToggleBtnByOrder(4);

        logger.info('Verifying toggle state is checked for the fourth item');
        await walletManagment.verifyToggleState(4, 'checked');

        logger.info('Retrieving checked recovery phrases list');
        const checkedPhrases = await walletManagment.getCheckedRecoveryPhrasesList();

        logger.info('User clicks Save button');
        await walletManagment.clickSaveBtn();

        logger.info('Pausing for wallet to save');
        await browser.pause(1000); //Wait for wallet (if I have time, I will add waitForElement...)

        logger.info('Retrieving all recovery phrases from My Wallet list');
        const myWalletPhrases = await walletManagment.getAllRecoveryPhrasesFromMyWalletList();

        logger.info('Verifying checked phrases match the wallet phrases');
        expect(checkedPhrases).toEqual(myWalletPhrases);
    });
});
