import { Locator, Page } from "@playwright/test";

export async function selectServices(quantity: number = 1, serviceContainer: Locator) {
    const totalServices = await serviceContainer.count();
    const selectIndex = new Set()

    while(selectIndex.size < Math.min(quantity, totalServices)){
        const randomIndex = Math.floor(Math.random() * totalServices)
        selectIndex.add(randomIndex)
    }

    for (const index of selectIndex) {
        await serviceContainer.nth(index as number).click();
    }

}

export async function selectBarberTest(page: Page, barberSelect: Locator) {
    // 1. Hacemos clic en el select para abrirlo
    await barberSelect.first().click();

    // 2. Esperamos a que aparezca la primera opción del menú.
    // Usamos el rol 'option' que es el estándar, y le damos tiempo por si el server de Render está lento.
    const firstBarber = page.getByRole('option').first();
    await firstBarber.waitFor({ state: 'visible', timeout: 10000 });

    // 3. Hacemos clic forzado en el primer barbero
    // El 'force: true' es para que no le importe si hay animaciones o capas de por medio
    await firstBarber.click({ force: true });
}