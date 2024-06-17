import NavBar from '@/components/navbar';
import { FC } from 'react';

interface MainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
	return (
		<div className='flex'>
			<NavBar />
			{children}
		</div>
	);
};

export default MainLayout;
