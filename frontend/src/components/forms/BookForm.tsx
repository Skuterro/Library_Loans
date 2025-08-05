import type { BookDto } from "../../models/book/BookDto";
import type { BookCreateDto } from "../../models/book/BookCreateDto";
import { useState, useEffect } from "react";
import { createBook, updateBook } from "../../api/bookService";
import { toast } from "react-hot-toast";

type BookFormProps = {
  onClose: () => void;
  onBookSaved: () => void;
  bookToUpdate?: BookDto | null;
};

export const BookForm = ({
  onClose,
  onBookSaved,
  bookToUpdate,
}: BookFormProps) => {
  const [formData, setFormData] = useState<BookCreateDto>({
    title: "",
    author: "",
    releaseYear: 0,
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

    if (!formData.title) {
      toast.error("Title of the book is required!");
      return;
    }

    setIsSubmitting(true);
    try {
      if (bookToUpdate) {
        await updateBook(bookToUpdate.id, formData);
        toast.success("Book successfully updated!");
      } else {
        await createBook(formData);
        toast.success("Book successfully created!");
      }
      onBookSaved();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (bookToUpdate) {
      setFormData({
        title: bookToUpdate.title,
        author: bookToUpdate.author,
        releaseYear: bookToUpdate.releaseYear,
      });
    } else {
      setFormData({
        title: "",
        author: "",
        releaseYear: 0,
      });
    }
  }, [bookToUpdate]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">
        {bookToUpdate ? `Update ${bookToUpdate.title}` : "Create new book"}
      </h2>
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="author" className="block text-sm font-medium">
          Author
        </label>
        <input
          type="text"
          name="author"
          id="author"
          value={formData.author}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="releaseYear" className="block text-sm font-medium">
          Release year
        </label>
        <input
          type="number"
          name="releaseYear"
          id="releaseYear"
          value={formData.releaseYear}
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
