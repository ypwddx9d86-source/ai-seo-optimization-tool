import React from 'react';
import { InputProps } from '../types';

export const TextInput: React.FC<InputProps> = ({ label, value, onChange, placeholder, required }) => (
  <div className="mb-4">
    <label className="block text-brand-100 text-sm font-semibold mb-2">
      {label} {required && <span className="text-accent-500">*</span>}
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-brand-900 border border-brand-600 text-white text-sm rounded-lg focus:ring-accent-500 focus:border-accent-500 block p-3 placeholder-gray-400 transition-all duration-200"
    />
  </div>
);

export const TextArea: React.FC<InputProps> = ({ label, value, onChange, placeholder, required }) => (
  <div className="mb-4">
    <label className="block text-brand-100 text-sm font-semibold mb-2">
      {label} {required && <span className="text-accent-500">*</span>}
    </label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="w-full bg-brand-900 border border-brand-600 text-white text-sm rounded-lg focus:ring-accent-500 focus:border-accent-500 block p-3 placeholder-gray-400 transition-all duration-200"
    />
  </div>
);

export const Button: React.FC<{ onClick: () => void; loading: boolean; text: string }> = ({ onClick, loading, text }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`w-full text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 
      ${loading 
        ? 'bg-gray-600 cursor-not-allowed opacity-75' 
        : 'bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 hover:scale-[1.02] hover:shadow-accent-500/20'
      }`}
  >
    {loading ? (
      <span className="flex items-center justify-center gap-2">
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing...
      </span>
    ) : (
      text
    )}
  </button>
);