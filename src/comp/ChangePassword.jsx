import React, { useState } from 'react';
import RegisterModal from './RegisterModal';
function ChangePassword({closeModal}) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    const response = await fetch('/api/change-password', {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      setMessage('Password changed successfully');
    } else {
      const data = await response.json();
      setMessage(data.error || 'An error occurred');
    }
  };

  return (
    <RegisterModal closeModal={closeModal}>
    <div>
      <h2>Change Password</h2>
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleChangePassword}>Change Password</button>
      <div>{message}</div>
    </div>
    </RegisterModal>
  );
}

export default ChangePassword;