import { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import type { BookDto } from "../models/book/BookDto";
import { deleteBook, getAllBooks } from "../api/bookService";
import { BookItem } from "../components/ui/BookItem";
import { Modal } from "../components/modals/Modal";
import { DeleteModal } from "../components/modals/DeleteModal";
import toast from "react-hot-toast";
import { BookForm } from "../components/forms/BookForm";

export const BooksPage = () => {
  const[books, setBooks] = useState<BookDto[]>([]);
  const[isLoading, setIsLoading] = useState(true);
  const[isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const[isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const[bookToDelete, setBookToDelete] = useState<number | null>(null);
  const[bookToUpdate, setBookToUpdate] = useState<BookDto | null>(null);


  const handleOpenForm = (book?: BookDto) => {
    setBookToUpdate(book || null);
    setIsCreateModalOpen(true);
  }

  const handleCloseForm = () => {
    setBookToUpdate(null);
    setIsCreateModalOpen(false);
  }

  const handleDeleteModalOpen = () => setIsDeleteModalOpen((curr) => !curr);

  const openDeleteModal = (bookId: number) => {
    setBookToDelete(bookId);
    handleDeleteModalOpen();
  }

  const fetchBooks = async () => {
    try{
      setIsLoading(true);
      const data = await getAllBooks();
      setBooks(data);
    }finally{
      setIsLoading(false);
    }
  };

  const handleDelete = async() => {
    if(!bookToDelete){
      return;
    }
    try{
      await deleteBook(bookToDelete);
      toast.success("Book successfully deleted!");
      setBookToDelete(null);
      fetchBooks();
    }finally{
      handleDeleteModalOpen();
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <section className="p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleOpenForm()}
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Create
          <FaBook/>
        </button>
      </div>
      <div className="flex justify-center mt-12">
        {isLoading ? (
          <p className="text-2xl">Loading...</p>
        ) : (
          books.length > 0 ? (
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
          )
        )}
      </div>

      <Modal isOpen={isCreateModalOpen} onClose={handleCloseForm}>
        <BookForm
          onClose={handleCloseForm} 
          onBookSaved={fetchBooks} 
          bookToUpdate={bookToUpdate}/>
      </Modal>      

      <Modal isOpen={isDeleteModalOpen} onClose={handleDeleteModalOpen}>
        <DeleteModal
          onClose={handleDeleteModalOpen}
          onConfirm={handleDelete}
          message={'Delete this book?'}
        />
      </Modal>            
    </section>
  )
}