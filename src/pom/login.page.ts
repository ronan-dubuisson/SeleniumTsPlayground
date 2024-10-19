import {WebDriver, By, Locator} from 'selenium-webdriver';
import {BasePage} from './base.page.js';

export class LoginPage extends BasePage {
  //constants
  private readonly PAGE_TITLE: string = 'Swag Labs';
  private readonly URL = "https://www.saucedemo.com/";
  

  //locators
  private readonly loginForm: Locator = By.css(
    '#login_button_container > div > form',
  );
  private readonly inputUsername: Locator = By.id('user-name');
  private readonly inputPsw: Locator = By.id('password');
  private readonly loginBtn: Locator = By.id('login-button');
  private readonly loginErroMessage: Locator = By.css(
    '#login_button_container > div > form > div.error-message-container.error > h3',
  );
  private readonly closeErroMessage: Locator = By.css(
    '#login_button_container > div > form > div.error-message-container.error > h3 > button',
  );

  //expected values
  public readonly USERNAME_PLACEHOLDER: string = 'Username';
  public readonly PASSWORD_PLACEHOLDER: string = 'Password';
  public readonly ERROR_NO_CREDENTIALS: string =
    'Epic sadface: Username is required';
  public readonly ERROR_ONLY_PASSWORD: string =
    'Epic sadface: Username is required';
  public readonly ERROR_ONLY_USERNAME: string =
    'Epic sadface: Password is required';
  public readonly ERROR_WRONG_CREDENTIALS: string =
    'Epic sadface: Username and password do not match any user in this service';
  public readonly ERROR_LOCKED_USER: string =
    'Epic sadface: Sorry, this user has been locked out.';

  constructor(driver: WebDriver) {
    super(driver);
  }
  async open(){
    this.visit(this.URL);
  }

  async validatePage() {
    if (this.PAGE_TITLE != (await this.title())) {
      throw new Error('Wrong page!');
    }
  }

  async userNamePlaceholder() {
    return this.getPlaceholderText(this.inputUsername);
  }

  async passwordPlaceholder() {
    return this.getPlaceholderText(this.inputPsw);
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

  async loginErrorMessage() {
    return this.getText(this.loginErroMessage);
  }

  async errorIsVisible() {
    return this.elementIsOnPage(this.loginErroMessage);
  }

  async waitForErrorMessage() {
    return this.waitUntilDisplayed(this.loginErroMessage, this.LOGIN_TIMEOUT);
  }

  async closeErrorMessage() {
    return this.click(this.closeErroMessage);
  }

  async succesLoginPage() {
    return this.waitUntilUrlIs(this.URL_AFTER_SUCESS_LOGIN, this.LOGIN_TIMEOUT);
  }
}
