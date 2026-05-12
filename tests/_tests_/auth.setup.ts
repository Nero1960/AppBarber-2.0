import { test as setup } from "@playwright/test"
import { LoginPage } from "../pages/auth/LoginPage"

const authFile = 'tests/.auth/.user.json'

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto(); 
    await loginPage.Login('andy.mena@correo.com', 'holamundo');
    await page.waitForURL('/app');

    await page.context().storageState({ path: authFile });
});