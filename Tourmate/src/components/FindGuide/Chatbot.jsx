import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5">
      {open ? (
        <div className="bg-white w-80 h-96 shadow-lg rounded-xl flex flex-col">
          <div className="flex justify-between items-center p-3 border-b">
            <h3 className="font-semibold">Talk with Us</h3>
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto text-sm text-gray-600">
            Use voice or text to communicate.
          </div>
          <div className="p-3 border-t flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border rounded-l-md px-3 py-2 text-sm"
            />
            <button className="bg-blue-600 text-white px-4 rounded-r-md">
              ➤
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
