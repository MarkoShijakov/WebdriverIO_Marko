const homePage = require('../pageobjects/home.page');
const navigation = require('../helpers/navigation');
const onboardPage = require('../pageobjects/onboard.page');
const createNewWallet = require('../pageobjects/createNewWallet.page');
const verifyHelpers = require('../helpers/verifyHelpers');
import logger from '../logger/logger';

describe('Test 2: Wallet Setup and Twitter Verification', function () {
    before(async function () {
        await navigation.openHomePage();
    });

    it('should complete wallet setup, verify Twitter profile opens and returns to portfolio', async function () {
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

        logger.info('User clicks Follow Us on Twitter button');
        await createNewWallet.clickFollowUsTwitterBtn();

        logger.info('Verifying Twitter profile opens in a new tab');
        await createNewWallet.verifyTwitterInNewTab();

        logger.info('Closing Twitter tab');
        await browser.closeWindow();

        logger.info('Verifying Twitter tab is closed');
        await createNewWallet.verifyTwitterTabClosed();

        logger.info('Verifying user is redirected to portfolio page');
        await verifyHelpers.getUrlAndVerify('solflare.com/portfolio');
    });
});
