package com.appbarber.pages.auth.app;

import com.appbarber.pages.app.BaseAppPage;
import com.microsoft.playwright.Page;

public class UserAppPage extends BaseAppPage {

    public UserAppPage(Page page) {
        super(page, "/app");
    }
}
