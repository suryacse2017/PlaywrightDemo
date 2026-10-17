import { LoginPage } from '../POM/LoginPage';

export async function submitLogin(loginPage: LoginPage,username: string,password: string,): Promise<void> 
{
  await loginPage.enterCredentials(username, password);
  await loginPage.clickSubmit();
}