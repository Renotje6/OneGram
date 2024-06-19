import { UserCredential } from 'firebase/auth';
import React, { createContext, useContext } from 'react';

interface UserType extends UserCredential {
	name: string;
}

interface UserContext {
	user: UserType | null;
	setUser: (user: UserType | null) => void;
}

const UserContext = createContext<UserContext>({} as UserContext);

interface UserProviderProps {
	children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [user, setUser] = React.useState<UserType | null>(null);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
