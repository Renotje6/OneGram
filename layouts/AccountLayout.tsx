import { FC } from 'react';

interface AccountLayoutProps {
	children: React.ReactNode;
}

const AccountLayout: FC<AccountLayoutProps> = ({ children }) => {
	return <div className='flex items-center justify-center h-screen'>{children}</div>;
};

export default AccountLayout;
