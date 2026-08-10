package com.appbarber.tests.ui.app;

import com.appbarber.tests.ui.TestBase;
import com.appbarber.utils.ui.SessionManager;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import org.testng.annotations.BeforeSuite;

import java.nio.file.Paths;

public class AppUiBaseTest extends TestBase {

    @BeforeSuite(alwaysRun = true)
    public void ensureGlobalSession() {
        SessionManager.ensureSession();
    }

    @Override
    protected BrowserContext createContext() {
        return browser.newContext(new Browser.NewContextOptions()
                .setStorageStatePath(Paths.get(SessionManager.getStateFilePath())));
    }
}
