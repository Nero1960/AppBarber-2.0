package com.appbarber.tests.ui;

import com.appbarber.listeners.AllureScreenshotListener;
import com.appbarber.utils.ConfigManager;
import com.appbarber.utils.ui.PlaywrightManager;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;

public class TestBase {

    protected Playwright playwright;
    protected Browser browser;
    protected BrowserContext context;
    protected Page page;
    protected String urlBase;

    @BeforeMethod(alwaysRun = true)
    public void setUp() {
        urlBase = ConfigManager.getUiBaseUrl();

        playwright = PlaywrightManager.getPlaywright();
        browser = PlaywrightManager.getBrowser();
        context = createContext();
        page = context.newPage();
        AllureScreenshotListener.setPage(page);
    }

    protected BrowserContext createContext() {
        return browser.newContext();
    }

    @AfterMethod(alwaysRun = true)
    public void tearDown() {
        AllureScreenshotListener.clearPage();
        if (context != null) context.close();
    }

    @AfterSuite(alwaysRun = true)
    public void closePlaywright() {
        PlaywrightManager.close();
    }
}
