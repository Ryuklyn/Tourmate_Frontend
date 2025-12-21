export default function SuspendUserModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-2">Suspend User</h2>
        <p className="text-sm text-gray-600">
          Are you sure you want to suspend{" "}
          <span className="font-semibold">{user.name}</span>? They will lose
          access to the platform until reactivated.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-xl"
          >
            Cancel
          </button>

          <button className="px-4 py-2 bg-red-500 text-white rounded-xl">
            Suspend
          </button>
        </div>
      </div>
    </div>
  );
}
