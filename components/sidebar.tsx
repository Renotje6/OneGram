import { Button, Divider, User } from '@nextui-org/react';
import Link from 'next/link';
import { FC } from 'react';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { MdLibraryAdd } from 'react-icons/md';
import { TbLogout } from 'react-icons/tb';

interface SideBarProps {}

const SideBar: FC<SideBarProps> = ({}) => {
	return (
		<nav className='bg-black/20 text-black min-h-screen w-80 flex-col gap-5 justify-between shadow-lg hidden lg:flex min-w-80'>
			<div className='h-screen p-4 flex justify-between flex-col fixed gap-5 w-80'>
				<div className='h-full'>
					<p className='text-lg font-semibold dark:text-zinc-300'>YOUR FOLLOWERS</p>
					<div className='p-2 flex flex-col gap-2 items-start'>
						<SideBarUser
							following
							id='jane-doe'
							name='Jane Doe'
							lastseen='5h ago'
							image='https://i.pravatar.cc/150?u=a04258114e29026702d'
						/>
					</div>
				</div>
				<div>
					<Button
						as={Link}
						size='lg'
						variant='light'
						href={`/logout`}
						className='flex justify-between w-full items-center p-2 text-black dark:text-zinc-300'
						endContent={<TbLogout className='size-6 dark:text-zinc-400' />}
						startContent={
							<User
								name='Logout'
								avatarProps={{ src: '', showFallback: true }}
								classNames={{ description: 'text-zinc-500', name: 'font-semibold dark:text-zinc-300 text-lg' }}
							/>
						}
					/>
				</div>
			</div>
		</nav>
	);
};

interface SideBarUserProps {
	id: string;
	name: string;
	following: boolean;
	lastseen?: string;
	image: string;
}

const SideBarUser: FC<SideBarUserProps> = ({ id, name, following, image, lastseen }) => {
	return (
		<Button
			as={Link}
			size='lg'
			variant='light'
			href={`/profile/${id}`}
			className='flex justify-between w-full items-center p-2'
			endContent={following! ? <MdLibraryAdd className='size-6 mr-2 dark:text-zinc-400' /> : null}
			startContent={
				<User
					name={name}
					description={lastseen}
					avatarProps={{ src: image, showFallback: true }}
					classNames={{ description: 'text-zinc-500', name: 'font-semibold dark:text-zinc-300' }}
				/>
			}
		/>
	);
};

export default SideBar;
