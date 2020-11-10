import { httpRequest, httpResponse } from './printer-controller-protocols'

export class PrinterController {
  handle (url: httpRequest): httpResponse {
    return {
      status: 200
    }
  }
}
