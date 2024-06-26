import { Button, Textarea, User } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import { FaRegBookmark, FaRegHeart } from 'react-icons/fa';
import { LuSend } from 'react-icons/lu';
import { PiChatCircleTextBold } from 'react-icons/pi';

interface PostProps {
	title: string;
	user: {
		name: string;
	};
	image: {
		src: string;
		alt: string;
	};
	description: string;
	comments: {
		user: {
			name: string;
			avatar: string;
		};
		comment: string;
	}[];
}

export default function Post({ title, user, image, description, comments }: PostProps) {
	const [openComments, setOpenComments] = useState(false);

	return (
		<div className='flex flex-col gap-2'>
			<div className='relative shadow-lg'>
				<div className='absolute top-0 p-3'>
					<User
						name={user.name}
						avatarProps={{
							size: 'md',
							showFallback: true,
							name: user.name,
						}}
					/>
				</div>
				<Image
					className='rounded-lg'
					src={image.src ?? 'placeholder.png'}
					alt={image.alt}
					width={500}
					height={200}
				/>
				<div className='absolute bottom-0 w-full flex justify-between p-3'>
					<div className='flex flex-col justify-end w-full'>
						<div>
							<p className='text-white font-semibold text-3xl text-wrap'>{title}</p>
							<p className='text-zinc-300 text-lg text-wrap'>{description}</p>
						</div>
					</div>
					<div className='flex flex-col gap-3'>
						{/* icons */}
						<Button
							isIconOnly
							size='lg'
							radius='full'
							variant='light'
							startContent={<FaRegHeart className='size-9 text-pink-700' />}
						/>
						<Button
							isIconOnly
							size='lg'
							radius='full'
							variant='light'
							onClick={() => setOpenComments(!openComments)}
							startContent={<PiChatCircleTextBold className='size-9 text-white' />}
						/>
						<Button
							isIconOnly
							size='lg'
							radius='full'
							variant='light'
							startContent={<FaRegBookmark className='size-9 text-white' />}
						/>
						<Button
							isIconOnly
							size='lg'
							radius='full'
							variant='light'
							startContent={<LuSend className='size-9 text-white' />}
						/>
					</div>
				</div>
			</div>
			{openComments && (
				<div className='bg-black/40 p-3 rounded-lg flex flex-col gap-2 shadow-lg'>
					<div className='flex flex-col gap-2'>
						<p>New Comment:</p>
						<div className='flex gap-2'>
							<Textarea
								label='Add Comment'
								minRows={1}
							/>
							<Button
								color='primary'
								isIconOnly
								startContent={<LuSend className='size-6' />}
							/>
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<h2>Comments:</h2>
						<div className='flex flex-col gap-2'>
							{comments.map((comment, index) => (
								<div
									key={index}
									className='bg-white/5 p-2 rounded-lg'>
									<User
										classNames={{ name: 'text-zinc-300' }}
										name={comment.user.name}
										avatarProps={{
											size: 'sm',
											showFallback: true,
											src: comment.user.avatar,
										}}
									/>
									<p className='text-sm'>{comment.comment}</p>
								</div>
							))}
							{/* <div className='bg-white/5 p-2 rounded-lg'>
								<User
									classNames={{ name: 'text-zinc-300' }}
									name='Jane Doe'
									avatarProps={{
										size: 'sm',
										src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
									}}
								/>
								<p className='text-sm'>This is a placeholder comment!</p>
							</div> */}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
