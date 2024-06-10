'use client';

import LoginLayout from '@/layouts/LoginLayout';
import { Button, Input, Spinner } from '@nextui-org/react';

export default function LoginPage() {
	const handleLogin = () => {
		console.log('Login');
	};

	return (
		<LoginLayout>
			<div className='bg-purple-500/50 flex w-[500px]'>
				<div className='bg-blue-500/50 w-full'>left</div>
				<div className=' w-full'>
					<div className='bg-red-500/50 flex flex-col items-center gap-2'>
						<Input placeholder='Email' />
						<Input placeholder='Password' />
						<Button onClick={handleLogin}>Login</Button>
					</div>
					<div className='bg-green-500/50'>
						<Button
							isIconOnly
							startContent={}
						/>
					</div>
				</div>
			</div>
		</LoginLayout>
	);
}
