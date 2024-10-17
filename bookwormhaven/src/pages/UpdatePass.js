import axios from 'axios';
import React, { useState, useRef } from 'react';
import '../Styling/Auth.css';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
const UpdatePassword = ({ readerId }) => {
    const toast = useRef(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handlePasswordUpdate = async () => {
        if (!currentPassword || !newPassword) {
            setError('Please fill in both fields.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/api/readers/update-password/${readerId}`, {
                currentPassword,
                newPassword,
            });

            setSuccess(response.data.message);
            console.log(response.data.message);
            showSuccess();
        } catch (err) {
            setError(err.response?.data?.error || 'Error updating password');
            showError();
        }
    };
    const showSuccess = () => {
        toast.current.show({ severity: 'success', detail: 'Updated', life: 3000 });
    }
    const showError = () => {
        toast.current.show({ severity: 'error', detail: 'Error to update', life: 3000 });
    }
    return (
        <div className='login-container'>
            <Toast ref={toast} style={{height:"15px",width:"100px",padding:"0px"}}/>
            <form onSubmit={handlePasswordUpdate}>
                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button type="submit" label="Update Password"></Button>
            </form>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>} */}

        </div>
    );
};

export default UpdatePassword;
