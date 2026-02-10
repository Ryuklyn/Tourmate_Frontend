import React, { useState, useEffect } from "react";
import {
  Camera,
  Globe,
  Wallet,
  Trash2,
  User,
  Mail,
  Phone,
  FileText,
  Pencil,
  X,
  Check,
} from "lucide-react";
import AvatarImg from "../../assets/img/Avatar.jpg";
import {  } from "../../services/user";
import { updateProfile,getUserData, changeProfilePic } from "../../services/user";

export default function ProfileSettings() {
  const [profileImage, setProfileImage] = useState(AvatarImg);
  const [isEditing, setIsEditing] = useState(false);

  // Form values
  const [form, setForm] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phoneNumber: "+1 (555) 123-4567",
    bio: "Traveler, photographer, and adventure lover.",
    language: "English",
    currency: "USD",
  });
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserData();
      if (res.success) {
        const data = res.data;
        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          bio: data.bio || "",
        });
        
        if (data.profilePic) {
          const imageSrc = data.profilePic
    ? `data:image/jpeg;base64,${data.profilePic}`
    : "/default-avatar.png";
    setProfileImage(imageSrc);
        }
      }
    };
    fetchUser();
  }, []);

  const handleSaveProfile = async () => {
    const res = await updateProfile(form);
    if (res.success) {
      alert("Profile updated successfully");
      setIsEditing(false);
    } else {
      alert("Error updating profile: " + res.error);
    }
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Update preview
    setProfileImage(URL.createObjectURL(file));
  
    const userId = localStorage.getItem("userId");
    const res = await changeProfilePic(file, userId);
    if (!res.success) {
      alert("Failed to upload profile picture: " + res.error);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const inputBase =
    "w-full px-4 py-2 rounded-lg border bg-gray-100 text-gray-600";
  const inputActive =
    "w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-800";

  return (
    <div className="min-h-screen bg-gray-50 pt-3 pb-10 px-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Profile Settings <SettingsIcon />
        </h1>
        <p className="text-gray-600">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* LEFT SIDE — PROFILE INFO */}
        <div className="xl:col-span-2 bg-white shadow-sm rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Personal Information
            </h2>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Pencil className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>

          {/* PROFILE PHOTO */}
          <div className="flex items-center gap-6 mb-8">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />

            {isEditing && (
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm bg-gray-100 hover:bg-gray-200 transition">
                <Camera className="w-4 h-4" />
                Change Photo
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

          {/* FORM FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field
              label="First Name"
              name="firstName"
              value={form.firstName}
              icon={<User className="w-4 h-4" />}
              onChange={handleChange}
              disabled={!isEditing}
              activeStyle={inputActive}
              disabledStyle={inputBase}
            />

            <Field
              label="Last Name"
              name="lastName"
              value={form.lastName}
              icon={<User className="w-4 h-4" />}
              onChange={handleChange}
              disabled={!isEditing}
              activeStyle={inputActive}
              disabledStyle={inputBase}
            />
          </div>

          <Field
            label="Email"
            name="email"
            value={form.email}
            icon={<Mail className="w-4 h-4" />}
            onChange={handleChange}
            disabled={true}
            activeStyle={inputActive}
            disabledStyle={inputBase}
            className="mt-6"
          />

          <Field
            label="Phone Number"
            name="phoneNumber"
            value={form.phoneNumber}
            icon={<Phone className="w-4 h-4" />}
            onChange={handleChange}
            disabled={!isEditing}
            activeStyle={inputActive}
            disabledStyle={inputBase}
            className="mt-6"
          />

          {/* BIO */}
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4" /> Bio
            </label>
            <textarea
              name="bio"
              rows="4"
              disabled={!isEditing}
              value={form.bio}
              onChange={handleChange}
              className={
                isEditing
                  ? "w-full px-4 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  : "w-full px-4 py-2 rounded-lg border bg-gray-100 text-gray-600"
              }
            ></textarea>
          </div>

          {/* ACTION BUTTONS */}
          {isEditing && (
            <div className="mt-8 flex gap-4">
              <button
              onClick={() => {setIsEditing(false);
                handleSaveProfile();}}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Check className="w-4 h-4" /> Save Changes
            </button>

              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDE — PREFERENCES */}
        <div className="space-y-8">
          <div className="bg-white shadow-sm rounded-2xl p-8 border border-gray-200 relative overflow-hidden">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Preferences
            </h2>

            <Field
              label="Preferred Language"
              name="language"
              value={form.language}
              icon={<Globe className="w-4 h-4" />}
              onChange={handleChange}
              disabled={!isEditing}
              activeStyle={inputActive}
              disabledStyle={inputBase}
            />

            <Field
              label="Currency"
              name="currency"
              value={form.currency}
              icon={<Wallet className="w-4 h-4" />}
              onChange={handleChange}
              disabled={!isEditing}
              activeStyle={inputActive}
              disabledStyle={inputBase}
              className="mt-6"
            />

            {isEditing && (
              <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Save Preferences
            </button>
            )}
          </div>

          {/* DANGER ZONE */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-red-700 mb-3">
              Danger Zone
            </h2>
            <p className="text-red-600 mb-6">
              Once you delete your account, there is no going back. Please be
              careful.
            </p>

            <button className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- COMPONENTS ------------------------ */

function Field({
  label,
  icon,
  name,
  value,
  onChange,
  disabled,
  placeholder,
  activeStyle,
  disabledStyle,
  className,
}) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
        {icon} {label}
      </label>
      <input
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        value={value|| ""}
        onChange={onChange}
        className={disabled ? disabledStyle : activeStyle}
      />
    </div>
  );
}

function SettingsIcon() {
  return (
    <svg
      className="w-6 h-6 text-gray-700 animate-spin-slow"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v2m0 8v2m6-6h2M4 12H2m14.95-4.95l1.4-1.4M6.34 17.66l-1.4 1.4m0-12.72l1.4 1.4m12.72 12.72l-1.4-1.4"
      />
    </svg>
  );
}
