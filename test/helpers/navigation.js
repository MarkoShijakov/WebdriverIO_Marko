const homePage = require('../pageobjects/home.page');

async function openHomePage() {
    await browser.url('https://solflare.com/');
    await browser.maximizeWindow();
    await homePage.accessWallet_btn.isExisting();

}

module.exports = { openHomePage };
