import { usePopup } from "@/widgets/popup-store/popup-store";
import { useState } from "react";

export default function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const setSignErroruppopup = usePopup(
    (state: any) => state.setSignErroruppopup
  );
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setSignErroruppopup(true, "New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setSignErroruppopup(true, "You are not logged in");
      }
      const response = await fetch(
        `${BASE_URL}/profile/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      if (!response.ok) {
        const errText = await response.text(); // or response.json() if backend sends JSON
        throw new Error(errText || "Failed to change password");
        setSignErroruppopup(true, `${errText} "Failed to change password"`);
      }

      const data = await response.text(); // or response.json() if backend sends JSON
      setMessage(data);
      setError("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setSignErroruppopup(true, `Failed to change password: ${err.message}`);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#fc8100] my-4 rounded-lg mx-auto p-4"
    >
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <div className="mb-2">
        <label>Old Password:</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
          className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
        />
      </div>
      <div className="mb-2">
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
        />
      </div>
      <div className="mb-2">
        <label>Confirm New Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="my-1 border bg-slate-200 rounded-lg p-4 w-full"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-3 mt-4 rounded-lg font-bold"
      >
        Save new password
      </button>

      {message && <p className="mt-2 text-green-600">{message}</p>}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </form>
  );
}
