import { FC } from 'react';

interface MainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
	return <div className='flex items-center justify-center h-screen'>{children}</div>;
};

export default MainLayout;
