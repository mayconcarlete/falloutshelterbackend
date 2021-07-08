import { CheckDateFormatError } from "../errors/check-date-format";
import { IValidate } from "../interfaces/validate";

export class CheckDateFormat implements IValidate{
    constructor(
        private readonly fieldName: string
    ){}
    validate(input: any): Error | undefined{
        const dateRegexp = /^\d{4}[-||/]\d{2}[-||/]\d{2}$/
        const validate = dateRegexp.test(input[this.fieldName])
        return validate === true ? undefined : new CheckDateFormatError()
    }
} 