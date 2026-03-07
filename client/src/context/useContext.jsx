import { createContext, useContext, useState } from 'react'

const AuthContext = createContext();


export const AuthProvider = ( { children } ) => {
    const [accessToken, setAccessToken] = useState(null);

       console.log("Access Token", accessToken)

    return (
        <AuthContext.Provider value = { {accessToken, setAccessToken }}>

           
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)