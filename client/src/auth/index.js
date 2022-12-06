import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_GUEST_USER: "LOGIN_GUEST_USER",
    EXIT_GUEST_USER: "EXIT_GUEST_USER"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMessage: null,
        guest_user: false,
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
                    errorMessage: null,
                    guest_user: auth.guest_user
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: payload.errorMessage,
                    guest_user: false
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: null,
                    guest_user: false
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: payload.errorMessage,
                    guest_user: false
                })
            }
            case AuthActionType.LOGIN_GUEST_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: false,
                    guest_user: true
                })
            }
            case AuthActionType.EXIT_GUEST_USER: {
                return setAuth({
                    user:null,
                    loggenIn: false,
                    errorMessage: false,
                    guest_user: false
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(firstName, lastName, email, password, passwordVerify) {
        console.log("REGISTERING USER");
        try{   
            const response = await api.registerUser(firstName, lastName, email, password, passwordVerify);   
            if (response.status === 200) {
                console.log("Registered Sucessfully");
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user,
                        loggedIn: true,
                        errorMessage: null
                    }
                })
                history.push("/login");
                console.log("NOW WE LOGIN");
                auth.loginUser(email, password);
                console.log("LOGGED IN");
            }
        } catch(error){
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: auth.user,
                    loggedIn: false,
                    errorMessage: error.response.data.errorMessage
                }
            })
        }
    }

    auth.likeList = async function (id) {
        let response = "";
        try {
            if (!auth.user.like_list.includes(id)) {
                response = await api.likeList(id);
                if (response.data.success) {
                    auth.getLoggedIn();
                }
            }
            else 
                console.log(response.data.user)
        } catch(error) {

        }
    }

    auth.loginUser = async function(email, password) {
        try{
            const response = await api.loginUser(email, password);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user,
                        loggedIn: true,
                        errorMessage: null
                    }
                })
                history.push("/");
            }
        } catch(error){
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: auth.user,
                    loggedIn: false,
                    errorMessage: error.response.data.errorMessage
                }
            })
        }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    auth.loginAsGuest = function () {
        authReducer( {
            type: AuthActionType.LOGIN_GUEST_USER,
            payload: null
        })
        history.push("/");
    }

    auth.exitGuest = function () {
        authReducer( {
            type: AuthActionType.EXIT_GUEST_USER,
            payload: null
        })
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