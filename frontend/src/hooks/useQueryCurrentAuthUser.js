import {useLocalStorage} from "./useLocalStorage";
import {useEffect, useMemo, useState} from "react";
import {useSetUser, useUser} from "./useSetUser";


export const useQueryCurrentAuthUser = () => {
    const {get} = useLocalStorage();
    const google_token = get('google_token');
    const github_token = get('github_token');
    const user = useUser();
    const setUser = useSetUser();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!github_token && !google_token) return;
        setIsLoading(true);

        fetch('http://localhost:8000/me', {
            method: 'POST',
            body: JSON.stringify({
                token: github_token ? github_token : google_token,
                provider: github_token ? 'github' : 'google',
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(r => r.json())
            .then((r) => {
                setIsLoading(false);
                setUser(r.user);
            })
            .catch(err => {
                console.log('Err..')
                setIsLoading(false);
            })
    }, [])

    return useMemo(() => {
        return {
            user,
            isLoading,
        }
    }, [
        user,
        isLoading,
    ])
}