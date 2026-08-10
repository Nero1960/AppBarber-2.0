package com.appbarber.listeners;

import com.microsoft.playwright.Page;
import io.qameta.allure.Allure;
import org.testng.ITestListener;
import org.testng.ITestResult;

import java.io.ByteArrayInputStream;

/**
 * Adjunta un screenshot a Allure cuando un test UI falla.
 * TestBase registra la página activa vía setPage().
 */
public class AllureScreenshotListener implements ITestListener {

    private static final ThreadLocal<Page> CURRENT_PAGE = new ThreadLocal<>();

    public static void setPage(Page page) {
        CURRENT_PAGE.set(page);
    }

    public static void clearPage() {
        CURRENT_PAGE.remove();
    }

    @Override
    public void onTestFailure(ITestResult result) {
        Page page = CURRENT_PAGE.get();
        if (page == null) {
            return;
        }
        try {
            byte[] screenshot = page.screenshot(new Page.ScreenshotOptions().setFullPage(true));
            Allure.addAttachment("Screenshot del fallo", new ByteArrayInputStream(screenshot));
        } catch (Exception e) {
            // Best-effort: si la página ya no está disponible se omite el screenshot
        }
    }
}
