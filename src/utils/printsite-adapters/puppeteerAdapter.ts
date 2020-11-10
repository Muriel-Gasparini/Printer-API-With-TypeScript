import { Crawler, responseCrawler } from '../../presentation/protocols/crawler'
import Puppeteer from 'puppeteer'

export class PuppeteerAdapter implements Crawler {
  async print (url: string): Promise<responseCrawler> {
    const browser = await Puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    await page.screenshot({ path: 'example.png' })
    await browser.close()

    return await new Promise(resolve => resolve({
      message: 'success_message',
      isError: false
    }))
  }
}
