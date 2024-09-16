const homePage = require('../pageobjects/home.page');
const navigation = require('../helpers/navigation');
const onboardPage = require('../pageobjects/onboard.page');
const createNewWallet = require('../pageobjects/createNewWallet.page');

describe('Test 1: Copy Recovery Phrase Functionality', function () {
    before(async function () {
        await navigation.openHomePage();
    });

    it('should copy the recovery phrase and verify it matches the displayed text', async function () {
        await homePage.clickAccessWalletBtn();
        await onboardPage.clickIneedNewWalletBtn();
        await createNewWallet.clickCopyBtn();
        await createNewWallet.verifyCopiedText();
    });
});
