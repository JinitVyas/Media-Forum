import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadImage = () => {
    const [file, setFile] = useState(null);
    const [sessionData, setSessionData] = useState(null); // State to store session data

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:3001/upload', formData, {
                responseType: 'blob', // Important for file download
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'converted_image.webp'); // Specify the file name
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    useEffect(() => {
        // Retrieve the token from localStorage or sessionStorage
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        console.log('Retrieved token:', token); // Debug log
        if (token) {
            setSessionData({ token });
        } else {
            setSessionData(null);
        }
    }, []);
    console.log();
    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {/* Debug log to check sessionData */}
            {sessionData ? (
                <p>Token: {sessionData.token}</p>
            ) : (
                <p>No active session.</p>
            )}
            <button onClick={handleUpload}>Upload and Convert</button>
        </div>
    );
};

export default UploadImage;
