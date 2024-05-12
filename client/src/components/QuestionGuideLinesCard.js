// QuestionGuideLinesCard.js
import React from 'react';
import './QuestionGuideLinesCard.css'; // Import CSS file for styling

const QuestionGuideLinesCard = () => {
    return (
        <div className="question-guidelines-card-container">
            <div className="question-guidelines-card">
                <h2>Writing a good question</h2>
                <p>You’re ready to ask a programming-related question and this form will help guide you through the process.</p>
                <p>Looking to ask a non-programming question? See the topics here to find a relevant site.</p>
                <h3>Steps</h3>
                <ol>
                    <li>Summarize your problem in a one-line title.</li>
                    <li>Describe your problem in more detail.</li>
                    <li>Describe what you tried and what you expected to happen.</li>
                    <li>Add “tags” which help surface your question to members of the community.</li>
                    <li>Review your question and post it to the site.</li>
                </ol>
            </div>
        </div>
    );
};

export default QuestionGuideLinesCard;
