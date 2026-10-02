import { Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly page: Page;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly dashboard: Locator;

    constructor(page: Page) {

        this.page = page;

        this.usernameInput =
            page.locator("#username");

        this.passwordInput =
             page.locator("#password");


        this.loginButton =
            page.getByRole('button', { name: 'Submit' });

        this.errorMessage =
            page.getByText('Your username is invalid!').nth(0);

        this.dashboard =
            page.getByText('You successfully logged in!');
    }

    async navigateToLoginPage(url: string): Promise<void> {

        await this.page.goto(url);
       // await this.page.pause();

    }
    async enterUsername(username: string): Promise<void> {

        await this.usernameInput.fill(username);

    }

    async enterPassword(password: string): Promise<void> {

        await this.passwordInput.fill(password);

    }

    async clickLogin(): Promise<void> {

        await this.loginButton.click();

    }

    async login(
        username: string,
        password: string
    ): Promise<void> {

        await this.enterUsername(username);

        await this.enterPassword(password);

        await this.clickLogin();

    }
}