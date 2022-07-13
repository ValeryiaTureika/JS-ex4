let page;

beforeEach(async() => {
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
    page.close();
});

describe("Github page tests", () => {
    beforeEach(async() => {
        await page.goto("https://github.com/team");
    });

    test("The h1 header content'", async() => {
        const firstLink = await page.$("header div div a");
        await firstLink.click();
        await page.waitForSelector('h1', {
            timeout: 6000
        });
        const title2 = await page.title();
        expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
    });

    test("The first link attribute", async() => {
        await page.waitForSelector("a", {
            timeout: 60000
        });
        const actual = await page.$eval("a", link => link.getAttribute('href'));
        expect(actual).toEqual("#start-of-content");
    });

    test("The page contains Sign in button", async() => {
        const btnSelector = ".btn-large-mktg.btn-mktg";
        await page.waitForSelector(btnSelector, {
            visible: true,
            timeout: 60000
        });
        const actual = await page.$eval(btnSelector, link => link.textContent);
        expect(actual).toContain("Sign up for free")
    });
});

test("The h1 should contain 'enterprise'", async() => {
    await page.goto("https://github.com");
    const enterpriseLink = await page.$("header nav > ul > li:nth-child(3) > a");
    await enterpriseLink.click();

    await page.waitForNavigation()

    await page.waitForSelector("h1", {
        timeout: 60000
    });
    const title3 = await page.title();
    expect(title3).toEqual("Enterprise · A smarter way to work together · GitHub");
}, 80000);

test("The h1 should contain 'marketplace'", async() => {
    await page.goto("https://github.com");
    const marketplaceLink = await page.$("header  nav > ul > li:nth-child(5) > a");
    await marketplaceLink.click();

    await page.waitForNavigation({
        timeout: 60000
    });

    await page.waitForSelector("h1", {
        timeout: 60000
    });
    const title3 = await page.title();
    expect(title3).toEqual("GitHub Marketplace · to improve your workflow · GitHub");
});

test("The h1 should contain 'contact'", async() => {
    await page.goto("https://github.com");
    const contactSales = await page.$("main .btn-mktg.mr-2.mb-2.width-full.width-sm-auto.btn-muted-mktg");
    await contactSales.click();

    await page.waitForNavigation();

    await page.waitForSelector("h3", {
        timeout: 80000
    });
    const title3 = await page.title();
    expect(title3).toEqual("Enterprise · A smarter way to work together · GitHub");
}, 60000);

test("The h1 should contain search", async() => {
    await page.goto("https://github.com");
    const searchLink = await page.$("[type='text']");
    await searchLink.type("puppiteer");
    await page.keyboard.press("Enter");

    await page.waitForNavigation({
        timeout: 60000
    });

    await page.waitForSelector("h2", {
        timeout: 60000
    });
    const title4 = await page.title();
    expect(title4).toEqual("Search · puppiteer · GitHub");
}, 60000);

test("The h1 should contain 'pricing'", async() => {
    await page.goto("https://github.com");
    const pricingLink = await page.$("header  nav > ul > li:nth-child(6) > details > summary");
    await pricingLink.click();

    const comparePlans = await page.$("nav > ul > li:nth-child(6) > details > div > ul > li:nth-child(2) > a");
    await comparePlans.evaluate(b => b.click());

    await page.waitForNavigation({
        timeout: 60000
    });

    await page.waitForSelector("h1", {
        timeout: 60000
    });
    const title5 = await page.title();
    expect(title5).toEqual("Pricing · Plans for every developer · GitHub");
}, 80000);