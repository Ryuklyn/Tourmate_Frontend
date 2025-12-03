// src/components/Settings/Notifications.jsx

import React, { useState } from "react";
import ToggleSwitch from "../../components/Guidedashboard/ToggleSwitch";
import { Bell } from "lucide-react";

export default function Notifications() {
  const [settings, setSettings] = useState({
    newBooking: true,
    paymentUpdates: true,
    newReviews: true,
    marketingEmails: false,
    smsNotifications: false,
  });

  const handleToggle = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mt-6 p-8 border border-gray-300">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="text-[#0faf94] w-6 h-6" />
        <h2 className="text-xl font-semibold py-1">Notification Settings</h2>
      </div>

      {/* LIST */}
      <div className="space-y-8 text-gray-700">
        {/* New Bookings */}
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">New Bookings</p>
            <p className="text-gray-500 text-sm">
              Get notified when someone books a tour
            </p>
          </div>
          <ToggleSwitch
            checked={settings.newBooking}
            onChange={(value) => handleToggle("newBooking", value)}
          />
        </div>

        {/* Payment Updates */}
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">Payment Updates</p>
            <p className="text-gray-500 text-sm">
              Notifications about payments and payouts
            </p>
          </div>
          <ToggleSwitch
            checked={settings.paymentUpdates}
            onChange={(value) => handleToggle("paymentUpdates", value)}
          />
        </div>

        {/* Reviews */}
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">New Reviews</p>
            <p className="text-gray-500 text-sm">
              When guests leave reviews for your tours
            </p>
          </div>
          <ToggleSwitch
            checked={settings.newReviews}
            onChange={(value) => handleToggle("newReviews", value)}
          />
        </div>

        {/* Marketing Emails */}
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">Marketing Emails</p>
            <p className="text-gray-500 text-sm">
              Tips, updates, and promotional content
            </p>
          </div>
          <ToggleSwitch
            checked={settings.marketingEmails}
            onChange={(value) => handleToggle("marketingEmails", value)}
          />
        </div>

        {/* SMS */}
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">SMS Notifications</p>
            <p className="text-gray-500 text-sm">
              Receive important updates via text message
            </p>
          </div>
          <ToggleSwitch
            checked={settings.smsNotifications}
            onChange={(value) => handleToggle("smsNotifications", value)}
          />
        </div>
      </div>
    </div>
  );
}
