const storagePrefix = 'play_awards_';

export const storage = {
    getToken: () => {
        return JSON.parse(
            window.localStorage.getItem(`${storagePrefix}token`) as string
        );
    },
    getRefreshToken: () => {
        return JSON.parse(
            window.localStorage.getItem(`${storagePrefix}refresh_token`) as string
        );
    },
    setToken: (token: string) => {
        window.localStorage.setItem(
            `${storagePrefix}token`,
            JSON.stringify('Bearer ' + token)
        );
    },
    setRefreshToken: (token: string) => {
        window.localStorage.setItem(
            `${storagePrefix}refresh_token`,
            JSON.stringify('Bearer ' + token)
        );
    },
    clearTokens: () => {
        window.localStorage.removeItem(`${storagePrefix}token`);
        window.localStorage.removeItem(`${storagePrefix}refresh_token`);
    },
};