import { APP_URL, URL_TOTAL_JOKES } from "@/constants";
import type { JokeFilterOptions } from "@/types";

export const get = async <T>(url: string) => {
    const response = await fetch(url);
    return response.json() as T;
};

export const getTotalJokesUrl = (type: string) => {
    return URL_TOTAL_JOKES + `/${type}`;
}

export const buildJokesUrl = (options: JokeFilterOptions) => {
    return APP_URL + `jokes_paginated/${options.type}/${options.page}/${options.perPage}/${options.orderDirection}`;
}

export const getJokes = async <T>(options: JokeFilterOptions) => {
    return get<T>(buildJokesUrl(options));
}