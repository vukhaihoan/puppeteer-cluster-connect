const { Cluster } = require("../dist");
const puppeteer = require("puppeteer-core"); // use puppeteer-core instead of puppeteer

(async () => {
    const cluster = await Cluster.connect({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 1,

        // provide the puppeteer-core library
        puppeteer,
        // and provide executable path (in this case for a Chrome installation in Ubuntu)
        puppeteerOptions: {
            // executablePath: 'google-chrome-stable',
            // headless: false,
            browserWSEndpoint:
                "ws://127.0.0.1:27571/devtools/browser/a3758ebe-221b-4dda-9ca2-0d38665c8d1b",
            defaultViewport: null,
        },
    });

    await cluster.task(async ({ page, data: url }) => {
        await page.goto(url);
        console.log("went to: " + url);
    });

    cluster.queue("https://dantri.com.vn/");
    // cluster.queue("https://www.wikipedia.org");
    // cluster.queue("https://github.com/");

    await cluster.idle();
    // await cluster.close();
})();
