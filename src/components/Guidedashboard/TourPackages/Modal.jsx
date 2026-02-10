import { X } from "lucide-react";

export default function Modal({ title, subtitle, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-500 mb-4">{subtitle}</p>

        {children}
      </div>
    </div>
  );
}
