package com.appbarber.tests;

import java.io.FileInputStream;
import java.io.File;
import java.nio.file.Paths;
import java.util.Properties;

import org.testng.annotations.BeforeSuite;
import org.testng.annotations.BeforeMethod;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

public class AppBase extends TestBase {

    
    @BeforeSuite(alwaysRun = true)
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

        // 2. CONDICIONAL INTELIGENTE: Verificamos si ya existe la sesión guardada
        File stateFile = new File("state.json");
        
        if (!stateFile.exists()) {
            System.out.println("[AUTH GLOBAL]: No se encontró sesión activa. Generando state.json en Render...");

            try (Playwright pwLocal = Playwright.create()) {
                Browser bLocal = pwLocal.chromium().launch(new BrowserType.LaunchOptions().setHeadless(true));
                BrowserContext ctxLocal = bLocal.newContext();
                Page pLocal = ctxLocal.newPage();

                pLocal.navigate(urlBase + "/");
                pLocal.fill("#email", "andy.mena@correo.com");
                pLocal.fill("#password", "holamundo");
                pLocal.click("input[type='submit']");
                
                pLocal.waitForURL("**/app");

                ctxLocal.storageState(new BrowserContext.StorageStateOptions().setPath(Paths.get("state.json")));
                System.out.println("[AUTH GLOBAL]: Archivo state.json generado con éxito.");
                
                bLocal.close();
            } catch (Exception e) {
                System.out.println("[ERROR AUTH GLOBAL]: Falló el inicio de sesión previo: " + e.getMessage());
            }
        } else {
            // Si el archivo ya existe (porque estás tirando comandos seguidos en tu máquina), se salta todo el bloque
            System.out.println("[AUTH GLOBAL]: Sesión existente detectada en el disco duro. Saltando paso de Login.");
        }
    }

    @Override
    @BeforeMethod(alwaysRun = true)
    public void setUp() {
        super.setUp();
        if (page != null) page.close();
        if (context != null) context.close();
        
        System.out.println("[SETUP APP]: Inyectando sesión desde state.json al navegador del test...");
        context = browser.newContext(new Browser.NewContextOptions().setStorageStatePath(Paths.get("state.json")));
        page = context.newPage();
    }
}