import {after, afterEach, beforeEach, before} from 'mocha';
import {expect} from 'chai';
import {Builder} from 'selenium-webdriver';
import addContext from 'mochawesome/addContext.js';
import { LoginPage } from '../pom/login.page';

describe('login', function () {
  //test suite
  this.timeout(10000);
  let loginPage: LoginPage;

  before(async function () {}); //before test suite

  after(async function () {}); //after test suite

  beforeEach(async function () {
    //setup
    const browser = new Builder().forBrowser('chrome').build();
    loginPage = new LoginPage(browser);
    loginPage.visit('https://www.saucedemo.com/');
    loginPage.validatePage();
  }); //before each test

  afterEach(async function () {
    if (this.currentTest?.state !== 'passed') {
      addContext(
        this,
        await loginPage.takeScreenshot(this.currentTest?.fullTitle()),
      );
    }

    loginPage.close();
  }); //after each test

  it('check username placeholder text', async function () {
    expect(
      await loginPage.userNamePlaceholder(),
      `Placeholder should be ${loginPage.USERNAME_PLACEHOLDER}`,
    ).equal(loginPage.USERNAME_PLACEHOLDER);
  });

  it('check password placeholder text', async function () {
    expect(
      await loginPage.passwordPlaceholder(),
      `Placeholder should be ${loginPage.PASSWORD_PLACEHOLDER}`,
    ).equal(loginPage.PASSWORD_PLACEHOLDER);
  });

  it('login with no credentials', async function () {
    await loginPage.clickLoginButton();
    await loginPage.waitForErrorMessage();

    expect(
      await loginPage.loginErrorMessage(),
      `Error message should be ${loginPage.ERROR_NO_CREDENTIALS}`,
    ).equal(loginPage.ERROR_NO_CREDENTIALS);
  });

  it('login with missing password', async function () {
    await loginPage.enterUsername('standar_user');
    await loginPage.clickLoginButton();
    await loginPage.waitForErrorMessage();

    expect(
      await loginPage.loginErrorMessage(),
      `Error message should be ${loginPage.ERROR_ONLY_USERNAME}`,
    ).equal(loginPage.ERROR_ONLY_USERNAME);
  });

  it('login with missing username', async function () {
    await loginPage.enterPsw('secret_sauce');
    await loginPage.clickLoginButton();
    await loginPage.waitForErrorMessage();

    expect(
      await loginPage.loginErrorMessage(),
      `Error message should be ${loginPage.ERROR_ONLY_PASSWORD}`,
    ).equal(loginPage.ERROR_ONLY_PASSWORD);
  });

  it('login with wrong credentials', async function () {
    await loginPage.enterUsername('wrong username');
    await loginPage.enterPsw('wrong password');
    await loginPage.clickLoginButton();
    await loginPage.waitForErrorMessage();

    expect(
      await loginPage.loginErrorMessage(),
      `Error message should be ${loginPage.ERROR_WRONG_CREDENTIALS}`,
    ).equal(loginPage.ERROR_WRONG_CREDENTIALS);
  });

  it('close login error message', async function () {
    await loginPage.enterUsername('wrong username');
    await loginPage.enterPsw('wrong password');
    await loginPage.clickLoginButton();
    await loginPage.waitForErrorMessage();
    await loginPage.closeErrorMessage();

    expect(
      await loginPage.errorIsVisible(),
      'Error message should not be visible after being closed',
    ).equal(false);
  });

  it('login standard user', async function () {
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPsw('secret_sauce');
    await loginPage.clickLoginButton();

    expect(
      await loginPage.succesLoginPage(), //TODO: change once product page is existing
      'Invetory page should be shown afer successfull login',
    );
  });

  it('login locked out user', async function () {
    await loginPage.enterUsername('locked_out_user');
    await loginPage.enterPsw('secret_sauce');
    await loginPage.clickLoginButton();
    await loginPage.waitForErrorMessage();

    expect(
      await loginPage.loginErrorMessage(),
      `Error message should be ${loginPage.ERROR_LOCKED_USER}`,
    ).equal(loginPage.ERROR_LOCKED_USER);
  });
});
