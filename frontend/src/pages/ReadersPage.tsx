import { useEffect, useState } from "react";
import type { ReaderDto } from "../models/ReaderDto";
import { deleteReader, getAllReaders } from "../api/readerService";
import { IoMdPersonAdd } from "react-icons/io";
import { Modal } from "../components/modals/Modal";
import { ReaderForm } from "../components/modals/ReaderForm";
import { ReaderItem } from "../components/ui/ReaderItem";
import { DeleteModal } from "../components/modals/DeleteModal";
import toast from "react-hot-toast";

export const ReadersPage = () => {
  const[readers, setReaders] = useState<ReaderDto[]>([]);
  const[isLoading, setIsLoading] = useState(true);
  const[isCreareModalOpen, setIsCreateModalOpen] = useState(false);
  const[isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const[readerToDelete, setReaderToDelete] = useState<number | null>(null);
  const[readerToEdit, setReaderToEdit] = useState<ReaderDto | null>(null);

  const handleOpenForm = (reader?: ReaderDto) => {
    setReaderToEdit(reader || null);
    setIsCreateModalOpen(true);
  }
  
  const handleCloseForm = () => {
    setReaderToEdit(null);
    setIsCreateModalOpen(false);
  }

  const handleDeleteModalOpen = () => setIsDeleteModalOpen((curr) => !curr);

  const openDeleteModal = (readerId: number) => {
    setReaderToDelete(readerId);
    handleDeleteModalOpen();
  }

  const fetchReaders = async () => {
    try{
      setIsLoading(true);
      const data = await getAllReaders();
      setReaders(data);
    }finally{
      setIsLoading(false);
    }
  };

  const handleDelete = async() => {{
    if(!readerToDelete){
      return;
    }
    try{
      await deleteReader(readerToDelete);
      toast.success("Reader successfully deleted!");
      setReaderToDelete(null);
      fetchReaders();
    }finally{
      handleDeleteModalOpen();
    }
  }}

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
                  onDelete={() => openDeleteModal(reader.id)}
                  onEdit={() => handleOpenForm(reader)}  
                />
              ))}
            </ul>
          ) : (
            <p className="text-2xl">No data...</p>
          )
        )}
      </div>

      <Modal isOpen={isCreareModalOpen} onClose={handleCloseForm}>
        <ReaderForm 
          onClose={handleCloseForm} 
          onReaderSaved={fetchReaders} 
          readerToEdit={readerToEdit}/>
      </Modal>
      
      <Modal isOpen={isDeleteModalOpen} onClose={handleDeleteModalOpen}>
        <DeleteModal
          onClose={handleDeleteModalOpen}
          onConfirm={handleDelete}
          message={'Delete this reader?'}
        />
      </Modal>
    </section>
  )
}