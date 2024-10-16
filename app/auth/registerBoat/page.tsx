'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ports = [
  'Port of Antwerp',
  'Port of Zeebrugge',
  'Port of Rotterdam',
  'Port of Hamburg',
  'Port of Barcelona',
  'Port of Lisbon'
];

const RegisterBoat = () => {
  const [port, setPort] = useState('');
  const [boatName, setBoatName] = useState('');
  const [boatType, setBoatType] = useState('');
  const [boatDescription, setBoatDescription] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [step, setStep] = useState(2); // Progress tracker

  const router = useRouter();

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    if (fileArray.length > 10) {
      setError('You can upload a maximum of 10 files.');
      return;
    }
    setPhotos(fileArray);
    setError('');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!boatName || !boatDescription || !port) {
      setError('Please fill in all boat details.');
      return;
    }
    if (!port) {
      setError('Please select a port.');
      return;
    }
    if (!boatType) {
      setError('Please select a boat type.');
      return;
    }
    if (!maxCapacity || isNaN(Number(maxCapacity)) || Number(maxCapacity) <= 0) {
      setError('Please enter a valid max capacity (a positive number greater than 0).');
      return;
    }
    if (!rentalPrice || isNaN(Number(rentalPrice)) || Number(rentalPrice) <= 0) {
      setError('Please enter a valid rental price (a positive number greater than 0).');
      return;
    }
    if (photos.length === 0) {
      setError('Please upload at least 1 photo of the boat or yacht.');
      return;
    }
    if (!termsAgreed) {
      setError('You must agree to the terms and conditions to proceed.');
      return;
    }

    setError('');

    // Simulate submission and navigate to the next step
    console.log({ boatName, boatType, boatDescription, maxCapacity, rentalPrice, port, photos });

    router.push('/auth/boatLicense');
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: 'url(/images/deneme2.jpg)' }}
      ></div>

      {/* Navigation Bar Placeholder (if needed) */}
      <nav className="z-10 bg-white shadow-md">
        {/* Add your navigation bar content here */}
      </nav>

      {/* Registration Container */}
      <div className="relative flex-grow flex items-center justify-end z-10">
        <div className="w-1/3 bg-white p-8 border border-gray-300 rounded-lg shadow-md mr-10">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mb-8">Step {step} of 5</p>

          {/* Registration Form */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Register Boat Details
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Boat Name Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Boat Name"
                value={boatName}
                onChange={(e) => setBoatName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Boat Type Dropdown */}
            <div className="mb-4">
              <select
                value={boatType}
                onChange={(e) => setBoatType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a boat type</option>
                <option value="boat">Boat</option>
                <option value="yacht">Yacht</option>
              </select>
            </div>

            {/* Boat Description Input */}
            <div className="mb-4">
              <textarea
                placeholder="Boat Description"
                value={boatDescription}
                onChange={(e) => setBoatDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Max Capacity Input */}
            <div className="mb-4">
              <input
                type="number"
                placeholder="Max Capacity (Number of people)"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                min="1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Rental Price per Hour Input */}
            <div className="mb-4">
              <input
                type="number"
                placeholder="Rental Price per Hour (₺)"
                value={rentalPrice}
                onChange={(e) => setRentalPrice(e.target.value)}
                min="1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Port Selection Dropdown */}
            <div className="mb-6">
              <select
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a port</option>
                {ports.map((port) => (
                  <option key={port} value={port}>
                    {port}
                  </option>
                ))}
              </select>
            </div>

            {/* File Upload Section */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Boat Photos (1-10 photos)
              </label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 014-4h6a4 4 0 010 8h-6a4 4 0 01-4-4z" />
                </svg>
                <p className="mt-2 text-gray-500">Drag & drop your files here</p>
                <p className="text-xs text-gray-400">JPEG, PNG formats, up to 50MB</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                {/* Centered Choose a File Button Inside the Drag and Drop Box */}
                <button
                  type="button"
                  onClick={() => document.querySelector('input[type="file"]')?.click()}
                  className="mt-2 bg-blue-500 text-white rounded-lg px-3 py-2 hover:bg-blue-600 transition"
                >
                  Choose a file
                </button>
              </div>

              {/* File List */}
              {photos.length > 0 && (
                <div className="mt-4">
                  <ul className="list-disc list-inside text-sm">
                    {photos.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Error Message */}
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="mb-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={() => setTermsAgreed(!termsAgreed)}
                  className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-700">
                  I agree to the <a href="/terms" className="text-blue-600">terms and conditions</a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-10 py-3 text-sm rounded-lg hover:bg-blue-600 transition"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Placeholder (if needed) */}
      <footer className="z-10 bg-white shadow-md mt-auto">
        {/* Add your footer content here */}
      </footer>
    </div>
  );
};

export default RegisterBoat;