import { CaptureWebsiteAdapter } from './captureWebsiteAdapter'

jest.setTimeout(30000)

describe('CaptureWebsite Adapter', () => {
  test('Make sure CaptureWebsiteAdapter receive the url correctly', async () => {
    const sut = new CaptureWebsiteAdapter()
    const bodyController = 'https://youtube.com'
    const responseCaptureWebsite = await sut.print(bodyController)
    expect(responseCaptureWebsite).toEqual({ message: 'success_message', isError: false })
  })

  test('Make sure that the CaptureWebsite will return an error if an error occurs', async () => {
    const sut = new CaptureWebsiteAdapter()
    const bodyController = 'https://bug_site.com'
    const promiseResult = sut.print(bodyController)
    await expect(promiseResult).rejects.toEqual({ message: 'error_message', isError: true })
  })
})
