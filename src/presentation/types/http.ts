export type THttpRequest = {
  headers?: any
  params?: any
  body?: any
  time?: string
}

export type THttpResponse = {
  statusCode: number
  body: any
}
