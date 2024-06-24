import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { FC, ReactNode } from 'react';
import { UserProvider } from './contexts/userContext';

interface Props {
	children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
	return (
		<NextUIProvider>
			<NextThemesProvider
				attribute='class'
				defaultTheme='dark'>
				<UserProvider>{children}</UserProvider>
			</NextThemesProvider>
		</NextUIProvider>
	);
};

export default Providers;
