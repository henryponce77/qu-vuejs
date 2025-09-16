export type JokeType = "general" | "programming" | "knock-knock" | "dad";

export interface JokeTypeOption {
    value: string;
    label: string;
    selected?: boolean;
}

export interface Joke {
    id: string;
    type: JokeType;
    setup: string;
    punchline: string;
};

export interface JokeFilterOptions {
    orderDirection: string;
    perPage: number;
    page: number;
    type: string;
}