import {useLocalStorage} from "./useLocalStorage";

export const useGitHubO2AuthToken = () => {
    const { get } = useLocalStorage();
    const token = get('github_token');

    return {
        token,
    }
}