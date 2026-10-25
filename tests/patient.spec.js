import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects/POManager';
import { newPatient } from '../testdata/patientData';

test.describe('Patient Page Tests', () => {
    let poManager;
    let patientListPage;
    let navigationBar;
    let loginPage;
    let clinicSelectionPage;

    test.beforeEach(async ({ page }) => {
        poManager = new POManager(page);
        loginPage = poManager.getLoginPage();
        await loginPage.goto();
        clinicSelectionPage = poManager.getClinicSelectionPage();
        await clinicSelectionPage.selectClinic("Clinic A");

        await loginPage.login('rahul', 'Rahul@123');
        await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });

        navigationBar = poManager.getNavigationBar();
        patientListPage = poManager.getPatientListPage();
        await navigationBar.goToPatientsPage();
        await expect(page).toHaveURL(/patients/, { timeout: 10000 });
        await expect(patientListPage.pageHeading).toBeVisible();
    });

    test('should add a new patient with valid details', async () => {

        await patientListPage.openPatientForm();
        await patientListPage.addPatient(newPatient);
        await expect(patientListPage.toast).toBeVisible();

    });

    test('should show newly added patient in the list', async () => {

        await patientListPage.openPatientForm();
        await patientListPage.addPatient(newPatient);

        const fullName = `${newPatient.firstName} ${newPatient.lastName}`;
        await patientListPage.searchPatient(newPatient.lastName);
        await expect(patientListPage.getPatientRow(fullName)).toBeVisible();


    });

    test('should show validation errors when required fields are empty', async () => {

        await patientListPage.openPatientForm();
        await patientListPage.submitBtn.click();

        await expect(patientListPage.salutationError).toHaveText('This field is required.');
        await expect(patientListPage.firstNameError).toHaveText('This field is required.');
        await expect(patientListPage.lastNameError).toHaveText('This field is required.');
        await expect(patientListPage.dobError).toHaveText('Date of Birth is required.');
        await expect(patientListPage.genderError).toHaveText('This field is required.');
        await expect(patientListPage.mobileError).toHaveText('Mobile Number is required.');
        await expect(patientListPage.emailError).toHaveText('This field is required.');
        await expect(patientListPage.stateError).toHaveText('This field is required.');
        await expect(patientListPage.districtError).toHaveText('This field is required.');
        await expect(patientListPage.localityError).toHaveText('This field is required.');
        await expect(patientListPage.addressError).toHaveText('This field is required.');

    });

    test('should enable district after selecting state', async () => {
        await patientListPage.openPatientForm();
        await expect(patientListPage.district).toBeDisabled();
        await patientListPage.selectFromDropdown(patientListPage.state, 'Kerala');
        await expect(patientListPage.district).toBeEnabled();
    });

    test('should close patient form when cancel is clicked', async () => {

        await patientListPage.openPatientForm();
        await expect(patientListPage.addNewPatientHeading).toBeVisible();
        await patientListPage.cancelBtn.click();
        await expect(patientListPage.addNewPatientHeading).toBeHidden();
        await expect(patientListPage.patientListPageHeading).toBeVisible();

    });



})