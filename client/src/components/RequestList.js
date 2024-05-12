import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RequestList.css';
import { CgProfile } from "react-icons/cg";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";

const RequestList = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState({});

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/requests');
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, []);

    const handleLike = async (id, event, type) => {
        event.stopPropagation(); // Stop the propagation of the event
        try {
            let likes = 0;
            if (type === 'upvote') {
                await axios.patch(`http://localhost:5000/requests/${id}/like`);
                likes = 1;
            } else if (type === 'downvote') {
                await axios.patch(`http://localhost:5000/requests/${id}/downvote`);
                likes = -1;
            }

            const updatedRequests = requests.map(request =>
                request._id === id ? { ...request, likes: request.likes + likes } : request
            );
            setRequests(updatedRequests);
        } catch (error) {
            console.error(`Error ${type === 'upvote' ? 'liking' : 'disliking'} request:`, error);
        }
    };

    const handleRequestClick = (request) => {
        setSelectedRequest(request);
    };

    const handleReadMore = (event, id) => {
        event.stopPropagation();
        const updatedRequests = requests.map(request =>
            request._id === id ? { ...request, expanded: true } : request
        );
        setRequests(updatedRequests);
    };

    const handleAddComment = async () => {
        if (!newComment.trim() || !selectedRequest) return;
        try {
            const response = await axios.post(`http://localhost:5000/requests/${selectedRequest._id}/comments`, {
                comment: newComment
            });
            const updatedComments = { ...comments };
            if (!updatedComments[selectedRequest._id]) {
                updatedComments[selectedRequest._id] = [];
            }
            updatedComments[selectedRequest._id].push(response.data);
            setComments(updatedComments);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const sortedRequests = [...requests].sort((a, b) => b.likes - a.likes);

    return (
        <div className="request-list-container">
            <ul className="request-list">
                {sortedRequests.map((request, index) => (
                    <li key={request._id} className={`request-item ${index === 0 ? 'top-request' : ''}`} onClick={() => handleRequestClick(request)}>
                        <br></br>
                        <br></br>
                        <p className="resident-name"><CgProfile className='prof' /> {request.residentName}</p>
                        <h3 className="content-title">{request.contentTitle}</h3>
                        <div  className="request-content">
                            {request.expanded ? request.content : `${request.content.slice(0, 250)}...`}
                            {!request.expanded && request.content.length > 100 && (
                                <span className="read-more-button" onClick={(e) => handleReadMore(e, request._id)}>Read more</span>
                            )}
                        </div>
                        <p className="likes" onClick={(event) => handleLike(request._id, event, 'upvote')}><BiSolidUpvote /><br />{request.likes}</p>
                        <p className="likes" onClick={(event) => handleLike(request._id, event, 'downvote')}><BiSolidDownvote /></p>
                    </li>
                ))}
            </ul>
            {selectedRequest && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setSelectedRequest(null)}>&times;</span>
                        <h2>{selectedRequest.residentName}</h2>
                        <h3>{selectedRequest.contentTitle}</h3>
                        <p>{selectedRequest.content}</p>
                        <h3 className='comment'>Comments:</h3>
                        <ul>
                            {comments[selectedRequest._id] && comments[selectedRequest._id].map((comment, index) => (
                                <li key={index}>{comment}</li>
                            ))}
                        </ul>
                        <div className="add-comment-container">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <br></br>
                            <br></br>
                            <button className="cmtbtn" onClick={handleAddComment}>Add Comment</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestList;
