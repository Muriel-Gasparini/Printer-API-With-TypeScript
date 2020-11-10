import { Crawler } from '../../protocols/crawler'
import { ClientDownloader, httpRequest, httpResponse, internalError } from './printer-controller-protocols'

export class PrinterController {
  private readonly crawler: Crawler
  private readonly clientDownloader: ClientDownloader

  constructor (crawler: Crawler, clientDownloader: ClientDownloader) {
    this.crawler = crawler
    this.clientDownloader = clientDownloader
  }

  handle (request: httpRequest): httpResponse {
    const responseCrawler = this.crawler.print(request.body)
    if (responseCrawler.isError) {
      return internalError(new Error('There was an internal error, we apologize'))
    }
    const responseClientDownloader = this.clientDownloader.download(request.body)
    if (responseClientDownloader.isError) {
      return internalError(new Error('There was an internal error, we apologize'))
    }
    return {
      status: 200
    }
  }
}
