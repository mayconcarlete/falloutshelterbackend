export class RequiredFieldError extends Error {
  constructor (fieldName: string) {
    super()
    this.name = 'RequiredFieldError'
    this.message = `Required field missing: ${fieldName}`
  }
}
