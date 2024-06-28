import '@testing-library/jest-dom/';
import { render, screen } from '@testing-library/react';
import CreatePostModal from '../components/modals/createPost';

describe('CreatePostModal Component', () => {
  test('renders modal header and form inputs', () => {
    render(
      <CreatePostModal isOpen={true} modalToggle={() => {}} />
    );

    // alle juiste teksten genereren
    expect(screen.getByText('Add Post')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByTestId('Image')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();

  });
});
