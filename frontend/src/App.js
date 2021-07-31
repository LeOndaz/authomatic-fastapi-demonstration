import {AuthProviderForm} from "./components/AuthProviderForm";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {AuthProviderCb} from "./components/AuthProviderCb";
import {SetUserContext, UserContext} from "./contexts/userContexts";
import {useState} from "react";
import {ProfilePage} from "./components/ProfilePage";
import {Button} from "@material-ui/core";
import {useLocalStorage} from "./hooks/useLocalStorage";


function App() {
    const [user, setUser] = useState(null);

    const handleSubmit = (provider) => {
        window.open(`http://localhost:8000/prototypes/${provider}`, '_self');
    }

    return (
        <div>
            <UserContext.Provider value={user}>
                <SetUserContext.Provider value={setUser}>
                    <Router>
                        <Switch>
                            <Route exact path='/'>
                                <AuthProviderForm onSubmit={handleSubmit}/>

                            </Route>
                            <Route path='/auth/:provider'>
                                <AuthProviderCb/>
                            </Route>
                            <Route exact path='/me'>
                                <ProfilePage/>
                            </Route>
                        </Switch>
                    </Router>
                </SetUserContext.Provider>
            </UserContext.Provider>
        </div>
    );
}

export default App;
