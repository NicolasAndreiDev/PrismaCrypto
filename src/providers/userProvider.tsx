import React, { createContext, useState, useEffect, useCallback } from "react";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { parseCookies } from 'nookies';
import axios from "axios";

interface UserContext {
    user: {
        id: string,
        email: string,
        favcoins: [{id: string, coin: string}]
    } | null
    updateUser: () => Promise<void>;
}

export const UserContext = createContext<UserContext>({
    user: null,
    updateUser: async () => {}
});

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<{id: '', email: '', favcoins: [{id: '', coin: ''}]} | null>(null)

    const updateUser = useCallback(async () => {
        const { token } = parseCookies();
        if(token) {
            const decode = jwt.decode(token)
            const id = (decode as JwtPayload).userId;
            const response = await axios.get(`http://localhost:4000/users/${id}`)
            const listcoins = await axios.get(`http://localhost:4000/users/favcoins/${response.data.id}`)
            setUser({id: response.data.id, email: response.data.email, favcoins: listcoins.data})
        }
    },[])

    useEffect(() => {
        updateUser()
    },[updateUser])

    return(
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    )
}
