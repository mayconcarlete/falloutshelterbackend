export type TimeFoward = {
    id: string,
    time: string
}

export type TimeFowardParams = Omit<TimeFoward, 'id'>