import { Avatar, Button } from '@nextui-org/react';
import { FaPlus } from 'react-icons/fa';

interface ProfileHeaderProps {
	name: string;
	bio: string;
	avatar: string;
}

export default function ProfileHeader({ name, bio, avatar }: ProfileHeaderProps) {
	return (
		<header className='bg-black/10 flex p-10 relative'>
			<div className='flex gap-5 items-center'>
				<Avatar
					classNames={{ base: 'w-32 h-32' }}
					showFallback
					src={avatar}
				/>
				<div className='h-full flex justify-between flex-col'>
					<div className='w-full'>
						<p className='text-4xl font-semibold dark:text-zinc-200 text-black'>{name}</p>
						<p className='dark:text-zinc-300 text-medium my-1 text-black'>{bio}</p>
					</div>
					<Button
						onClick={() => {
							alert('Follow');
						}}
						variant='flat'
						color='primary'
						className='w-fit'
						startContent={<FaPlus />}>
						Follow
					</Button>
				</div>
			</div>
			<Button
				isIconOnly
				onClick={() => {
					alert('Add post');
				}}
				className='absolute top-8 right-8'
				startContent={<FaPlus />}
			/>
		</header>
	);
}
