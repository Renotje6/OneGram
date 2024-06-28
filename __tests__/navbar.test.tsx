import NavBar from '@/components/navbar'; // Adjust the path accordingly
import '@testing-library/jest-dom/';
import { render, screen } from '@testing-library/react';

describe('NavBar Component', () => {
	test('renders NavBar with links', () => {
		render(<NavBar />);

		// Check if the main title is rendered
		expect(screen.getByText('OneGram')).toBeInTheDocument();

		// Check if the HOME link is rendered
		expect(screen.getByText('HOME')).toBeInTheDocument();

		// Check if the SEARCH link is rendered
		expect(screen.getByText('SEARCH')).toBeInTheDocument();

		// Check if the Profile link is rendered
		expect(screen.getByText('Profile')).toBeInTheDocument();

		// Check if the Settings link is rendered
		expect(screen.getByText('Settings')).toBeInTheDocument();
	});
});
