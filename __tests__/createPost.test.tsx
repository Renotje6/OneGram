import '@testing-library/jest-dom/';
import { render, screen } from '@testing-library/react';
import CreatePostModal from '../components/modals/createPost';

describe('CreatePostModal Component', () => {
  test('renders modal header and form inputs', () => {
    render(
      <CreatePostModal isOpen={true} modalToggle={() => {}} />
    );

    // Check if modal header is rendered
    expect(screen.getByText('Add Post')).toBeInTheDocument();

    // Check if form inputs are rendered
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Image')).toBeInTheDocument();
  });
});
