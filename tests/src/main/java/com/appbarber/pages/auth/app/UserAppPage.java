package com.appbarber.pages.auth.app;

import com.microsoft.playwright.Page;

public class UserAppPage {

    protected Page page;

    public UserAppPage(Page page) {
        this.page = page;
    }

    public boolean isLoaded(String urlBase) {
        page.waitForURL(urlBase + "/app");
        return page.url().equals(urlBase + "/app");
    }

}
