const { Cluster } = require("puppeteer-cluster");
const puppeteer = require("puppeteer-core"); // use puppeteer-core instead of puppeteer

(async () => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: 2,

        // provide the puppeteer-core library
        puppeteer,
        // and provide executable path (in this case for a Chrome installation in Ubuntu)
        puppeteerOptions: {
            // executablePath: "google-chrome-stable",
            executablePath:
                "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            headless: false,
        },
    });

    await cluster.task(async ({ page, data: url }) => {
        console.log("chay" + url);
        await page.goto(url);
        console.log("went to: " + url);
    });

    cluster.queue("https://www.google.com");
    cluster.queue("https://www.wikipedia.org");
    cluster.queue("https://github.com/");

    await cluster.idle();
    await cluster.close();
})();
