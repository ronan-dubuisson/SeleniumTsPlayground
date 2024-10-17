import {WebDriver, By, Locator} from 'selenium-webdriver';
import {BasePage} from './base.page.js';

export class LoginPage extends BasePage {
  //Page Title
  private static readonly title: string = 'Swag Labs';

  //locators
  private readonly loginForm: Locator = By.css(
    '#login_button_container > div > form',
  );
  private readonly inputUsername: Locator = By.id('user-name');
  private readonly inputPsw: Locator = By.id('password');
  private readonly loginBtn: Locator = By.id('login-button');
  private readonly productEl: Locator = By.css(
    '#header_container > div.header_secondary_container > span',
  );

  constructor(driver: WebDriver) {
    super(driver);
  }

  async validatePage() {
    const title = await this.title();

    if (title != (await this.title())) {
      throw new Error('Wrong page!');
    }
  }

  async enterUsername(username: string) {
    this.entertext(this.inputUsername, username);
  }

  async enterPsw(psw: string) {
    this.entertext(this.inputPsw, psw);
  }

  async clickLoginButton() {
    this.click(this.loginBtn);
  }
}
