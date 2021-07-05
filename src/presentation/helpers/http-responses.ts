import { NotFoundError } from '../errors/not-found'
import { THttpResponse } from '../types/http'

export const ok = (data: any): THttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}

export const badRequest = (error: Error): THttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const serverError = (error: Error): THttpResponse => {
  return {
    statusCode: 500,
    body: error
  }
}

export const notFound = (error: NotFoundError): THttpResponse => {
  return {
    statusCode: 404,
    body: error
  }
}
