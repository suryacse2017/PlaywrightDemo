import type { Locator, Page } from 'playwright';

const LOGIN_URL = 'https://practicetestautomation.com/practice-test-login/';

export class LoginPage 
{
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly successHeading: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.errorMessage = page.locator('#error');
    this.successHeading = page.getByRole('heading', {
      name: 'Logged In Successfully',
    });
    this.logoutButton = page.getByRole('link', { name: 'Log out' });
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(LOGIN_URL);
  }

  async enterCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  getCurrentUrl(): string {
    return this.page.url();
  }
}