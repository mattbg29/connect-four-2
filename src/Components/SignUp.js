import writeScore from './WriteScore';
import { createContext, useState } from 'react';

const Auth = ''

// I use UserContext for keeping track of whether the user is logged in
export const UserContext = createContext({ name: '', auth: false, setName: () => {}})

// UserProvider is wrapped around the full App in index.js, so its 'children' refer to the entire app.
// After processing the given function, I return children, ie the App, wrapped in a UserProvider
// with user, setUser, and the functions login and logout as props, enabling the entire app to
// call any of these

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ name: '', auth: true})

    async function login(username, password) {
        try {
            await Auth.signIn(username, password);
            console.log('login success')
            setUser(({
                ...user,
                name: username,
                auth: true,    
            }))
            //localStorage.setItem('curUser', user.attributes.email)
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    async function logout() {
        try {
            await Auth.signOut( {global: true });
            console.log("success")
            setUser(() => ({
                name: '',
                auth: false,
            }))
        } catch (error) {
            console.log('error signing out', error);
        }
            
    }

    async function signUp2(username, password) {
        try {
            await Auth.signUp({
                username,
                password,
                //    email,          // optional
                //    phone_number,   // optional - E.164 number convention
                    // other custom attributes 
                //},
                autoSignIn: { // optional - enables auto sign in after user is confirmed
                    enabled: true,
                }
            });
            writeScore(username, 0, 0)
            setUser(() => ({
                name: username,
                auth: false,
            }))
        } catch (error) {
            console.log('error signing up:', error);
        }
    }
    

    return (
        <UserContext.Provider value = {{ user, setUser, login, logout, signUp2 }}>
            {children}
        </UserContext.Provider>
    )
}



export async function signUp(username, password) {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            //    email,          // optional
            //    phone_number,   // optional - E.164 number convention
                // other custom attributes 
            //},
            autoSignIn: { // optional - enables auto sign in after user is confirmed
                enabled: true,
            }
        });
        console.log(user);
        writeScore(username, 0, 0)
    } catch (error) {
        console.log('error signing up:', error);
    }
}

//https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-out
