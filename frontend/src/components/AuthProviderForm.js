import {Button, FormControl, makeStyles, MenuItem, Select, Typography} from "@material-ui/core";
import {useState} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {useSetUser} from "../hooks/useSetUser";


const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
})
export const AuthProviderForm = ({onSubmit}) => {
    const [provider, setProvider] = useState('');
    const classes = useStyles();
    const { remove } = useLocalStorage();
    const setUser = useSetUser();

    const handleSelectChange = (evt) => {
        setProvider(evt.target.value);
    }

    const handleSubmit = () => {
        if (!provider){
            return;
        }

        onSubmit(provider);
    }

    const logout = () => {
        setUser(null);
        remove('google_token');
        remove('github_token');
    }

    return (
        <form className={classes.form}>

            <Typography>
                Choose your auth provider.
            </Typography>

            <br/>

            <FormControl>
                <Select onChange={handleSelectChange} value={provider}>
                    <MenuItem value='google'>
                        Login with Google
                    </MenuItem>
                    <MenuItem value='github'>
                        Login with GitHub
                    </MenuItem>
                </Select>
            </FormControl>

            <br/>

            <Button color='primary' variant='contained' type='button' onClick={handleSubmit}>
                Log in
            </Button>

            <Button onClick={logout} type='button'>
                Log out
            </Button>

        </form>
    );
}
