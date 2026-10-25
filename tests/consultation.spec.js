import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects/POManager';
import { newConsultation } from '../testdata/consultationData';

test.describe("Consultation Page Test", () => {

    const patientId = "PAT2026/2190";
    let poManager;
    let loginPage;
    let clinicSelectionPage;
    let consultationPage;
    test.beforeEach(async ({ page }) => {

        poManager = new POManager(page);
        loginPage = poManager.getLoginPage();
        await loginPage.goto();
        clinicSelectionPage = poManager.getClinicSelectionPage();
        await clinicSelectionPage.selectClinic("Clinic A");

        consultationPage = poManager.getConsultationPage();
        await loginPage.login("rohan", "Rohan@123");
        await expect(page).toHaveURL(/consultation/, { timeout: 10000 });


    });
    test("should complete consultation", async () => {

        await consultationPage.nextPatientBtn.click();
        await expect(consultationPage.doctorPatientQueueHeading).toBeVisible({ timeout: 10000 });
        await expect(consultationPage.scheduledQueueHeading).toBeVisible();
        const patient = consultationPage.getPatient(patientId);
        await expect(patient).toBeVisible();
        await consultationPage.callPatient(patientId);
        await expect(consultationPage.getActivePatient(patientId)).toBeVisible();
        await consultationPage.queueCloseBtn.click();
        await consultationPage.fullConsultation(newConsultation);
        await expect(consultationPage.successToast).toBeVisible();
        await consultationPage.nextPatientBtn.click();
        await expect(consultationPage.getCompletedPatient(patientId)).toBeVisible();


    });

});