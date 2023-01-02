import { createContext, useState } from 'react';
import { updatedLoggedIn, getLoggedIn, getAll } from './WriteScore';

// I use UserContext for keeping track of whether the user is logged in
export const UserContext = createContext({ name: '', auth: false, setName: () => {}})

// UserProvider is wrapped around the full App in index.js, so its 'children' refer to the entire app.
// After processing the given function, I return children, ie the App, wrapped in a UserProvider
// with user, setUser, and the functions login and logout as props, enabling the entire app to
// call any of these

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ name: '', auth: true})
    const [token, setToken] = useState('')
    const [loggedIn, setLoggedIn] = useState('')

    async function login(username, password) {
        try {
            const response = await fetch("http://localhost:3031/posts/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'email': username,
                    'password': password
                }),
            })
    
            const data = await response.json()
            //console.log(data)
            if (response.ok) {
                setUser(() => ({
                    name: username,
                    auth: false,
                }))
                setToken(data.token)    
                //const resp = await updatedLoggedIn(data.token)
                //console.log('hooo')
                //console.log(resp)
                let loggedIn = await getAll(data.token)
                loggedIn = loggedIn.map((log) => log["email"])
                setLoggedIn(loggedIn)

            } else {
                return data
            }
          
        } catch (error) {
            console.log('error signing in:', error);
        }
    }

    async function logout() {
        try {
            setUser(() => ({
                name: '',
                auth: false,
            }))
            setToken(() => (''))
        } catch (error) {
            console.log('error signing out', error);
        }
            
    }

    async function signUp2(username, password) {
        try {
            const response = await fetch("http://localhost:3031/posts/signup", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'username': 'test a',
                    'email': username,
                    'password': password
                }),
            })
    
            const data = await response.json()
            if (response.ok) {
                setUser(() => ({
                    name: username,
                    auth: false,
                }))
                setToken(data.token)    
                updatedLoggedIn(data.token)
            } else {
                return data
            }          
        } catch (error) {
            console.log('error signing up:', error);
        }
    }
    

    return (
        <UserContext.Provider value = {{ user, token, loggedIn, setUser, login, logout, signUp2 }}>
            {children}
        </UserContext.Provider>
    )
}




//https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-out
