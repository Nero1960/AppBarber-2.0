package com.appbarber.pages.auth.admin;

import com.appbarber.pages.app.BaseAppPage;
import com.microsoft.playwright.Page;

public class UserAdminPage extends BaseAppPage {

    public UserAdminPage(Page page) {
        super(page, "/admin");
    }
}
