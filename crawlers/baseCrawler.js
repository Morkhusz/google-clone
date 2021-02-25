const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

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
    const client = new Client({ node: 'http://elasticsearch:9200' })
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
            let content = await page.$eval('body', body => body.innerHTML);
            const $ = cheerio.load(content);
            
            if ($('script').length) {
                $('script').remove();
                console.log('removeu script')
            }

            if ($('footer').length) {
                $('footer').remove();
                console.log('removeu footer')
            }

            if ($('iframe').length) {
                $('iframe').remove();
                console.log('removeu iframes')
            }

            if ($('form').length) {
                $('form').remove();
                console.log('removeu forms')
            }
            
            content = $.html();

            client.index({
                index: 'sites',
                body: {
                    content,
                    title,
                    url: url.url
                }
            }, (err, res, status) => {
                if (res) {
                    console.log(res.body.result);
                }
                if(err) {
                    console.log({
                        error: err
                    })
                }
            })

            await page.waitForTimeout(3000);
        } catch (e) {
            console.log(e)
        }
    }

    await browser.close();

})();
