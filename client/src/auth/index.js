import React, { createContext, useEffect, useState} from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    SHOW_ERROR: "SHOW_ERROR",
    HIDE_ERROR: "HIDE_ERROR",
    BROWSE_AS_GUEST: "BROWSE_AS_GUEST"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: false,
        errorMsg: null,
        isGuest: false
    });
    const history = useHistory();
    
    
    useEffect(() => {
        auth.getLoggedIn();
    }, []);
    

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: false,
                    isGuest: false
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: false,
                    errorMsg: null,
                    isGuest: false
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: false,
                    errorMsg: null,
                    isGuest: false
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: false,
                    errorMsg: null,
                    isGuest: false
                })
            }
            case AuthActionType.SHOW_ERROR: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    error: true,
                    errorMsg: payload.errorMsg,
                    isGuest: auth.isGuest
                })
            }
            case AuthActionType.HIDE_ERROR: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    error: false,
                    errorMsg: null,
                    isGuest: auth.isGuest
                })
            }
            case AuthActionType.BROWSE_AS_GUEST: {
                return setAuth({
                    user: false,
                    loggedIn: false,
                    error: false,
                    errorMsg: null,
                    isGuest: true
                }) 
            }
            default:
                return auth;
        }
    }

    auth.browseAsGuest = function () {
        console.log("Continuing as guest");
        if (auth.loggedIn) {
            return;
        }
        authReducer({
            type: AuthActionType.BROWSE_AS_GUEST
        });
    }
    auth.getLoggedIn = async function () {
        if (auth.loggedIn) {
            return; // No need, already logged in.
        }
        try {
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                if (response.data.user !== null) {
                    console.log("Cookie found for user:");
                    let user = response.data.user;
                    console.log(user);
                    alert("Welcome Back, " + user.firstName + " " + user.lastName + "!");
                    authReducer({
                        type: AuthActionType.GET_LOGGED_IN,
                        payload: {
                            user: user,
                            loggedIn: response.data.loggedIn
                        }
                    });

                    if (history.location.pathname.indexOf("/top5list/") !== -1) {
                        let id = history.location.pathname.substring(history.location.pathname.indexOf("/top5list/") + 10);
                        const res = await api.getTop5ListById(id);
                        if (res.data.success) {
                            let top5List = res.data.top5List;
                            
                            if (top5List.ownerEmail !== user.email) {
                                alert("No authorization to access this list.");
                                history.push("/");
                                return;
                            }
                            else {
                                console.log("Restoring list");
                                console.log(id);
                                history.push("/");
                                //history.push(history.location.pathname);
                            }
                        }
                        
                    }
                    else {
                        history.push("/"); // re-render the home screen
                    }
                    
                }
            }
        }
        catch (e) {
            let idPresent = history.location.pathname.indexOf("/top5list/") !== -1;
            console.log(idPresent);
            if (idPresent && e.response && e.response.data && e.response.data.errorMessage) {
                console.log("Invalid list access!");
                alert(e.response.data.errorMessage);
                if (e.response.data.errorMessage === "Unauthorized") {
                    history.push("/");
                }
            }
            console.log(e);
            console.log("No pre-existing cookie found.");
        }
    }

    auth.registerUser = async function(userData, store) {

        try {
            const response = await api.registerUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user,
                    }
                })
                history.push("/");
                store.loadLists();
            }
        }
        catch (e) {
            //alert(e.response.data.errorMessage);
            console.log(e);
            authReducer({
                type: AuthActionType.SHOW_ERROR,
                payload: {
                    errorMsg: e.response.data.errorMessage
                }
            });
        }
    }

    auth.loginUser = async function(payload, store) {

        try {
            const response = await api.loginUser(payload);

            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user,
                    }
                })
                history.push("/");
                store.loadLists();
            }
        }
        catch (e) {
            //alert(e.response.data.errorMessage);
            authReducer({
                type: AuthActionType.SHOW_ERROR,
                payload: {
                    errorMsg: e.response.data.errorMessage
                }
            });
        }
    }

    auth.logoutUser = async function() {
        try {
            const response = await api.logoutUser();

            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGOUT_USER,
                });
                history.push("/");
            }
        }
        catch (e) {console.log(e);}
    }

    auth.hideError = function() {
        authReducer({
            type: AuthActionType.HIDE_ERROR,
        });
    }
    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };