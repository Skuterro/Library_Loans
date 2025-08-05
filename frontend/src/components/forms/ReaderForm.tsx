import type { ReaderDto } from "../../models/reader/ReaderDto";
import type { ReaderCreateDto } from "../../models/reader/ReaderCreateDto";
import { useState, useEffect } from "react";
import { createReader, updateReader } from "../../api/readerService";
import { toast } from "react-hot-toast";


interface ReaderFormProps {
  onClose: () => void;
  onReaderSaved: () => void;
  readerToUpdate?: ReaderDto | null;
};

export const ReaderForm = ({ onClose, onReaderSaved, readerToUpdate }: ReaderFormProps) => {
  const [formData, setFormData] = useState<ReaderCreateDto>({
    name: "",
    lastName: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();

    if (!formData.name || !formData.lastName || !formData.email) {
      toast.error("All fields are required!");
      return;
    }

    setIsSubmitting(true);
      try {
        if (readerToUpdate) {
          await updateReader(readerToUpdate.id, formData);
          toast.success("Reader successfully updated!");
        } else {
          await createReader(formData);
          toast.success("Reader successfully created!");
        }
        onReaderSaved();
        onClose();
      } finally {
        setIsSubmitting(false);
      }
  };

  useEffect(() => {
    if (readerToUpdate) {
      setFormData({
        name: readerToUpdate.name,
        lastName: readerToUpdate.lastName,
        email: readerToUpdate.email,
      });
    } else {
      setFormData({
        name: "",
        lastName: "",
        email: "",
      });
    }
}, [readerToUpdate]);

  return (
   <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">
        {readerToUpdate ? `Update ${readerToUpdate.name} ${readerToUpdate.lastName} ` : 'Create new reader'}
      </h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-blue-500 focus:ring-blue-500"
          />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-blue-500 focus:ring-blue-500"
            />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
               onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-blue-500 focus:ring-blue-500"
            />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
          </div>
      </form>
  );
};