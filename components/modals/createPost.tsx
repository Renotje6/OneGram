import { ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Modal, Input, Textarea } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FC } from 'react';
interface ModalLoginProps {
	isOpen: boolean;
	modalToggle: () => void;
}

interface FormFields {
	title: string;
	description: string;
	image: string;
}

const CreatePostModal: FC<ModalLoginProps> = ({ isOpen, modalToggle }) => {
	const {
		reset,
		handleSubmit,
		register,
		setError,
		formState: { errors, isSubmitting, defaultValues },
	} = useForm<FormFields>({
		mode: 'all',
		reValidateMode: 'onChange',
		defaultValues: {
			title: '',
			description: '',
			image: '',
		},
	});

	const onSubmit: SubmitHandler<FormFields> = async (formData) => {
		try {
			console.log(formData);
		} catch (error: any) {
			setError('root', { message: error.message });
		}
	};

	return (
		<Modal
			classNames={{ base: 'bg-black/20 dark:bg-black/50 rounded-lg', header: 'font-K2D flex justify-center text-white', body: 'gap-2', footer: 'flex justify-center flex-col' }}
			backdrop='blur'
			isOpen={isOpen}
			scrollBehavior='outside'
			onClose={() => reset()}
			onOpenChange={modalToggle}>
			<ModalContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>Add Post</ModalHeader>
					<ModalBody>
						<div className='flex flex-col gap-2'>
							<Input
								size='sm'
								isClearable
								isRequired
								label='Title'
								isInvalid={!!errors.title}
								errorMessage={errors.title?.message?.toString()}
								{...register('title', { required: 'Title is required' })}
							/>
							<Textarea
								size='sm'
								isRequired
								label='Description'
								isInvalid={!!errors.description}
								errorMessage={errors.description?.message?.toString()}
								{...register('description', { required: 'Description is required' })}
							/>
							<Input
								type='file'
								accept='image/*'
								isClearable
								size='sm'
								isRequired
								label='Image'
								isInvalid={!!errors.image}
								errorMessage={errors.image?.message?.toString()}
								{...register('image', { required: 'Image is required' })}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<div className='w-full flex justify-center gap-5'>
							<Button
								size='sm'
								className='rounded-md'
								color='primary'
								variant='flat'
								isLoading={isSubmitting}
								type='submit'>
								Create
							</Button>
						</div>
						{errors.root && <p className='text-danger-400 w-full text-center text-sm'>{errors.root.message}</p>}
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

export default CreatePostModal;
