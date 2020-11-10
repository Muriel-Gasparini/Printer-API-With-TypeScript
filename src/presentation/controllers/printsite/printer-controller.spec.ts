import { Crawler, responseCrawler, ClientDownloader, responseClientDownloader } from '../../controllers/printsite/printer-controller-protocols'
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

const makeClientDownloader = (): ClientDownloader => {
  class ClientDownloaderStub implements ClientDownloader {
    download (data: any): responseClientDownloader {
      return {
        message: 'success_message',
        isError: false
      }
    }
  }
  return new ClientDownloaderStub()
}

interface SutTypes {
  sut: PrinterController
  crawler: Crawler
  clientDownloader: ClientDownloader
}

const makeSut = (): SutTypes => {
  const crawler = makeCrawler()
  const clientDownloader = makeClientDownloader()
  const sut = new PrinterController(crawler, clientDownloader)
  return {
    sut,
    crawler,
    clientDownloader
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

  test('Ensure that the clientDownloader is called with the correct parameters', async () => {
    const { sut, clientDownloader } = makeSut()
    const clientDownloaderSpy = jest.spyOn(clientDownloader, 'download')
    const httpRequest = {
      body: 'https://any_site.com'
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ status: 200 })
    expect(clientDownloaderSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Make sure to throw error if the clientDownloader throws error', async () => {
    const { sut, clientDownloader } = makeSut()
    jest.spyOn(clientDownloader, 'download').mockReturnValueOnce({ message: 'error_message', isError: true })
    const httpRequest = {
      body: 'https://any_site.com'
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({ status: 500, body: new Error('There was an internal error, we apologize') })
  })
})
