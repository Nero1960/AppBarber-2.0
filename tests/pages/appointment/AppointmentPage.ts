import {Page} from "@playwright/test"
import { BasePageAppointment } from "./BasePage";

const today = new Date();
const futureDay = today.getDate() + 2;

export class AppointmentPage extends BasePageAppointment{
    constructor(page: Page){
        super(page)
    }

    async bookAppointment(){
        await this.goToMakeAppointment();
        await this.waitForServices();
        await this.selectServices(2)
        await this.nextPage();
        await this.selectBarbers();
        await this.selectDay(futureDay)
        await this.selectHour();
        await this.nextPage();
        await this.submitAppointment();
    }
}