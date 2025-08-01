import React, { useState, FormEvent, ChangeEvent } from 'react';

// Definicja typu dla danych formularza
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

// Definicja typu dla propsów komponentu
interface CreateReaderFormProps {
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export const CreateReaderForm: React.FC<CreateReaderFormProps> = ({ onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('https://api.example.com/readers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Wystąpił błąd podczas tworzenia czytelnika.');
      }

      const result = await response.json();
      console.log('Sukces:', result);
      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
      });
      
      onSubmitSuccess();
      
    } catch (err) {
      console.error('Błąd:', err);
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Formularz tworzenia czytelnika</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            Imię:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Nazwisko:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-between items-center pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Wysyłanie...' : 'Wyślij'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-sm transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anuluj
          </button>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">❌ {error}</p>}
        {success && <p className="mt-4 text-sm text-green-600">✅ Czytelnik został pomyślnie utworzony!</p>}
      </form>
    </div>
  );
};