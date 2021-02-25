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
    const { Client } = require('@elastic/elasticsearch')
    const client = new Client({ node: 'http://localhost:9200' })
    const urls = await knex.select('url').from('urls');

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-gpu",
        ]
    });
    const page = await browser.newPage();

    for (url of urls) {
        try {
            await page.goto(url.url);
            const title = await page.$eval('h1', h1 => h1.textContent);
            const content = await page.$eval('body', body => body.innerHTML);

            client.index({
                index: 'sites',
                body: {
                    content,
                    title,
                    url: url.url
                }
            }, (err, res, status) => {
                console.log(res);
            })

            await page.waitForTimeout(3000);
        } catch (e) {

        }
    }

    await browser.close();

})();
