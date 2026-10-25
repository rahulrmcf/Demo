import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects/POManager';

test.describe("Appointment Page Tests", () => {

    const patientId = "PAT2026/2378";
    const departmentName = "Orthopedics";
    let poManager;
    let navigationBar;
    let loginPage;
    let clinicSelectionPage;
    let appointmentPage;

    test.beforeEach(async ({page}) => {

        poManager = new POManager(page);
        loginPage = poManager.getLoginPage();
        await loginPage.goto();
        clinicSelectionPage = poManager.getClinicSelectionPage();
        await clinicSelectionPage.selectClinic("Clinic A");

        await loginPage.login("rahul", "Rahul@123");
        await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });

        navigationBar = poManager.getNavigationBar();
        appointmentPage = poManager.getAppointmentPage();
        await navigationBar.goToAppointmentPage();
        await expect(page).toHaveURL(/appointment/, { timeout: 10000 });
        await expect(appointmentPage.addPatientBtn).toBeVisible();

    });

    test("should take appointment for already existing patient", async({page})=>{

        await appointmentPage.searchPatient(patientId);
        await expect(appointmentPage.patientCode).toContainText(patientId);
        await appointmentPage.selectFromDropdown(appointmentPage.department, departmentName);
        await expect(appointmentPage.department).toHaveText(departmentName);
        await expect(appointmentPage.doctorName).toBeVisible();
        await appointmentPage.selectDoctor();
        await expect(appointmentPage.availableTimeSlots.first()).toBeVisible();
        await appointmentPage.selectTimeSlot('4:15 PM - 4:30 PM');
        await appointmentPage.submit();
        await expect(appointmentPage.completePaymentHeading).toBeVisible();
        await appointmentPage.selectPaymentOption('Cash');
        await expect(appointmentPage.payBtn).toBeEnabled();
        await appointmentPage.pay();
        await expect(appointmentPage.paymentSuccess).toBeVisible();
        await page.pause();

    });

    

    
});