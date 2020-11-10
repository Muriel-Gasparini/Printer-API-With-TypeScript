import { Crawler, responseCrawler } from '../../presentation/protocols/crawler'

export class PuppeteerAdapter implements Crawler {
  print (url: string): responseCrawler {
    return {
      message: 'success_message',
      isError: false
    }
  }
}
