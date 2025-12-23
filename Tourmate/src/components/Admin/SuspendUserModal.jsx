// export default function SuspendUserModal({ user, onClose }) {
//   if (!user) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white w-[420px] rounded-2xl p-6">
//         <h2 className="text-lg font-semibold mb-2">Suspend User</h2>
//         <p className="text-sm text-gray-600">
//           Are you sure you want to suspend{" "}
//           <span className="font-semibold">{user.name}</span>? They will lose
//           access to the platform until reactivated.
//         </p>

//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border border-gray-200 rounded-xl"
//           >
//             Cancel
//           </button>

//           <button className="px-4 py-2 bg-red-500 text-white rounded-xl">
//             Suspend
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { suspendGuide, suspendTraveller } from "../../services/admin/UserManagement";

export default function SuspendUserModal({ user, onClose, type, onSuccess }) {
  if (!user) return null;

  const isSuspended =
    type === "guides"
      ? user.status === "SUSPENDED"
      : user.role === "SUSPENDED";

  const handleToggle = async () => {
    const res =
      type === "guides"
        ? await suspendGuide(user.guideId)
        : await suspendTraveller(user.userId);

    if (res.success) {
      onSuccess?.();
      onClose();
    } else {
      alert("Failed to update user status");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-2">
          {isSuspended ? "Unsuspend User" : "Suspend User"}
        </h2>

        <p className="text-sm text-gray-600">
          Are you sure you want to{" "}
          <span className="font-semibold">
            {isSuspended ? "unsuspend" : "suspend"}
          </span>{" "}
          <span className="font-semibold">
            {user.fullName || `${user.firstName} ${user.lastName}`}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleToggle}
            className={`px-4 py-2 rounded-xl text-white ${
              isSuspended
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isSuspended ? "Unsuspend" : "Suspend"}
          </button>
        </div>
      </div>
    </div>
  );
}
