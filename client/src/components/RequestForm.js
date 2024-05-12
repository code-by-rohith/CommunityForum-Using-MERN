import React, { useState } from 'react';
import axios from 'axios';
import './RequestForm.css'; // Import the CSS file for styling

const RequestForm = ({ onAddRequest }) => {
    const [residentName, setResidentName] = useState('');
    const [content, setContent] = useState('');
    const [contentTitle, setContentTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/requests', {
                residentName,
                content,
                contentTitle,
            });

            // Assuming the backend returns the newly created request
            onAddRequest(response.data);
            setResidentName('');
            setContent('');
            setContentTitle('');
            setSuccessMessage('Request submitted successfully!');
            setShowModal(true);
        } catch (error) {
            console.error('Error creating request:', error);
        }
    };

    // Function to handle the alert when the button is clicked
    const handleAlert = () => {
        alert('Submitted');
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSuccessMessage('');
    };

    return (
        <div className="request-form-container">
            <h2 className='q1'>Create Post</h2>
            <form onSubmit={handleSubmit} className="request-form">
                <div className="form-group">
                    <label  htmlFor="residentName" className="form-label">
                         Author
                    </label>
                    <input
                        id="residentName"
                        
                        value={residentName}
                        type="text"
                        onChange={(e) => setResidentName(e.target.value)}
                        className="form-input"
                    />
                </div>
                {/* Title for the Content */}
                <div className="form-group">
                    <label htmlFor="contentTitle" className="form-label">
                        Title for Content:
                    </label>
                    <input
                        id="contentTitle"
                        type="text"
                        value={contentTitle}
                        onChange={(e) => setContentTitle(e.target.value)}
                        className="form-input"
                        placeholder="Enter title for content"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content" className="form-label">
                        Content:
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="form-textarea"
                    />
                </div>
                <button type="submit" className="submit-button" onClick={handleAlert}>
                    Post
                </button>
            </form>
            {/* Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <p>{successMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestForm;