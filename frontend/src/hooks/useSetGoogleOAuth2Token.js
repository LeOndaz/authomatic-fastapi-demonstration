import {useLocalStorage} from "./useLocalStorage";

export const useSetGoogleO2AuthToken = () => {
    const { set } = useLocalStorage();

    return (token) => set('google_token', token);
}