import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Post from '@/components/post';

interface PostProps {
    id: string;
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
        userId: string;
        comment: string;
    }[];
    likes: number;
    liked: boolean;
    like: () => void;
}

const mockPost: PostProps = {
    id: '1',
    title: 'Sample Post Title',
    user: {
        name: 'John Doe',
    },
    image: {
        src: 'https://via.placeholder.com/500x200',
        alt: 'Sample Image',
    },
    description: 'Sample description of the post.',
    comments: [
        {
            userId: 'user1',
            comment: 'This is a comment.',
        },
        {
            userId: 'user2',
            comment: 'Another comment here.',
        },
    ],
    likes: 10,
    liked: false,
    like: jest.fn(), // Mock function for like action
};


describe('Post Component', () => {
    it('renders post with correct text content', () => {
        render(<Post {...mockPost} />);

        // Check if the post title is rendered
        expect(screen.getByText(mockPost.title)).toBeInTheDocument();

        // Check if the post description is rendered
        expect(screen.getByText(mockPost.description)).toBeInTheDocument();
    });
});
