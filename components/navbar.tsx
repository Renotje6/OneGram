import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FC } from 'react';
import { BiHome } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineAddBox, MdOutlineSettings } from 'react-icons/md';

interface NavBarProps {}

const NavBar: FC<NavBarProps> = ({}) => {
	return (
		<nav className='bg-black/20 text-black p-4 min-h-screen w-80 flex flex-col gap-5 justify-between'>
			<p className='text-5xl font-semibold'>OneGram</p>
			<div className=' h-full'>
				<NavButton
					icon={<BiHome className='size-6' />}
					label='Home'
					href='/'
				/>
				<NavButton
					icon={<BiHome className='size-6' />}
					label='Home'
					href='/'
				/>
				<NavButton
					icon={<BiHome className='size-6' />}
					label='Home'
					href='/'
				/>
				<NavButton
					icon={<BiHome className='size-6' />}
					label='Home'
					href='/'
				/>
				<NavButton
					icon={<MdOutlineAddBox className='size-6' />}
					label='Create'
					href='/'
				/>
			</div>
			<div className='h-fit flex gap-2 flex-col'>
				<NavButton
					icon={<CgProfile className='size-6' />}
					label='Profile'
					href='/profile'
				/>
				<NavButton
					icon={<MdOutlineSettings className='size-6' />}
					label='Setting'
					href='/setting'
				/>
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
			className='flex justify-start'>
			{label}
		</Button>
	);
};

export default NavBar;
