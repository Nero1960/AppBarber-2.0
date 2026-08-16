package com.appbarber.utils.ui;

import com.appbarber.pages.auth.LoginPage;
import com.appbarber.utils.ConfigManager;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

import java.io.File;
import java.nio.file.Paths;

/**
 * Genera y reutiliza la sesión autenticada (state.json) del módulo App.
 * La sesión se crea mediante LoginPage (POM) con credenciales de ConfigManager
 * y se guarda en target/state.json (fuera del repo).
 */
public class SessionManager {

    private static final String STATE_FILE_PATH = "target" + File.separator + "state.json";
    private static final long SESSION_MAX_AGE_MILLIS = 30 * 60 * 1000;

    private SessionManager() {
    }

    public static String getStateFilePath() {
        return STATE_FILE_PATH;
    }

    public static void ensureSession() {
        File stateFile = new File(STATE_FILE_PATH);
        if (stateFile.exists() && isSessionFresh(stateFile)) {
            System.out.println("[SESSION]: Sesión válida detectada en " + STATE_FILE_PATH + ". Saltando login.");
            return;
        }
        generateSession();
    }

    private static boolean isSessionFresh(File stateFile) {
        return System.currentTimeMillis() - stateFile.lastModified() < SESSION_MAX_AGE_MILLIS;
    }

    private static void generateSession() {
        String urlBase = ConfigManager.getUiBaseUrl();
        String email = ConfigManager.getPropertyOrEnv("users.app.email");
        String password = ConfigManager.getPropertyOrEnv("users.app.password");

        System.out.println("[SESSION]: Generando state.json autenticado en " + STATE_FILE_PATH);

        try (Playwright pwLocal = Playwright.create()) {
            BrowserType.LaunchOptions options = new BrowserType.LaunchOptions()
                    .setHeadless(true)
                    .setChromiumSandbox(false);

            String gateway = System.getenv("HOST_GATEWAY_IP");
            if (gateway != null && !gateway.isBlank()) {
                options.setArgs(java.util.List.of("--host-resolver-rules=MAP localhost " + gateway));
            }

            Browser browser = pwLocal.chromium().launch(options);
            BrowserContext context = browser.newContext();
            Page page = context.newPage();

            LoginPage loginPage = new LoginPage(page);
            loginPage.navigateTo(urlBase, "/");
            loginPage.login(email, password);
            page.waitForURL("**/app");

            context.storageState(new BrowserContext.StorageStateOptions().setPath(Paths.get(STATE_FILE_PATH)));
            System.out.println("[SESSION]: state.json generado con éxito.");

            browser.close();
        } catch (Exception e) {
            throw new RuntimeException("Falló la generación de la sesión autenticada en " + urlBase, e);
        }
    }
}
