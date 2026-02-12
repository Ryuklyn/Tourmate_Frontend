import React, { useState } from "react";
import { Mail, Book, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { sendSupport } from "../../services/support.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function HelpSupport() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  
  const handleSendMessage = async () => {
    if (!subject || !message) {
      setStatus("Please fill in both subject and message.");
      return;
    }
  
    try {
      const role = "TRAVELLER";
      const res = await sendSupport(subject, message, role); // JWT handled in interceptor
      if (res.success) {
        setStatus("Message sent successfully!");
        toast.success("Message sent successfully!");
        setSubject("");
        setMessage("");
      } else {
        setStatus("Failed to send message: " + res.error);
        toast.e
      }
    } catch (error) {
      setStatus("Error sending message: " + error.message);
      toast.error("Error sending message: " + error.message);
    }
  };
  


  const faqs = [
    {
      question: "How do I book a guide?",
      answer:
        "Browse our guides, select your preferred guide, choose a date and time, and confirm your booking. You'll receive instant confirmation via email.",
    },
    {
      question: "What is the cancellation policy?",
      answer: "Our cancellation policy varies by guide and location.",
    },
    {
      question: "How do I become a guide?",
      answer: "Sign up on our platform and complete the verification process.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept major credit/debit cards and mobile wallet payments.",
    },
    {
      question: "Can I message a guide before booking?",
      answer: "Yes, you can contact guides to ask questions before booking.",
    },
  ];

  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800">Help & Support</h1>
      <p className="text-gray-500 mt-1">
        We're here to help! Find answers or get in touch with our team
      </p>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full max-w-4xl">
        <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center text-center">
          <Mail className="w-10 h-10 text-blue-600" />
          <h2 className="font-semibold mt-3">Email Support</h2>
          <p className="text-gray-500 text-sm">support@tourmate.com</p>
          <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-xl">
            Send Email
          </button>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center text-center">
          <Book className="w-10 h-10 text-blue-600" />
          <h2 className="font-semibold mt-3">Help Center</h2>
          <p className="text-gray-500 text-sm">Browse our guides & articles</p>
          <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-xl">
            Visit Center
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white shadow rounded-2xl p-6 w-full max-w-4xl mt-10">
        <h2 className="text-xl font-semibold mb-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-black-600" /> Frequently Asked
            Questions
          </div>
        </h2>

        {/* <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          Frequently Asked Questions
        </h2> */}

        {faqs.map((faq, index) => (
          <div key={index} className="border-b-[0.5px] border-gray-300 py-3">
            <button
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              className="w-full flex justify-between items-center text-left"
            >
              <span className="font-medium">{faq.question}</span>
              {openFAQ === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {openFAQ === index && (
              <p className="text-gray-600 mt-2 text-sm ml-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Send Message Card */}
      <div className="bg-white shadow rounded-2xl p-6 w-full max-w-4xl mt-10">
        <h2 className="text-xl font-semibold">Send Us a Message</h2>
        <p className="text-gray-500 text-sm mb-4">
          Can't find what you're looking for? Send us a message and we'll get
          back to you within 24 hours
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-white border-[0.5px] border-gray-300 rounded-xl p-3 focus:outline-blue-600"
          />

          <textarea
            rows="4"
            placeholder="Tell us about your issue or question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border-[0.5px] border-gray-300 rounded-xl p-3 focus:outline-blue-600"
          />


          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl w-full"
          >
            Send Message
          </button>
          {status && <p className="text-sm text-gray-600 mt-2">{status}</p>}

        </div>
      </div>
    </div>
  );
}
