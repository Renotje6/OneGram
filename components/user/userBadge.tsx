import { Button, User } from '@nextui-org/react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface UserBadgeProps {
	id: string;
	name: string;
	lastSeen?: string;
	image: string;
	endContent?: ReactNode;
}

const UserBadge: FC<UserBadgeProps> = ({ id, name, image, lastSeen, endContent }) => {
	return (
		<Button
			as={Link}
			size='lg'
			variant='light'
			href={`/profile/${id}`}
			className='flex justify-between w-full items-center p-2'
			endContent={endContent}
			startContent={
				<User
					name={name}
					description={lastSeen ? formatTimeSinceLastLogin(lastSeen) : 'The user has never logged in'}
					avatarProps={{ src: image, showFallback: true }}
					classNames={{ description: 'text-zinc-500', name: 'font-semibold dark:text-zinc-300' }}
				/>
			}
		/>
	);
};

export default UserBadge;

function formatTimeSinceLastLogin(isoDateString: string): string {
	const lastLoginDate = new Date(isoDateString);
	const now = new Date();
	const diff = now.getTime() - lastLoginDate.getTime();

	const minutes = Math.floor(diff / (1000 * 60));
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));

	if (days > 0) {
		return `${days} day${days > 1 ? 's' : ''} ago`;
	} else if (hours > 0) {
		return `${hours} hour${hours > 1 ? 's' : ''} ago`;
	} else if (minutes > 0) {
		return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
	} else {
		return 'just now';
	}
}
