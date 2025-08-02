import { useEffect, useState } from "react";
import type { ReaderDto } from "../models/ReaderDto";
import { getAllReaders } from "../api/readerService";
import { IoMdPersonAdd } from "react-icons/io";
import { Modal } from "../components/modals/Modal";
import { ReaderForm } from "../components/modals/ReaderForm";
import { ReaderItem } from "../components/ui/ReaderItem";

export const ReadersPage = () => {
  const[readers, setReaders] = useState<ReaderDto[]>([]);
  const[isLoading, setIsLoading] = useState(true);
  const[isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen((curr) => !curr); 

  const fetchReaders = async () => {
    try{
      setIsLoading(true);
      const data = await getAllReaders();
      setReaders(data);
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReaders();
  }, []);

  return (
    <section className="p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleOpen}
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
                <ReaderItem key={reader.id} reader={reader}/>
              ))}
            </ul>
          ) : (
            <p className="text-2xl">No data...</p>
          )
        )}
      </div>

      <Modal isOpen={isOpen} onClose={handleOpen}>
        <ReaderForm onClose={handleOpen} onReaderCreated={fetchReaders} />
      </Modal>
    </section>
  )
}