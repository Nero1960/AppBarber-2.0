package com.appbarber.tests;

import java.io.FileInputStream;
import java.nio.file.Paths;
import java.util.Properties;

import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

public class AppBase extends TestBase {

    @BeforeClass(alwaysRun = true)
    public void globalLogin() {
        // 1. Cargar la URL si no está inicializada
        if (urlBase == null) {
            Properties prop = new Properties();
            try {
                FileInputStream io = new FileInputStream("config.properties");
                prop.load(io);
                urlBase = prop.getProperty("url.base", "https://appbarber-staging.onrender.com/");
            } catch (Exception e) {
                urlBase = "https://appbarber-staging.onrender.com/"; 
            }
        }

        System.out.println("[AUTH GLOBAL]: Iniciando sesión aislada para crear state.json...");

        // 2. Usamos variables LOCALES estrictas para no romper el ciclo de vida del test posterior
        try (Playwright pwLocal = Playwright.create()) {
            Browser bLocal = pwLocal.chromium().launch(new BrowserType.LaunchOptions().setHeadless(true));
            BrowserContext ctxLocal = bLocal.newContext();
            Page pLocal = ctxLocal.newPage();

            // Navegación e inicio de sesión con tus credenciales actuales
            pLocal.navigate(urlBase + "/");
            pLocal.fill("#email", "andy.mena@correo.com");
            pLocal.fill("#password", "holamundo");
            pLocal.click("input[type='submit']");
            
            // Esperamos a la redirección del Dashboard
            pLocal.waitForURL("**/app");

            // Guardamos las cookies de la sesión de manera limpia en el disco
            ctxLocal.storageState(new BrowserContext.StorageStateOptions().setPath(Paths.get("state.json")));
            System.out.println("[AUTH GLOBAL]: Archivo state.json generado con éxito.");
            
            bLocal.close();
        } catch (Exception e) {
            System.out.println("[ERROR AUTH GLOBAL]: Falló el inicio de sesión previo: " + e.getMessage());
        }
    }

    // Sobrescribimos el método setUp para cargar las cookies antes de cada prueba
    @Override
    @BeforeMethod(alwaysRun = true)
    public void setUp() {
        // 1. Llama al setUp del padre (TestBase) para inicializar de forma limpia 'playwright' y 'browser'
        super.setUp();
        
        // 2. Cerramos la página y el contexto vacío por defecto que te creó el padre
        if (page != null) page.close();
        if (context != null) context.close();
        
        // 3. Creamos un contexto NUEVO inyectándole el estado que guardamos en el JSON
        System.out.println("[SETUP APP]: Inyectando sesión desde state.json al navegador del test...");
        context = browser.newContext(new Browser.NewContextOptions().setStorageStatePath(Paths.get("state.json")));
        page = context.newPage();
    }
}