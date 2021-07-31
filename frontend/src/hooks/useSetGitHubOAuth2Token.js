import {useLocalStorage} from "./useLocalStorage";

export const useSetGitHubO2AuthToken = () => {
    const { set } = useLocalStorage();

    return (token) => set('github_token', token);
}