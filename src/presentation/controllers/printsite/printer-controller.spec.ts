import { PrinterController } from './printer-controller'

describe('PrinterController', () => {
  test('Ensure that 200 returns if a valid request is sent', () => {
    const sut = new PrinterController()
    const httpRequest = {
      body: 'https://any_site.com'
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual({ status: 200 })
  })
})
