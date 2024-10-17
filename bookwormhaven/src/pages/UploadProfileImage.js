import React, { useState } from 'react';
import axios from 'axios';

const UploadProfileImage = ({ readerId }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const baseimgapi = "http://localhost:3000/uploads/";
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const handleImageUpload = async () => {
        if (!profileImage) {
            setError('Please select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('profileImage', profileImage);

        try {
            const response = await axios.post(`http://localhost:3000/api/readers/profile/upload/${readerId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess(response.data.message);

            setUploadedImageUrl(`${baseimgapi}/${response.data.profileImage}`);
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'Error uploading profile image');
            setSuccess('');
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={(e) => setProfileImage(e.target.files[0])}
            />
            <button onClick={handleImageUpload}>Upload Image</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {uploadedImageUrl && (
                <div>
                    <p>Uploaded Profile Image:</p>
                    <img src={uploadedImageUrl} alt="Profile" width={150} height={150} />
                </div>
            )}
        </div>
    );
};

export default UploadProfileImage;
