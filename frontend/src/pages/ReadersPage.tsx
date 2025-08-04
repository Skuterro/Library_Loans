import { useEffect, useState } from "react";
import type { ReaderDto } from "../models/reader/ReaderDto";
import { deleteReader, getAllReaders } from "../api/readerService";
import { IoMdPersonAdd } from "react-icons/io";
import { Modal } from "../components/modals/Modal";
import { ReaderForm } from "../components/forms/ReaderForm";
import { ReaderItem } from "../components/ui/ReaderItem";
import { DeleteModal } from "../components/modals/DeleteModal";
import { ReaderLoansModal } from "../components/modals/ReaderLoansModal";
import toast from "react-hot-toast";
import { LoanBookModal } from "../components/modals/LoanBookModal";

export const ReadersPage = () => {
  const[readers, setReaders] = useState<ReaderDto[]>([]);
  const[isLoading, setIsLoading] = useState(true);
  const[isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const[isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const[isReaderLoansModalOpen, setIsReaderLoansModalOpen] = useState(false);
  const[isLoanBookModalOpen, setIsLoanBookModalOpen] = useState(false);
  const[readerToDelete, setReaderToDelete] = useState<number | null>(null);
  const[readerToUpdate, setReaderToUpdate] = useState<ReaderDto | null>(null);
  const[readerLoans, setReaderLoans] = useState<ReaderDto | null>(null);
  const[selectedReader, setSelectedReader] = useState<ReaderDto | null>(null);

  const handleOpenForm = (reader?: ReaderDto) => {
    setReaderToUpdate(reader || null);
    setIsCreateModalOpen(true);
  };
  
  const handleCloseForm = () => {
    setReaderToUpdate(null);
    setIsCreateModalOpen(false);
  };

  const handleOpenDeleteModal = (readerId: number) => {
    setReaderToDelete(readerId);
    setIsDeleteModalOpen(true);
  };

  const handleOpenLoanBookModal = (reader: ReaderDto)=> {
    setSelectedReader(reader);
    setIsLoanBookModalOpen(true);
  }

  const handleCloaseLoanBookModal = () => {
    setSelectedReader(null);
    setIsLoanBookModalOpen(false);
  }

  const handleOpenLoansModal = (reader: ReaderDto) => {
    setReaderLoans(reader);
    setIsReaderLoansModalOpen(true);
  };

  const handleCloseLoansModal = () => {
    setIsReaderLoansModalOpen(false);
    setReaderLoans(null);
  };

  const fetchReaders = async () => {
    try{
      setIsLoading(true);
      const data = await getAllReaders();
      setReaders(data);
    }finally{
      setIsLoading(false);
    }
  };

  const handleDelete = async() => {
    if(!readerToDelete){
      return;
    }
    try{
      await deleteReader(readerToDelete);
      toast.success("Reader successfully deleted!");
      setReaderToDelete(null);
      fetchReaders();
    }finally{
      setIsDeleteModalOpen(false);
    }
  };

  useEffect(() => {
    fetchReaders();
  }, []);

  return (
    <section className="p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleOpenForm()}
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Create
          <IoMdPersonAdd className="text-2xl" />
        </button>
      </div>
      <div className="flex justify-center mt-12">
        {isLoading ? (
          <p className="text-2xl">Loading...</p>
        ) : (
          readers.length > 0 ? (
            <ul className="space-y-2">
              {readers.map((reader) => (
                <ReaderItem 
                  key={reader.id} 
                  reader={reader}
                  onDelete={() => handleOpenDeleteModal(reader.id)}
                  onEdit={() => handleOpenForm(reader)}
                  onViewLoans={() => handleOpenLoansModal(reader)}  
                  onLoanBook={() => handleOpenLoanBookModal(reader)}
                />
              ))}
            </ul>
          ) : (
            <p className="text-2xl">No data...</p>
          )
        )}
      </div>

      <Modal isOpen={isCreateModalOpen} onClose={handleCloseForm}>
        <ReaderForm 
          onClose={handleCloseForm} 
          onReaderSaved={fetchReaders} 
          readerToUpdate={readerToUpdate}/>
      </Modal>
      
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <DeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          message={'Delete this reader?'}
        />
      </Modal>

      <Modal isOpen={isReaderLoansModalOpen} onClose={handleCloseLoansModal}>
        {readerLoans && <ReaderLoansModal reader={readerLoans} />}
      </Modal>

      {selectedReader && (
        <Modal isOpen={isLoanBookModalOpen} onClose={handleCloaseLoanBookModal}>
          <LoanBookModal reader={selectedReader}/>
        </Modal>
      )}
    </section>
  )
}