import { IValidate } from "../../../../../src/presentation/interfaces/validate";

export class MockedValidator implements IValidate {
    validate(input: any): Error | undefined {
        return undefined
    }
}