import {Typography} from "@material-ui/core";
import {useQueryCurrentAuthUser} from "../hooks/useQueryCurrentAuthUser";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";


export const ProfilePage = () => {
    const { user, isLoading } = useQueryCurrentAuthUser();
    const history = useHistory();

    useEffect(() => {
        if (!isLoading && !user){
            history.push('/');
        }
    }, [user, history])

    return (
        <div>
            { !isLoading && user && <div>
                <Typography>
                    {user.email}
                </Typography>

                <Typography>
                    {user.name}
                </Typography>

                <img alt='Profile' src={user.picture}/>
            </div>}
        </div>
    )
}