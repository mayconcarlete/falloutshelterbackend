import { THttpRequest, THttpResponse } from '../types/http'

export interface Middleware {
  handle: (request: THttpRequest) => Promise<THttpResponse>
}
