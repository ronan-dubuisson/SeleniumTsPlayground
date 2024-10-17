import {after, afterEach, beforeEach, before} from 'mocha';
import {assert} from 'chai';
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

  it('login standard user', async function () {
    await loginpage.enterUsername('standard_user');
    await loginpage.enterPsw('secret_sauce');
    await loginpage.clickLoginButton();

    await loginpage.waitUntilUrlIs(
      loginpage.URL_ON_SUCESS_LOGIN,
      loginpage.LOGIN_TIMEOUT,
    );
  });
});
