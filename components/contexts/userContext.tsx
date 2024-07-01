'use client';

import { auth, db } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect } from 'react';

interface UserType {
	uid: string;
	name: string;
	email: string;
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
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		async function getUser() {
			if (auth.currentUser) {
				const userCollection = collection(db, 'users');
				const userDocRef = doc(userCollection, auth.currentUser.uid);

				const userDocSnap = await getDoc(userDocRef);

				if (userDocSnap.exists()) {
					setUser({
						uid: auth.currentUser.uid,
						name: userDocSnap.data().name,
						email: userDocSnap.data().email,
					});
				} else {
					auth.signOut();
					router.push('/login');
				}
			}
		}
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			if (authUser) {
				await getUser();
			} else {
				setUser(null);
				if (pathname !== '/login' && pathname !== '/register') router.push('/login');
			}
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, [router, pathname]);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
