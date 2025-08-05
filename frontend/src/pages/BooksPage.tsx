import type { BookDto } from "../models/book/BookDto";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../utils/useDebounce";
import { FaBook } from "react-icons/fa";
import { deleteBook, getAllBooks } from "../api/bookService";
import { BookItem } from "../components/ui/BookItem";
import { Modal } from "../components/modals/ModalBase";
import { DeleteModal } from "../components/modals/DeleteModal";
import { BookForm } from "../components/forms/BookForm";
import { ChangePageUi } from "../components/ui/ChangePageUi";
import { toast } from "react-hot-toast";

export const BooksPage = () => {
  const [books, setBooks] = useState<BookDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [bookToDelete, setBookToDelete] = useState<number | null>(null);
  const [bookToUpdate, setBookToUpdate] = useState<BookDto | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filterTitle, setFilterTitle] = useState("");
  const debouncedTitle = useDebounce(filterTitle, 500);

  const handleOpenForm = (book?: BookDto) => {
    setBookToUpdate(book || null);
    setIsCreateModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCloseForm = () => {
    setBookToUpdate(null);
    setIsCreateModalOpen(false);
  };

  const handleDeleteModalOpen = () => setIsDeleteModalOpen((curr) => !curr);

  const openDeleteModal = (bookId: number) => {
    setBookToDelete(bookId);
    handleDeleteModalOpen();
  };

  const fetchBooks = useCallback(async (page: number, title: string) => {
    try {
      setIsLoading(true);
      const data = await getAllBooks({
        pageNumber: page,
        pageSize: 5,
        title: title,
      });
      setBooks(data.items);
      setTotalPages(data.totalPages);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = async () => {
    if (!bookToDelete) {
      return;
    }
    try {
      await deleteBook(bookToDelete);
      toast.success("Book successfully deleted!");
      setBookToDelete(null);
      fetchBooks(currentPage, debouncedTitle);
    } finally {
      handleDeleteModalOpen();
    }
  };

  useEffect(() => {
    fetchBooks(currentPage, debouncedTitle);
  }, [currentPage, debouncedTitle, fetchBooks]);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [debouncedTitle]);

  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/3" />
        <div className="w-1/3 flex justify-center">
          <input
            type="text"
            placeholder="Filter by title..."
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-1/3 flex justify-end">
          <button
            onClick={() => handleOpenForm()}
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Create
            <FaBook className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        {isLoading ? (
          <p className="text-2xl">Loading...</p>
        ) : books.length > 0 ? (
          <ul className="space-y-2">
            {books.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                onDelete={() => openDeleteModal(book.id)}
                onEdit={() => handleOpenForm(book)}
              />
            ))}
          </ul>
        ) : (
          <p className="text-2xl">No data...</p>
        )}
      </div>
      {books.length > 0 && !isLoading && (
        <ChangePageUi
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}

      <Modal isOpen={isCreateModalOpen} onClose={handleCloseForm}>
        <BookForm
          onClose={handleCloseForm}
          onBookSaved={() => fetchBooks(currentPage, debouncedTitle)}
          bookToUpdate={bookToUpdate}
        />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={handleDeleteModalOpen}>
        <DeleteModal
          onClose={handleDeleteModalOpen}
          onConfirm={handleDelete}
          message={"Delete this book?"}
        />
      </Modal>
    </section>
  );
};
