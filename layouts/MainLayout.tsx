'use client';

import NavBar from '@/components/navbar';
import SideBar from '@/components/sidebar';
import { FC, useEffect, useState } from 'react';

interface MainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
	const [hydrating, setHydrating] = useState(true);

	useEffect(() => {
		console.log('MainLayout');

		setHydrating(false);
	}, []);

	if (hydrating) return;

	return (
		<div className='flex'>
			<NavBar />
			<main className='flex-grow justify-center items-center'>{children}</main>
			<SideBar />
		</div>
	);
};

export default MainLayout;
