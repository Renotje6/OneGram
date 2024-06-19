'use client';

import MainLayout from '@/layouts/MainLayout';
import React from "react";
import {Input} from "@nextui-org/react";
import {Avatar} from "@nextui-org/react";

export default function AccountPage() {
	return (
		<MainLayout>
            <Input
            isRequired
            label="Username"
            defaultValue="Username"
            className="max-w-xs p-2"
            />
        <Avatar
        showFallback src='https://images.unsplash.com/broken'
        className=''
        />
		</MainLayout>
	);
}
