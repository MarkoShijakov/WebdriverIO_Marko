describe('Scenario 1 test', function () {

    it('First step', async function () {

        browser.url('https://www.google.com/')
        browser.pause(10000)
        await $('[name="q"]').setValue('Marko')
        browser.keys('Enter')


    })
})