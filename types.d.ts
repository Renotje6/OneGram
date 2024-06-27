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
