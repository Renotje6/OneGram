'use client';

import React, { createContext, useContext } from 'react';

interface UserType {
	uid: string;
	name: string;
	email: string;
}

interface UserContext {
	user: UserType;
	setUser: (user: UserType) => void;
}

const UserContext = createContext<UserContext>({} as UserContext);

interface UserProviderProps {
	children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [user, setUser] = React.useState<UserType>({} as UserType);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
