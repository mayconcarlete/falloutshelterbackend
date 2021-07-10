import { IValidate } from "../../../../../src/presentation/interfaces/validate";

export class MockValidator implements IValidate{
    validate(input: any): Error | undefined{
        return undefined
    }
}