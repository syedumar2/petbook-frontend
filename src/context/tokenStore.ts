let accessToken: string | null = null;


export const setAccessToken = (token: string | null) => {
    accessToken = token;

};
export const getAccessToken = (): string | null => {
    return accessToken;
}

export const clearTokens = () => {
    accessToken = null;
}