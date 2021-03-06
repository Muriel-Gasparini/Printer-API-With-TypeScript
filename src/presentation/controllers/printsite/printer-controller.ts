import { Crawler } from '../../protocols/crawler'
import { httpRequest, httpResponse, internalError } from './printer-controller-protocols'

export class PrinterController {
  private readonly crawler: Crawler

  constructor (crawler: Crawler) {
    this.crawler = crawler
  }

  async handle (request: httpRequest): Promise<httpResponse> {
    const responseCrawler = await this.crawler.print(request.body)
    if (responseCrawler.isError) {
      return internalError(new Error('There was an internal error, we apologize'))
    }
    return {
      status: 200
    }
  }
}
