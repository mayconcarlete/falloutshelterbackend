export type Vault = {
    name: string
    age: string
    hairColor: string
    eyeColor: string
    id: string
}

export type VaultParams = Omit<Vault, 'id'>