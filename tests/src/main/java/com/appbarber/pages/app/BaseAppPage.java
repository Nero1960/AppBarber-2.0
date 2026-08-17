package com.appbarber.pages.app;

import com.microsoft.playwright.Page;

public class BaseAppPage {

    protected final Page page;
    private final String path;

    protected BaseAppPage(Page page, String path) {
        this.page = page;
        this.path = path;
    }

    public void waitForPageReady(String urlBase) {
        page.waitForURL(urlBase + path);
    }

    public String getCurrentUrl() {
        return page.url();
    }
}
