const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    await page.goto('https://www.letras.mus.br/playlists/124186/');

    const bodyHandle = await page.$('body');
    const html = await page.evaluate(body => body.innerHTML, bodyHandle);

    const header = await page.$('h1');
    const title = await page.evaluate(title => title.textContent, header);

    const response = {
        content: html,
        title
    }

    await browser.close();

    return JSON.stringify(response);
})();


