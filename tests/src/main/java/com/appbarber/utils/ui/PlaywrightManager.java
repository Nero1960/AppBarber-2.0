package com.appbarber.utils.ui;

import com.appbarber.utils.ConfigManager;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Playwright;

/**
 * Gestiona el ciclo de vida de Playwright/Browser de forma global
 * (una sola creación por ejecución), espejando el patrón del RequestSpecBuilder
 * que usa AuthApiClient.
 */
public class PlaywrightManager {

    private static Playwright playwright;
    private static Browser browser;

    private PlaywrightManager() {
    }

    public static synchronized Playwright getPlaywright() {
        if (playwright == null) {
            playwright = Playwright.create();
        }
        return playwright;
    }

    public static synchronized Browser getBrowser() {
        if (browser == null) {
            boolean isGithubActions = System.getenv("CI") != null;
            boolean isHeadless = isGithubActions || Boolean.parseBoolean(ConfigManager.getProperty("browser.headless"));
            BrowserType.LaunchOptions options = new BrowserType.LaunchOptions()
                    .setHeadless(isHeadless)
                    .setChromiumSandbox(false);

            String gateway = System.getenv("HOST_GATEWAY_IP");
            if (gateway != null && !gateway.isBlank()) {
                // Dentro de Docker, Chromium resuelve "localhost" al loopback del
                // contenedor e ignora /etc/hosts; se fuerza la resolución hacia el
                // gateway del host (donde están publicados los puertos de la app).
                options.setArgs(java.util.List.of("--host-resolver-rules=MAP localhost " + gateway));
            }

            browser = getPlaywright().chromium().launch(options);
        }
        return browser;
    }

    public static synchronized void close() {
        if (browser != null) {
            browser.close();
            browser = null;
        }
        if (playwright != null) {
            playwright.close();
            playwright = null;
        }
    }
}
