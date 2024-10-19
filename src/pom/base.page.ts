import {Locator, until, WebDriver, WebElement} from 'selenium-webdriver';
import {Screenshot} from '../utils/screenshot.js';

export class BasePage {
  public driver: WebDriver;
  public screenshot: Screenshot;

  constructor(driver: WebDriver) {
    this.driver = driver;
    this.driver.manage().window().maximize();
    this.screenshot = new Screenshot();
  }

  async visit(url: string) {
    if (!new RegExp('^https?:').test(url)) {
      throw new Error('invalid url: ' + url);
    } else {
      return this.driver.navigate().to(url);
    }
  }

  async title() {
    return this.driver.getTitle();
  }

  async currentUrl() {
    return (await this.driver.getCurrentUrl()).toString();
  }

  async click(locator: Locator) {
    return this.driver.findElement(locator).click();
  }

  async getPlaceholderText(locator: Locator) {
    const element: WebElement = this.driver.findElement(locator);
    return element.getAttribute('placeholder');
  }
  async getText(locator: Locator) {
    return this.driver.findElement(locator).getText();
  }

  async entertext(locator: Locator, text: string) {
    return this.driver.findElement(locator).sendKeys(text);
  }

  async takeScreenshot(testName?: string) {
    await this.screenshot.save(this.driver, testName);
    return this.screenshot.get();
  }

  async elementIsOnPage(locator: Locator) {
    try {
      await this.driver.findElement(locator);
      return true;
    } catch (e) {
      return false;
    }
  }

  async waitUntilUrlIs(url: string, timeout?: number) {
    return this.driver.wait(until.urlIs(url), timeout);
  }

  async waitUntilDisplayed(locator: Locator, timeout?: number) {
    return this.driver.wait(until.elementLocated(locator), timeout);
  }

  async close() {
    return this.driver.quit();
  }
}
