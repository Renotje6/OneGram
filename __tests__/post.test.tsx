import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

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
    title: 'test',
    user: {
        name: 'tester',
    },
    image: {
        src: 'https://via.placeholder.com/500x200',
        alt: 'Test Image',
    },
    description: 'Test description.',
    comments: [
        {
            userId: 'user1',
            comment: 'This is a comment.',
        },
        {
            userId: 'user2',
            comment: 'Another comment.',
        },
    ],
    likes: 10,
    liked: false,
    like: jest.fn(), // Mock function for like action
};

const Post: React.FC<PostProps> = ({ id, title, user, image, description, comments, likes, liked, like }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>By {user.name}</p>
            <img src={image.src} alt={image.alt} />
            <p>{description}</p>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment.comment}</li>
                ))}
            </ul>
            <p>Likes: {likes}</p>
            <button onClick={like}>Like</button>
        </div>
    );
};

describe('Post Component', () => {
    it('renders post with correct text content', () => {
        render(<Post {...mockPost} />);

        // Check if the post title is rendered
        expect(screen.getByText(mockPost.title)).toBeInTheDocument();

        // Check if the user name is rendered
        expect(screen.getByText(`By ${mockPost.user.name}`)).toBeInTheDocument();

        // Check if the post description is rendered
        expect(screen.getByText(mockPost.description)).toBeInTheDocument();

        // Check if each comment is rendered
        mockPost.comments.forEach((comment) => {
            expect(screen.getByText(comment.comment)).toBeInTheDocument();
        });

        // Check if the likes count is rendered
        expect(screen.getByText(`Likes: ${mockPost.likes}`)).toBeInTheDocument();
    });
});
