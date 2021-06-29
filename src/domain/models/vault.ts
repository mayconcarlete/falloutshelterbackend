export type Vault = {
    name: string
    age: number
    hairColor: string
    eyeColor: string
    id: string
}

export type VaultParams = Omit<Vault, 'id'>