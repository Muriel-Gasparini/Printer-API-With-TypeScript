import { Crawler } from '../../protocols/crawler'
import { httpRequest, httpResponse } from './printer-controller-protocols'

export class PrinterController {
  private readonly crawler: Crawler

  constructor (crawler: Crawler) {
    this.crawler = crawler
  }

  handle (request: httpRequest): httpResponse {
    this.crawler.print(request.body)
    return {
      status: 200
    }
  }
}
