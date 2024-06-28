import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import ProfileGallery from '../components/profile/gallery'; 

//renders posts and handles click events
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) => (
        <img src={src} alt={alt} onClick={onClick} />
    ),
}));

interface Post {
    id: string;
    owner: string;
    title: string;
    description: string;
    userId: string;
    timestamp: number;
    picture: string;
    image: { src: string; alt: string };
    likes: string[];
    comments: { userId: string; comment: string }[];
}

// Mock data
const posts: Post[] = [
    {
        id: '1',
        owner: 'owner1',
        title: 'Post Title 1',
        description: 'Description 1',
        userId: 'user1',
        timestamp: 1627740200000,
        picture: 'picture1.png',
        image: { src: 'https://via.placeholder.com/300x150', alt: 'Image 1' },
        likes: [],
        comments: [],
    },
    {
        id: '2',
        owner: 'owner2',
        title: 'Post Title 2',
        description: 'Description 2',
        userId: 'user2',
        timestamp: 1627740300000,
        picture: 'picture2.png',
        image: { src: 'https://via.placeholder.com/300x150', alt: 'Image 2' },
        likes: [],
        comments: [],
    },
];

describe('ProfileGallery Component', () => {
    it('renders posts and handles click events', () => {
        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

        render(<ProfileGallery posts={posts} />);

        // Check if the images are rendered
        expect(screen.getByAltText('Image 1')).toBeInTheDocument();
        expect(screen.getByAltText('Image 2')).toBeInTheDocument();

        // Simulate click event on the first image
        fireEvent.click(screen.getByAltText('Image 1'));
        expect(pushMock).toHaveBeenCalledWith('/profile/posts/1');

        // Simulate click event on the second image
        fireEvent.click(screen.getByAltText('Image 2'));
        expect(pushMock).toHaveBeenCalledWith('/profile/posts/2');
    });
});
