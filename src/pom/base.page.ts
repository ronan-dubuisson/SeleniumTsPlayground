import {Locator, until, WebDriver} from 'selenium-webdriver';
import {Screenshot} from '../utils/screenshot.js';

export class BasePage {
  public driver: WebDriver;
  public screenshot: Screenshot;

  constructor(driver: WebDriver) {
    this.driver = driver;
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

  async elementIsVisible(locator: Locator) {
    await this.driver.wait(until.elementIsVisible(locator));
    return this.driver.wait(until.elementIsVisible(locator));
  }

  async waitUntilUrlIs(url: string, timeout: number) {
    return this.driver.wait(until.urlIs(url), timeout);
  }

  async close() {
    return this.driver.quit();
  }
}
