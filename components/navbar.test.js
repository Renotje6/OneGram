import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavBar from '../path/to/NavBar';  // Adjust the path accordingly

describe('NavBar Component', () => {
  test('renders NavBar with links', () => {
    render(<NavBar />);

    // Check if the main title is rendered
    expect(screen.getByText('OneGram')).toBeInTheDocument();

    // Check if the HOME link is rendered
    expect(screen.getByText('HOME')).toBeInTheDocument();

    // Check if the CREATE link is rendered
    expect(screen.getByText('CREATE')).toBeInTheDocument();

    // Check if the SEARCH link is rendered
    expect(screen.getByText('SEARCH')).toBeInTheDocument();

    // Check if the Profile link is rendered
    expect(screen.getByText('Profile')).toBeInTheDocument();

    // Check if the Settings link is rendered
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});
