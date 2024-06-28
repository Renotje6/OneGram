'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalStates {
	[key: string]: boolean; // Only storing the open state, true or false
}

interface UseModalsContext {
	modalStates: ModalStates;
	isModalOpen: (modalId: string) => boolean;
	setModalState: (modalId: string, isOpen: boolean) => void;
	toggleModal: (modalId: string) => void;
}

const ModalsContext = createContext<UseModalsContext | undefined>(undefined);

interface ModalsProviderProps {
	children: ReactNode;
}

export const ModalsProvider: React.FC<ModalsProviderProps> = ({ children }) => {
	const [modalStates, setModalStates] = useState<ModalStates>({});

	const isModalOpen = (modalId: string): boolean => !!modalStates[modalId];

	const setModalState = (modalId: string, isOpen: boolean): void => {
		setModalStates((prevStates) => ({
			...prevStates,
			[modalId]: isOpen,
		}));
	};

	const toggleModal = (modalId: string): void => {
		setModalStates((prevStates) => ({
			...prevStates,
			[modalId]: !prevStates[modalId],
		}));
	};

	const contextValue: UseModalsContext = {
		modalStates,
		isModalOpen,
		setModalState,
		toggleModal,
	};

	return <ModalsContext.Provider value={contextValue}>{children}</ModalsContext.Provider>;
};

export const useModals = (): UseModalsContext => {
	const context = useContext(ModalsContext);

	if (!context) {
		throw new Error('useModals must be used within a ModalsProvider');
	}

	return context;
};
