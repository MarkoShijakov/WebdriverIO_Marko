const homePage = require('../pageobjects/home.page');
const verifyHelpers = require('../helpers/verifyHelpers');

async function openHomePage() {
    await browser.url('https://solflare.com/');
    await browser.maximizeWindow();
    await homePage.accessWallet_btn.isExisting();
    await verifyHelpers.getUrlAndVerify('solflare')
}

module.exports = { openHomePage };
