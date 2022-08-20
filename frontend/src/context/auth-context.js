import {createContext} from 'react';

// Creating a context allows you to share a state across all components 
// without needing to pass props.
// First key (isLoggedIn) is initial state.
// AuthContext wrapped around the enter Router in App.js so every component 
// has access to AuthContext.
export const AuthContext = createContext({
    isLoggedIn: false, 
    userId: null, // Track the userId to pass get the currently logged on user and pass the creator id into the createNewPlace request in NewPlace.js.
    login: () => {}, 
    logout: () => {}
});