const puppeteer = require('puppeteer');

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        port: 3306,
        host: 'mysql',
        user: 'root',
        password: 'secret',
        database: 'google'
    }
});

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-gpu",
        ]
    });
    const page = await browser.newPage();
    await page.goto('https://www.letras.mus.br/playlists/124186/');

    const site = await page.$eval('body', () => window.location.host);
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

    process.exit(1);
})();

