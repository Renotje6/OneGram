import NavBar from '@/components/navbar';
import SideBar from '@/components/sidebar';
import { FC } from 'react';

interface MainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
	return (
		<div className='flex'>
			<NavBar />
			<main className='flex-grow justify-center items-center'>{children}</main>
			<SideBar />
		</div>
	);
};

export default MainLayout;
