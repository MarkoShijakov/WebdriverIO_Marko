const homePage = require('../pageobjects/home.page');

async function openHomePage() {
    await browser.url('https://solflare.com/');

    //This  will verify that user is on home page:
    await homePage.accessWallet_btn.isExisting();
}

module.exports = new openHomePage
