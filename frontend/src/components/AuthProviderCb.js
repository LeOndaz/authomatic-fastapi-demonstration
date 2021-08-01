import {
    useParams,
    useHistory,
} from 'react-router-dom';
import {useQueryParams} from "../hooks/useQueryParams";
import {useSetGoogleO2AuthToken} from "../hooks/useSetGoogleOAuth2Token";
import {useEffect} from "react";
import {useSetUser} from "../hooks/useSetUser";
import {useSetGitHubO2AuthToken} from "../hooks/useSetGitHubOAuth2Token";

export const AuthProviderCb = () => {
    const {provider} = useParams();
    const queryParams = useQueryParams();
    const token = queryParams.get('token');
    const history = useHistory();
    const setUser = useSetUser();
    const setGoogleOAuth2Token = useSetGoogleO2AuthToken()
    const setGitHubOAuth2Token = useSetGitHubO2AuthToken();

    useEffect(() => {
        if (!token) {
            return;
        }

        if (provider === 'google') {
            setGoogleOAuth2Token(token);
        }

        if (provider === 'github') {
            setGitHubOAuth2Token(token);
        }

        history.push('/me')
    }, [token, setGoogleOAuth2Token, setGitHubOAuth2Token, provider, history])


    return null;
}