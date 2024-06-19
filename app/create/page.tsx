'use client';

import MainLayout from '@/layouts/MainLayout';
import React from "react";
import {Textarea} from "@nextui-org/react";

export default function AccountPage() {
	return (
		<MainLayout>
            <div className="">
            <input type="file" accept="image/*" />
            </div>
            <Textarea
            isRequired
            label="Recipe"
            labelPlacement="outside"
            placeholder="Enter your recipe"
            className="max-w-xs"
            />
		</MainLayout>
	);
}
