import {expect} from '@playwright/test';
export class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.userName = page.locator('input[name="identifier"]');
        this.password = page.locator('input[type="password"]');
        this.loginBtn = page.locator("button[type='submit']");
        this.passwordEmpty = page.getByText('Password is required');
        this.usernameEmpty = page.getByText('Email or Username is required');
        this.errorToast = page.getByRole('alert').filter({hasText: 'Invalid username or password'}).first();
    }

    async goto()
    {
        await this.page.goto('/login');
    }

    async login(username,password)
    {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }


}
