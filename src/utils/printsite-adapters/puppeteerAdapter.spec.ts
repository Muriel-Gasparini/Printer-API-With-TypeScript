import { PuppeteerAdapter } from './puppeteerAdapter'

describe('Puppeteer Adapter', () => {
  test('Make sure PuppeteerAdapter receive the url correctly', () => {
    const sut = new PuppeteerAdapter()
    const bodyController = 'https://any_site.com'
    sut.print(bodyController)
    expect({ message: 'success_message', isError: false })
  })
})
