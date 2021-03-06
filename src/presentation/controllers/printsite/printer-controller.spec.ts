import { Crawler, responseCrawler } from '../../controllers/printsite/printer-controller-protocols'
import { PrinterController } from './printer-controller'

const makeCrawler = (): Crawler => {
  class CrawlerStub implements Crawler {
    async print (url: string): Promise<responseCrawler> {
      return {
        message: 'any_message',
        isError: false
      }
    }
  }
  return new CrawlerStub()
}

interface SutTypes {
  sut: PrinterController
  crawler: Crawler
}

const makeSut = (): SutTypes => {
  const crawler = makeCrawler()
  const sut = new PrinterController(crawler)
  return {
    sut,
    crawler
  }
}

describe('PrinterController', () => {
  test('Ensure that 200 returns if a valid request is sasync ent', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: 'https://any_site.com'
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ status: 200 })
  })

  test('Ensure that the crawler is called with the correct body', async () => {
    const { sut, crawler } = makeSut()
    const crawlerSpy = jest.spyOn(crawler, 'print')
    const httpRequest = {
      body: 'https://any_site.com'
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ status: 200 })
    expect(crawlerSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Make sure to throw error if the crawler throws error', async () => {
    const { sut, crawler } = makeSut()
    jest.spyOn(crawler, 'print').mockReturnValueOnce(new Promise(resolve => resolve({ message: 'error_message', isError: true })))
    const httpRequest = {
      body: 'https://any_site.com'
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ status: 500, body: new Error('There was an internal error, we apologize') })
  })
})
