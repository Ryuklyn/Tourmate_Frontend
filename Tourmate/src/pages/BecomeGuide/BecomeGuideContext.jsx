import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../services/user";

const BecomeGuideContext = createContext(null);

export function BecomeGuideProvider({ children }) {
  const [formData, setFormData] = useState({
    personal: {
      fullName: "",
      email: "",
      phone: "",
      languages: [],
      experience: "", // single selection now
      profileImage: null,
      location: "",
    },
    verification: {
      governmentNumber: "", // ✅ updated
      dob: "",
      governmentPic: null, // renamed from idFile
    },
    skills: {
      specialities: [],
      hourlyRate: "",
      bio: "",
    },
    banking: {
      bankName: "",
      holderName: "",
      accountNumber: "",
    },
  });
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserData();
      if (res.success) {
        setUser(res.data);
      }
    };
    fetchUser();

  }, []);
  const navigate = useNavigate();
  if(user?.role !== "TRAVELLER"){
    navigate("/dashboard");
  }
  const updateForm = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
    console.log(data);
  };

  return (
    <BecomeGuideContext.Provider value={{ formData, updateForm }}>
      {children}
    </BecomeGuideContext.Provider>
  );
}

export const useBecomeGuide = () => {
  const ctx = useContext(BecomeGuideContext);
  if (!ctx) throw new Error("useBecomeGuide must be used inside BecomeGuideProvider");
  return ctx;
};
