'use client';

import MainLayout from '@/layouts/MainLayout';
import React from "react";
import {Textarea} from "@nextui-org/react";

export default function AccountPage() {
	return (
		<MainLayout>
            <Textarea
            
            isRequired
            label="Description"
            labelPlacement="outside"
            placeholder="Enter your description"
            className="max-w-xs"
            />
            <div className="">
            <input type="file" accept="image/*" />
            </div>
		</MainLayout>
	);
}
