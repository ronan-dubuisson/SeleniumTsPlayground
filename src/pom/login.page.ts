import {WebDriver, By, Locator} from 'selenium-webdriver';
import {BasePage} from './base.page.js';

export class LoginPage extends BasePage {
  //constants
  private readonly PAGE_TITLE: string = 'Swag Labs';
  public readonly URL_ON_SUCESS_LOGIN =
    'https://www.saucedemo.com/inventory.html';
  public readonly LOGIN_TIMEOUT = 2000; //in milliseconds

  //locators
  private readonly loginForm: Locator = By.css(
    '#login_button_container > div > form',
  );
  private readonly inputUsername: Locator = By.id('user-name');
  private readonly inputPsw: Locator = By.id('password');
  private readonly loginBtn: Locator = By.id('login-button');

  constructor(driver: WebDriver) {
    super(driver);
  }

  async validatePage() {
    if (this.PAGE_TITLE != (await this.title())) {
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
