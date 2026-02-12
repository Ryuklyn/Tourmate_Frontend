import React, { useEffect, useState } from "react";
import { Camera, Plus, X } from "lucide-react";
import { getProfile, updateGuideInfo, updateProfilePic } from "../../services/guide/guideProfile";
import { updateProfile } from "../../services/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function GuideProfileManage() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    profileImage: "",
    categories: [],
    languages: [],
  });
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();

      if (res.success) {
        setProfile({
          fullName: res.data.fullName || "",
          email: res.data.email || "",
          phoneNumber: res.data.phoneNumber || "",
          bio: res.data.bio || "",
          profileImage: res.data.profilePic || "",
          categories: res.data.categories || [],
          languages: res.data.languages || [],
        });
        console.log(res.data);
      } else {
        console.error(res.error);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []); const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= PROFILE PIC HANDLER ================= */
  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
    if (e.target.files[0]) {
      setProfile((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  /* ================= SAVE PROFILE INFO ================= */
  const handleSaveInfo = async () => {
    const guidePayload = {
      bio: profile.bio,
      fullName: `${profile.fullName}`,
    };

    const res = await updateGuideInfo(guidePayload);
    if (res.success) {
      toast.success("Profile info updated successfully");
    } else {
      altoast.error(`Error: ${res.error}`);
    }
  };

  /* ================= SAVE PROFILE PIC ================= */
  const handleProfilePicUpload = async () => {
    if (!profilePic) return toast.warn("Select an image");

    const res = await updateProfilePic(profilePic);
    if (res.success) {
      toast.success("Profile picture updated successfully");
    } else {
      toast.error(`Error: ${res.error}`);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Profile Management
      </h1>

      {/* Container */}
      <div className="space-y-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Photo */}
          <div className="bg-white p-6 rounded-xl mb-6">
            <div className="relative w-40 h-40 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
              {profile.profileImage ? (
                <img
                  src={
                    profile.profileImage.startsWith("blob:")
                      ? profile.profileImage
                      : `data:image/jpeg;base64,${profile.profileImage}`
                  }
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Camera className="text-gray-400 w-10 h-10" />
              )}

              <label className="absolute bottom-2 right-2 bg-green-500 p-2 rounded-full cursor-pointer">
                <Plus size={18} color="white" />
                <input type="file" hidden onChange={handleFileChange} />
              </label>
            </div>

            <button
              onClick={handleProfilePicUpload}
              className="mt-4 block mx-auto bg-green-500 text-white px-4 py-2 rounded"
            >
              Update Profile Picture
            </button>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

            <div className="mt-4">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-600 font-medium mb-1">
                Email
              </label>
              <input
                name="email"
                value={profile.email}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-600 font-medium mb-1">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                value={profile.phoneNumber}
                disabled
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Professional Bio</h2>

          <label className="text-gray-600 font-medium mb-1 block">
            About You
          </label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
          />
          <p className="text-gray-400 text-sm mt-1">Max 500 characters</p>
        </div>

        {/* Languages & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Languages */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Languages</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.languages.length > 0 ? (
                profile.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()}
                  </span>
                ))
              ) : (
                <p className="text-gray-400">No languages added yet</p>
              )}
            </div>

            <button className="mt-4 text-[#0faf94] font-medium hover:underline flex items-center gap-1 border-2 border-[#0faf94] px-3 py-1 rounded-lg w-max">
              <Plus size={18} /> Add Language
            </button>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">
              Certifications & Specialties
            </h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {profile.categories.length > 0 ? (
                profile.categories.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                  >
                    {item.replace("_", " ")}
                  </span>
                ))
              ) : (
                <p className="text-gray-400">No certifications yet</p>
              )}
            </div>

            <button className="text-[#0faf94] font-medium hover:underline flex items-center gap-1 border-2 border-[#0faf94] px-3 py-1 rounded-lg w-max">
              <Plus size={18} /> Add Certification
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button className="px-6 py-3 bg-white rounded-lg hover:bg-gray-300 border-2 border-[#0faf94] text-gray-500">
            Cancel
          </button>
          <button onClick={handleSaveInfo} className="px-6 py-3 bg-[#0faf94] text-white rounded-lg hover:bg-green-700">
            Save Changes
          </button>

        </div>
      </div>
    </div >
  );
}
