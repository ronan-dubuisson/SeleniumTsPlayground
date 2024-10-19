import {after, afterEach, beforeEach, before} from 'mocha';
import {expect} from 'chai';
import {Builder} from 'selenium-webdriver';
import {LoginPage} from '../pom/login.page.js';
import addContext from 'mochawesome/addContext.js';

describe('login', function () {
  //test suite
  this.timeout(10000);
  let loginpage: LoginPage;

  before(async function () {}); //before test suite

  after(async function () {}); //after test suite

  beforeEach(async function () {
    //setup
    const browser = new Builder().forBrowser('chrome').build();
    loginpage = new LoginPage(browser);
    loginpage.visit('https://www.saucedemo.com/');
    loginpage.validatePage();
  }); //before each test

  afterEach(async function () {
    if (this.currentTest?.state !== 'passed') {
      addContext(
        this,
        await loginpage.takeScreenshot(this.currentTest?.fullTitle()),
      );
    }

    loginpage.close();
  }); //after each test

  it('check username placeholder text', async function () {
    expect(
      await loginpage.userNamePlaceholder(),
      `Placeholder should be ${loginpage.USERNAME_PLACEHOLDER}`,
    ).equal(loginpage.USERNAME_PLACEHOLDER);
  });

  it('check password placeholder text', async function () {
    expect(
      await loginpage.passwordPlaceholder(),
      `Placeholder should be ${loginpage.PASSWORD_PLACEHOLDER}`,
    ).equal(loginpage.PASSWORD_PLACEHOLDER);
  });

  it('login with no credentials', async function () {
    await loginpage.clickLoginButton();
    await loginpage.waitForErrorMessage();

    expect(
      await loginpage.loginErrorMessage(),
      `Error message should be ${loginpage.ERROR_NO_CREDENTIALS}`,
    ).equal(loginpage.ERROR_NO_CREDENTIALS);
  });

  it('login with missing password', async function () {
    await loginpage.enterUsername('standar_user');
    await loginpage.clickLoginButton();
    await loginpage.waitForErrorMessage();

    expect(
      await loginpage.loginErrorMessage(),
      `Error message should be ${loginpage.ERROR_ONLY_USERNAME}`,
    ).equal(loginpage.ERROR_ONLY_USERNAME);
  });

  it('login with missing username', async function () {
    await loginpage.enterPsw('secret_sauce');
    await loginpage.clickLoginButton();
    await loginpage.waitForErrorMessage();

    expect(
      await loginpage.loginErrorMessage(),
      `Error message should be ${loginpage.ERROR_ONLY_PASSWORD}`,
    ).equal(loginpage.ERROR_ONLY_PASSWORD);
  });

  it('login with wrong credentials', async function () {
    await loginpage.enterUsername('wrong username');
    await loginpage.enterPsw('wrong password');
    await loginpage.clickLoginButton();
    await loginpage.waitForErrorMessage();

    expect(
      await loginpage.loginErrorMessage(),
      `Error message should be ${loginpage.ERROR_WRONG_CREDENTIALS}`,
    ).equal(loginpage.ERROR_WRONG_CREDENTIALS);
  });

  it('close login error message', async function () {
    await loginpage.enterUsername('wrong username');
    await loginpage.enterPsw('wrong password');
    await loginpage.clickLoginButton();
    await loginpage.waitForErrorMessage();
    await loginpage.closeErrorMessage();

    expect(
      await loginpage.errorIsVisible(),
      'Error message should not be visible after being closed',
    ).equal(false);
  });

  it('login standard user', async function () {
    await loginpage.enterUsername('standard_user');
    await loginpage.enterPsw('secret_sauce');
    await loginpage.clickLoginButton();

    expect(
      await loginpage.succesLoginPage(),
      'Invetory page should be shown afer successfull login',
    );
  });

  it('login locked out user', async function () {
    await loginpage.enterUsername('locked_out_user');
    await loginpage.enterPsw('secret_sauce');
    await loginpage.clickLoginButton();
    await loginpage.waitForErrorMessage();

    expect(
      await loginpage.loginErrorMessage(),
      `Error message should be ${loginpage.ERROR_LOCKED_USER}`,
    ).equal(loginpage.ERROR_LOCKED_USER);
  });
});
