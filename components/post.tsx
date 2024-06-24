import { Button, User } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import { FaRegBookmark, FaRegHeart } from 'react-icons/fa';
import { LuSend } from 'react-icons/lu';
import { PiChatCircleTextBold } from 'react-icons/pi';

export default function Post() {
	const [openComments, setOpenComments] = useState(false);

	return (
		<div>
			<div className='relative shadow-lg'>
				<div className='absolute top-0 p-3'>
					<User
						name='Jane Doe'
						avatarProps={{
							size: 'md',
							src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
						}}
					/>
				</div>
				<Image
					className=''
					src='/post.png'
					alt='Next.js'
					width={500}
					height={200}
				/>
				<div className='absolute bottom-0 w-full flex justify-between p-3'>
					<div className='flex flex-col justify-end w-full'>
						<div>
							<p className='text-white font-semibold text-3xl text-wrap'>Title</p>
							<p className='text-zinc-300 text-lg text-wrap'>Description</p>
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
			{openComments && <div className='bg-black/40 p-3'>Here are comments listed</div>}
		</div>
	);
}
