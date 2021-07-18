import { DwellerParams } from '../../../../../src/domain/models/dweller'

export const vault: DwellerParams = {
  age: '2020-06-02',
  eyeColor: 'brown',
  name: 'Maycon',
  hairColor: 'brown'
}

export const expectedResponse: DwellerParams = {
  age: '2020-06-02',
  eyeColor: 'BROWN',
  name: 'MAYCON',
  hairColor: 'BROWN'
}
