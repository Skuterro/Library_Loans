import type { ReaderDto } from "../models/reader/ReaderDto";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../utils/useDebounce";
import { deleteReader, getAllReaders } from "../api/readerService";
import { IoMdPersonAdd } from "react-icons/io";
import { Modal } from "../components/modals/ModalBase";
import { ReaderForm } from "../components/forms/ReaderForm";
import { ReaderItem } from "../components/ui/ReaderItem";
import { DeleteModal } from "../components/modals/DeleteModal";
import { ReaderLoansModal } from "../components/modals/ReaderLoansModal";
import { LoanBookModal } from "../components/modals/LoanBookModal";
import { ChangePageUi } from "../components/ui/ChangePageUi";
import { toast } from "react-hot-toast";

export const ReadersPage = () => {
  const[readers, setReaders] = useState<ReaderDto[]>([]);
  const[isLoading, setIsLoading] = useState(true);

  const[isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const[isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const[isReaderLoansModalOpen, setIsReaderLoansModalOpen] = useState(false);
  const[isLoanBookModalOpen, setIsLoanBookModalOpen] = useState(false);

  const[selectedReader, setSelectedReader] = useState<ReaderDto | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filterEmail, setFilterEmail] = useState("");
  const debouncedEmail = useDebounce(filterEmail, 500);

  const handleOpenForm = (reader?: ReaderDto) => {
    setSelectedReader(reader || null);
    setIsCreateModalOpen(true);
  };
  
  const handleCloseForm = () => {
    setSelectedReader(null);
    setIsCreateModalOpen(false);
  };

  const handleOpenDeleteModal = (reader: ReaderDto) => {
    setSelectedReader(reader);
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
    setSelectedReader(reader);
    setIsReaderLoansModalOpen(true);
  };

  const handleCloseLoansModal = () => {
    setIsReaderLoansModalOpen(false);
    setSelectedReader(null);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const fetchReaders = useCallback(async (page: number, email: string) => {
    try{
      setIsLoading(true);
      const data = await getAllReaders({ pageNumber: page, pageSize: 5, email: email});
      setReaders(data.items);
      setTotalPages(data.totalPages);
    }finally{
      setIsLoading(false);
    }
  }, [])

  const handleDelete = async() => {
    if(!selectedReader){
      return;
    }
    try{
      await deleteReader(selectedReader.id);
      toast.success("Reader successfully deleted!");
      setSelectedReader(null);
      fetchReaders(currentPage, debouncedEmail);
    }finally{
      setIsDeleteModalOpen(false);
    }
  };

  useEffect(() => {
    fetchReaders(currentPage, debouncedEmail);
  }, [currentPage, debouncedEmail, fetchReaders]);

  useEffect(() => {
    if(currentPage !== 1){
      setCurrentPage(1);
    }
  }, [debouncedEmail]);

  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/3" />
        <div className="w-1/3 flex justify-center">
          <input
            type="text"
            placeholder="Filter by email..."
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-1/3 flex justify-end">
          <button
            onClick={() => handleOpenForm()}
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Create
            <IoMdPersonAdd className="text-2xl" />
          </button>
        </div>
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
                  onDelete={() => handleOpenDeleteModal(reader)}
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
      {readers.length > 0 && !isLoading && (
        <ChangePageUi 
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}  
        />
      )}

      <Modal isOpen={isCreateModalOpen} onClose={handleCloseForm}>
        <ReaderForm 
          onClose={handleCloseForm} 
          onReaderSaved={() => fetchReaders(currentPage, debouncedEmail)} 
          readerToUpdate={selectedReader}/>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <DeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          message={'Delete this reader?'}
        />
      </Modal>

      {selectedReader && (
        <Modal isOpen={isReaderLoansModalOpen} onClose={handleCloseLoansModal}>
          <ReaderLoansModal reader={selectedReader} />
        </Modal>
      )}

      {selectedReader && (
        <Modal isOpen={isLoanBookModalOpen} onClose={handleCloaseLoanBookModal}>
          <LoanBookModal reader={selectedReader}/>
        </Modal>
      )}
    </section>
  )
}