
async function getUrlAndVerify(expectedText) {
let url = await browser.getUrl()
url.includes(expectedText)
}


module.exports = { getUrlAndVerify };