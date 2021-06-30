import { VaultParams } from "../../../../../src/domain/models/vault";

export const vault:VaultParams = {
    age:1,
    eyeColor: 'brown',
    name: 'Maycon',
    hairColor: 'brown'
}

export const expected_response:VaultParams = {
    age:1,
    eyeColor: 'BROWN',
    name: 'MAYCON',
    hairColor: 'BROWN'
} 