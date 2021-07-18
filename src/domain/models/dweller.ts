export type Dweller = {
  name: string
  age: string
  hairColor: string
  eyeColor: string
  id: string
}

export type DwellerParams = Omit<Dweller, 'id'>
