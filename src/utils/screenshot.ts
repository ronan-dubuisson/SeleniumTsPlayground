import fs from 'fs';
import path from 'path';
import {WebDriver} from 'selenium-webdriver';

export class Screenshot {
  private pngAsBase64!: string;
  private readonly screenshotFolder: string = 'testReports/E2E/screenshots';

  constructor() {
    if (!fs.existsSync(this.screenshotFolder)) {
      fs.mkdirSync(this.screenshotFolder, {recursive: true});
    }
  }

  async save(driver: WebDriver, testTitle: string | undefined) {
    try {
      if (testTitle == undefined) {
        testTitle = '';
      }
      const fileName = path.join(
        this.screenshotFolder,
        `screenshot_${testTitle.replace(/\s/g, '-')}.png`,
      );

      fs.writeFileSync(fileName, await driver.takeScreenshot(), 'base64');
      this.pngAsBase64 = fs.readFileSync(fileName, 'base64');
    } catch (error) {
      console.error(error);
    }
  }

  get() {
    return 'data:image/png;base64,' + this.pngAsBase64;
  }
}
