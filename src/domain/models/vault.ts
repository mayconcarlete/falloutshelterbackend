enum EyeColor {
    BROWN = "brown",
    GREEN = "green",
    BLUE = "blue"
}

export type Vault = {
    name: string
    age: number
    hairColor: string
    eyeColor: EyeColor
    id: string
}

export type VaultParams = Omit<Vault, 'id'>