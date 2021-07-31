import {useLocalStorage} from "./useLocalStorage";

export const useGoogleO2AuthToken = () => {
    const { get } = useLocalStorage();
    const token = get('google_token');

    return {
        token,
    }
}