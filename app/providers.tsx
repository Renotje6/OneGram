import { NextUIProvider } from '@nextui-org/react';
import { FC, ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface Props {
	children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
	return (
		<NextUIProvider>
			<NextThemesProvider
				attribute='class'
				defaultTheme='dark'>
				{children}
			</NextThemesProvider>
		</NextUIProvider>
	);
};

export default Providers;
