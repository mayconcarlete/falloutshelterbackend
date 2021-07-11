export class CheckDateFormatError extends Error {
  constructor () {
    super()
    this.name = 'DateFormatError'
    this.message = 'Date in wrong format, only accepts format: YYYY-MM-DD or YYYY/MM/DD'
  }
}
