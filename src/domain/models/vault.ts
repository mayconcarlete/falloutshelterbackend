export enum EyeColor {
    BROWN = "BROWN",
    GREEN = "GREEN",
    BLUE = "BLUE"
}   

export type Vault = {
    name: string
    age: number
    hairColor: string
    eyeColor: EyeColor
    id: string
}

export type VaultParams = Omit<Vault, 'id'>