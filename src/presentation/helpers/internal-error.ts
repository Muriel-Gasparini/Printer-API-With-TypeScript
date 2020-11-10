import { httpResponse } from '../protocols/http'
export const internalError = (message: Error): httpResponse => {
  return {
    status: 500,
    body: message
  }
}
