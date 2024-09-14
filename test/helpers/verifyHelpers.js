
async function getUrlAndVerify(expectedText) {
let url = await browser.getUrl()
await expect(url).toContain(expectedText);
}

module.exports = { getUrlAndVerify };