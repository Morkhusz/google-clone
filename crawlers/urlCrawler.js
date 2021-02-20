const puppeteer = require('puppeteer');

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        port: 3307,
        host: '0.0.0.0',
        user: 'root',
        password: 'secret',
        database: 'google'
    }
});

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    await page.goto('https://www.letras.mus.br/playlists/124186/');

    const site = await page.url();
    const hrefs = await page.$$eval('a', a => a.map(href => href.href));

    for (href of hrefs) {
        await knex('urls').insert({
            url: href,
            site: site
        })
        .then(res => console.log('salvou'))
        .catch(error => console.log(error))
    }

    await browser.close();

})();


