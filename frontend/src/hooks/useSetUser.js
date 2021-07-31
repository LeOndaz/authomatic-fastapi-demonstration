import {useContext} from "react";
import {SetUserContext, UserContext} from "../contexts/userContexts";


export const useSetUser = () => useContext(SetUserContext);
export const useUser = () => useContext(UserContext);