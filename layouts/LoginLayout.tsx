import { FC } from 'react';

interface LoginLayoutProps {
	children: React.ReactNode;
}

const LoginLayout: FC<LoginLayoutProps> = ({ children }) => {
	return <div className='flex items-center justify-center h-screen'>{children}</div>;
};

export default LoginLayout;
