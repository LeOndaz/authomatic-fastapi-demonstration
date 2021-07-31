import {useCallback} from "react";


export const useLocalStorage = () => {
    const get = useCallback((key) => {
        return JSON.parse(localStorage.getItem(key));
    }, [])

    const set = useCallback((key, val) => {
        return localStorage.setItem(key, JSON.stringify(val));
    }, []);

    const remove = useCallback((key) => {
        return localStorage.removeItem(key);
    }, []);

    return {
        get, set, remove
    }
}