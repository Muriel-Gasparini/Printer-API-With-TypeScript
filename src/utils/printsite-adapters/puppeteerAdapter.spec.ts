import { PuppeteerAdapter } from './puppeteerAdapter'
import { responseCrawler } from '../../presentation/protocols/crawler'

const makePuppeteerAdapterStub = (): PuppeteerAdapter => {
  class PuppeteerAdapterStub implements PuppeteerAdapter {
    async print (url: string): Promise<responseCrawler> {
      return {
        message: 'success_message',
        isError: false
      }
    }
  }
  return new PuppeteerAdapterStub()
}

describe('Puppeteer Adapter', () => {
  test('Make sure PuppeteerAdapter receive the url correctly', async () => {
    const sut = makePuppeteerAdapterStub()
    const bodyController = 'https://google.com'
    const responsePuppeteer = await sut.print(bodyController)
    expect(responsePuppeteer).toEqual({ message: 'success_message', isError: false })
  })

  test('Make sure that the puppeteer will return an error if an error occurs', async () => {
    const puppeteerAdapterStub = makePuppeteerAdapterStub()
    jest.spyOn(puppeteerAdapterStub, 'print').mockReturnValueOnce(new Promise((resolve) => resolve({ message: 'error_message', isError: true })))
    const bodyController = 'https://bug_site.com'
    const promiseResult = puppeteerAdapterStub.print(bodyController)
    await expect(promiseResult).resolves.toEqual({ message: 'error_message', isError: true })
  })
})
