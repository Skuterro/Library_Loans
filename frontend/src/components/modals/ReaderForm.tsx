import React, { useState } from "react";
import { createReader } from "../../api/readerService";
import type { ReaderCreateDto } from "../../models/ReaderCreateDto";

type ReaderFormProps = {
    onClose: () => void;
    onReaderCreated: () => void;
};

export const ReaderForm = ({ onClose, onReaderCreated }: ReaderFormProps) => {
    const [formData, setFormData] = useState<ReaderCreateDto>({
        name: "",
        lastName: "",
        email: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!formData.name || !formData.lastName || !formData.email) {
            setError("Wszystkie pola są wymagane!");
            return;
        }

        setIsSubmitting(true);
        try {
            await createReader(formData);
            onReaderCreated();
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Create new reader</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div className="flex justify-end gap-2 mt-6">
                <button
                    type="submit"
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating..." : "Create"}
                </button>
            </div>
        </form>
    );
};