'use client';

import { auth, db } from '@/config/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect } from 'react';

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

	async function getUser() {
		const userCollection = collection(db, 'users');
		const userDocRef = doc(userCollection, auth.currentUser!.uid);

		const userDocSnap = await getDoc(userDocRef);

		if (userDocSnap.exists()) {
			setUser({
				uid: auth.currentUser!.uid,
				name: userDocSnap.data().name,
				email: userDocSnap.data().email,
			});
		}
	}

	useEffect(() => {
		if (auth.currentUser && !user) getUser();
	}, [user]);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
