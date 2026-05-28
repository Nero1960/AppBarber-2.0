package com.appbarber.tests;

import java.io.FileInputStream;
import java.util.Properties;

import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

public class TestBase {

    protected Playwright playwright;
    protected Browser browser;
    protected Page page;
    protected String urlBase;

    @BeforeMethod
    public void setUp() {
        Properties prop = new Properties();

        try {
            // leer archivo de propiedades
            FileInputStream io = new FileInputStream("config.properties");
            prop.load(io);
        } catch (Exception e) {
            System.out.println("[ERROR]: No se pudo cargar el archivo de propiedades" + e);
        }

        urlBase = prop.getProperty("url.base", "https://appbarber-2-0.onrender.com");
        boolean isGithubActions = System.getenv("CI") != null;
        boolean isHeadless;

        if (isGithubActions) {
            isHeadless = true;
        } else {
            isHeadless = Boolean.parseBoolean(prop.getProperty("browser.headless", "false"));
        }

        System.out.println("[SETUP BASE]: Levantando playwright en el entorno de pruebas: " + urlBase);
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(isHeadless));
        page = browser.newPage();
    }

    @AfterMethod
    public void tearDown() {
        if (browser != null)
            browser.close();
        if (playwright != null)
            playwright.close();
    }

}
