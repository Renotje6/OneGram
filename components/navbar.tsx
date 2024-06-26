import { Button, Divider } from '@nextui-org/react';
import Link from 'next/link';
import { FC } from 'react';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';

interface NavBarProps {}

const NavBar: FC<NavBarProps> = ({}) => {
	return (
		<nav className='bg-black/20 text-black min-h-screen w-80 flex-col gap-5 justify-between shadow-lg hidden lg:flex min-w-80'>
			<div className='h-screen p-4 flex justify-between flex-col fixed gap-5 w-80'>
				<p className='text-5xl font-semibold dark:text-zinc-200'>OneGram</p>
				<div className='flex-grow'>
					<NavButton
						icon={<FaHome className='size-6 dark:text-zinc-300' />}
						label='HOME'
						href='/'
					/>
					<NavButton
						icon={<IoMdAddCircleOutline className='size-6 dark:text-zinc-300' />}
						label='CREATE'
						href='/create'
					/>
					<NavButton
					icon={<IoSearch className='size-6 dark:text-zinc-300' />}
					label='SEARCH'
					href='/search'
					/>
				</div>
				<div className='h-fit flex gap-2 flex-col'>
					<Divider />
					<NavButton
						icon={<FaUserCircle className='size-6' />}
						label='Profile'
						href='/profile'
					/>
					<NavButton
						icon={<FaGear className='size-6' />}
						label='Settings'
						href='/settings'
					/>
				</div>
			</div>
		</nav>
	);
};

interface NavButtonProps {
	label: string;
	icon: React.ReactNode;
	href: string;
}

const NavButton: FC<NavButtonProps> = ({ label, icon, href }) => {
	return (
		<Button
			startContent={icon}
			as={Link}
			href={href}
			variant='light'
			className='flex justify-start dark:text-zinc-300 text-lg'>
			{label}
		</Button>
	);
};

export default NavBar;
