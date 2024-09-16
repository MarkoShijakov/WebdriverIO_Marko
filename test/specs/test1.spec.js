const homePage = require('../pageobjects/home.page');
const navigation = require('../helpers/navigation');
const onboardPage = require('../pageobjects/onboard.page');
const createNewWallet = require('../pageobjects/createNewWallet.page');
import logger from '../logger/logger';

describe('Test 1: Copy Recovery Phrase Functionality', function () {
    before(async function () {
        await navigation.openHomePage();
    });

    it('should copy the recovery phrase and verify it matches the displayed text', async function () {
        logger.info('User is on Home Page and clicks on Access Wallet button');
        await homePage.clickAccessWalletBtn();

        logger.info('User clicks on "I need a new wallet" button');
        await onboardPage.clickIneedNewWalletBtn();

        logger.info('User clicks Copy button to copy the recovery phrase');
        await createNewWallet.clickCopyBtn();

        logger.info('Verifying the copied text matches the displayed recovery phrase');
        await createNewWallet.verifyCopiedText();
    });
});
