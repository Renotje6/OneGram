'use client';

import LoginLayout from '@/layouts/LoginLayout';
import { Button, Divider, Input, Spinner } from '@nextui-org/react';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
	const handleLogin = () => {
		console.log('Login');
	};

	return (
		<LoginLayout>
			<div className='bg-black/10 flex w-[90%] md:w-[600px] h-[400px] rounded-xl'>
				<div className='w-full justify-center items-center flex-col gap-8 text-center bg-black/5 h-full hidden md:flex'>
					<p className='text-5xl font-semibold'>OneGram</p>
					<p className='text-zinc-200'>
						Unable to register? <br />
						Get help{' '}
						<a
							href='#'
							className='text-primary-500'>
							Here
						</a>
					</p>
				</div>
				<div className=' w-full flex flex-col gap-3 justify-center p-3'>
					<h1 className='font-semibold text-4xl text-center hidden md:block'>Register</h1>
					<h1 className='text-5xl font-semibold md:hidden text-center'>OneGram</h1>
					<div className='flex flex-col items-center gap-2'>
						<Input placeholder='Name' />
						<Input placeholder='Email' />
						<Input placeholder='Password' />
						<Button
							color='primary'
							className='w-full'
							onClick={handleLogin}>
							Register
						</Button>
					</div>
					<div className='flex justify-center flex-col items-center gap-2'>
						<Divider className='bg-black/10 h-0.5' />
						<p className='text-sm'>Or Login With:</p>
						<Button
							isIconOnly
							startContent={<FcGoogle className='size-6' />}
						/>
					</div>
				</div>
			</div>
		</LoginLayout>
	);
}
