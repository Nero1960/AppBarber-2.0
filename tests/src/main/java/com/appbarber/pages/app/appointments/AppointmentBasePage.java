package com.appbarber.pages.app.appointments;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.AriaRole;

public class AppointmentBasePage {

    protected final Page page;
    protected final Locator nextButton;
    protected final Locator previousButton;

    public AppointmentBasePage(Page page) {
        this.page = page;
        this.nextButton = page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Siguiente"));
        this.previousButton = page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Anterior"));
    }

    public void navigateTo(String urlBase, String path) {
        String cleanPath = path.startsWith("/") ? path.substring(1) : path;
        String fullUrl = urlBase + "/app" + (cleanPath.isEmpty() ? "" : "/" + cleanPath);
        page.navigate(fullUrl);
    }

    public void nextStep(){
        nextButton.click();
    }

    public void previousStep(){
        previousButton.click();
    }

    
}
