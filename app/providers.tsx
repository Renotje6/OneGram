import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { FC, ReactNode } from 'react';
import { UserProvider } from './contexts/userContext';
import { ModalsProvider } from '@/hooks/useModals';

interface Props {
	children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
	return (
		<NextUIProvider>
			<NextThemesProvider
				attribute='class'
				defaultTheme='dark'>
				<UserProvider>
					<ModalsProvider>{children}</ModalsProvider>
				</UserProvider>
			</NextThemesProvider>
		</NextUIProvider>
	);
};

export default Providers;
