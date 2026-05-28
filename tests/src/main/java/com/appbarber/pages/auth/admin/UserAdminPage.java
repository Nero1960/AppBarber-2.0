package com.appbarber.pages.auth.admin;

import com.microsoft.playwright.Page;

public class UserAdminPage {
    private final Page page;

    public UserAdminPage(Page page) {
        this.page = page;
    }

    public boolean isLoaded(String urlBase) {
        page.waitForURL(urlBase + "/admin");
        return page.url().equals(urlBase + "/admin");
    }

}
