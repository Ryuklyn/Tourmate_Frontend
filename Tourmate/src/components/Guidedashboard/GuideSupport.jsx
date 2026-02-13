import React, { useState } from "react";
import {
  Mail,
  Book,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  UserCheck,
} from "lucide-react";
import { sendSupport } from "../../services/support";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function GuideSupport() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const handleSendMessage = async () => {
    if (!subject || !message) {
      setStatus("Please fill in both subject and message.");
      return;
    }
  
    try {
      const role = "GUIDE";
      const res = await sendSupport(subject, message, role); // JWT handled in interceptor
      if (res.success) {
        setSubject("");
        setMessage("");
        toast.success("Message sent successfully!");
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message: " + error.message);
    }
  };
  const faqs = [
    {
      question: "How do I get bookings as a guide?",
      answer:
        "Complete your profile, add availability, and get approved. Tourists can then discover and book you directly.",
    },
    {
      question: "How does guide verification work?",
      answer:
        "Our team reviews your documents, experience, and profile details before approving your guide account.",
    },
    {
      question: "When do I receive payouts?",
      answer:
        "Payouts are processed after a tour is completed, based on the payout schedule set in your dashboard.",
    },
    {
      question: "Can I cancel a booking as a guide?",
      answer:
        "Yes, but frequent cancellations may affect your profile rating and visibility.",
    },
    {
      question: "How do I update my availability?",
      answer:
        "You can manage your availability from the Guide Dashboard under Schedule settings.",
    },
  ];

  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Guide Help & Support
        </h1>
        <p className="text-gray-500 mt-1">
          Support resources for guides on TourMate
        </p>
      </div>

      {/* Top Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full max-w-4xl">
        <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center text-center">
          <Mail className="w-10 h-10 text-[#0faf94]" />
          <h2 className="font-semibold mt-3">Guide Support Email</h2>
          <p className="text-gray-500 text-sm">guides@tourmate.com</p>
          <button className="mt-4 bg-[#0faf94] text-white px-5 py-2 rounded-xl">
            Contact Support
          </button>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center text-center">
          <Book className="w-10 h-10 text-[#0faf94]" />
          <h2 className="font-semibold mt-3">Guide Resources</h2>
          <p className="text-gray-500 text-sm">
            Policies, payouts & best practices
          </p>
          <button className="mt-4 bg-[#0faf94] text-white px-5 py-2 rounded-xl">
            View Resources
          </button>
        </div>
      </div> */}

      {/* FAQ Section */}
      <div className="bg-white shadow rounded-2xl p-6 w-full max-w-4xl mt-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#0faf94]" />
          Guide FAQs
        </h2>

        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 py-3">
            <button
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              className="w-full flex justify-between items-center text-left"
            >
              <span className="font-medium">{faq.question}</span>
              {openFAQ === index ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {openFAQ === index && (
              <p className="text-gray-600 mt-2 text-sm ml-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Message Card */}
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
            className="bg-[#0faf94] text-white px-6 py-3 rounded-xl w-full"
          >
            Send Message
          </button>


        </div>
      </div>
    </div>
  );
}
