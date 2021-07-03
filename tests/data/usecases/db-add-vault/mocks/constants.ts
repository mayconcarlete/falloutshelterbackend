import { VaultParams } from "../../../../../src/domain/models/vault";

export const vault:VaultParams = {
    age: '2020-06-02',
    eyeColor: 'brown',
    name: 'Maycon',
    hairColor: 'brown'
}

export const expected_response:VaultParams = {
    age: '2020-06-02',
    eyeColor: 'BROWN',
    name: 'MAYCON',
    hairColor: 'BROWN'
} 
