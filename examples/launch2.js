const { Cluster } = require("puppeteer-cluster");

(async () => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: 2,
        puppeteerOptions: {
            headless: false,
        },
    });

    await cluster.task(async ({ page, data: url }) => {
        await page.goto(url);
        const screen = await page.screenshot();
        // Store screenshot, do something else
    });

    cluster.queue("http://www.google.com/");
    cluster.queue("http://www.wikipedia.org/");
    // many more pages

    await cluster.idle();
    await cluster.close();
})();
