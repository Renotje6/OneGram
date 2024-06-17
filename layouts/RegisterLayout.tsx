import { FC } from 'react';

interface RegisterLayoutProps {
	children: React.ReactNode;
}

const RegisterLayout: FC<RegisterLayoutProps> = ({ children }) => {
	return <div className='flex items-center justify-center h-screen'>{children}</div>;
};

export default RegisterLayout;
