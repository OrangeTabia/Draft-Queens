import { createContext, useContext, useState } from 'react';

const UserRoleContext = createContext();

export function UserRoleProvider({ children }) {
    const [userRole, setUserRole] = useState(""); 

    return (
        <UserRoleContext.Provider  value={{ userRole }}>
            {children}
        </UserRoleContext.Provider>
    )
}; 

export const useUserRole = () => {
    return useContext(UserRoleContext)
}
