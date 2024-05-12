import React, { useState } from 'react';
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";

const Comment = ({ text }) => {
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);

    const handleUpvote = () => {
        setUpvotes(upvotes + 1);
    };

    const handleDownvote = () => {
        setDownvotes(downvotes + 1);
    };

    return (
        <li>
            <p>{text}</p>
            <div>
                <button onClick={handleUpvote}><BiSolidUpvote /> Upvote ({upvotes})</button>
                <button onClick={handleDownvote}><BiSolidDownvote /> Downvote ({downvotes})</button>
            </div>
        </li>
    );
};

export default Comment;
