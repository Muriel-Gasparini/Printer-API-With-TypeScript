import { Crawler, responseCrawler } from '../../presentation/protocols/crawler'
import captureWebsite from 'capture-website'

export class CaptureWebsiteAdapter implements Crawler {
  async print (url: string): Promise<responseCrawler> {
    try {
      await captureWebsite.file(url, 'screenshot.png', {
        launchOptions: {
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      })
      return await new Promise(resolve => resolve({
        message: 'success_message',
        isError: false
      }))
    } catch (error) {
      console.log(error)
      return await new Promise((resolve, reject) => reject({ message: 'error_message', isError: true }))
    }
  }
}
