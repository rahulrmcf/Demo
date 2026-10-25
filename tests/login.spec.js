import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects/POManager';

test.describe('Login Page Tests', () => {

    let poManager;
    let loginPage;
    let clinicSelectionPage;

    test.beforeEach(async ({ page }) => {
        poManager = new POManager(page);
        loginPage = poManager.getLoginPage();
        await loginPage.goto();
        clinicSelectionPage = poManager.getClinicSelectionPage();
        await clinicSelectionPage.selectClinic("Clinic A");


    });

    test('should login successfully with valid credentials', async ({ page }) => {
        await loginPage.login('ubtadmin', 'Admin@123');
        await expect(page).toHaveURL(/employee/, { timeout: 10000 });
    });

    test('should display error message with invalid password', async ({ }) => {
        await loginPage.login('rahul', 'wrongp@ssword');
        await expect(loginPage.errorToast).toBeVisible();

    });

    test('should display error message with invalid username', async ({ }) => {
        await loginPage.login('ronaldo', 'Rahul@123');
        await expect(loginPage.errorToast).toBeVisible();

    });


    test('should display error message when username is empty', async ({ }) => {
        await loginPage.login('', 'Rahul@123');
        await expect(loginPage.usernameEmpty).toBeVisible();

    });

    test('should display error message when password is empty', async ({ }) => {
        await loginPage.login('rahul', '');
        await expect(loginPage.passwordEmpty).toBeVisible();

    });


    test('should display validation messages when username and password are empty', async ({ }) => {
        await loginPage.login('', '');
        await expect(loginPage.usernameEmpty).toBeVisible();
        await expect(loginPage.passwordEmpty).toBeVisible();

    });
});