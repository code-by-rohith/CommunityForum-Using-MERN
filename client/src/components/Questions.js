// Questions.js
import React, { useState, useEffect } from 'react';
import './ques.css';
import { BsQuestionSquare } from "react-icons/bs";
import QuestionGuideLinesCard from './QuestionGuideLinesCard';


const Questions = ({ name }) => {
    const [askingQuestion, setAskingQuestion] = useState(false);
    const [defaultQuestions, setDefaultQuestions] = useState(() => {
        const storedQuestions = localStorage.getItem('questions');
        return storedQuestions ? JSON.parse(storedQuestions) : [];
    });
    const [questionData, setQuestionData] = useState({
        name: name || '',
        title: '',
        details: '',
        tried: '',
        tags: '' 
    });

    useEffect(() => {
        localStorage.setItem('questions', JSON.stringify(defaultQuestions));
    }, [defaultQuestions]);

    const handleAskQuestion = () => {
        setAskingQuestion(true);
    };

    const handleCancelAsk = () => {
        setAskingQuestion(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setQuestionData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleQuestionSubmit = (event) => {
        event.preventDefault();
        console.log("Question Data:", questionData);

        const newQuestion = {
            id: Date.now(),
            title: questionData.title,
            content: questionData.details,
            username: questionData.name || name,
            tags: questionData.tags.split(',').map(tag => tag.trim()),
            views: 0
        };

        const updatedQuestions = [...defaultQuestions, newQuestion];
        setDefaultQuestions(updatedQuestions);
        setAskingQuestion(false);

        localStorage.setItem(`question_views_${newQuestion.id}`, 0);

        localStorage.setItem(`question_tags_${newQuestion.id}`, JSON.stringify(newQuestion.tags));

        setQuestionData({
            name: '',
            title: '',
            details: '',
            tried: '',
            tags: ''
        });
    };

    return (
        <div className="questions-container">
            <header>
                <br />
                <br />
                <br />
                <h1 className='q'><BsQuestionSquare className='jum' />  Questions</h1>
                <QuestionGuideLinesCard />
                <button className="ask-button" onClick={handleAskQuestion}>Ask Your Question</button>
            </header>
            {askingQuestion && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCancelAsk}>&times;</span>
                        <h2 className='ask'>Ask Your Question</h2>
                        <form onSubmit={handleQuestionSubmit}>
                            <label htmlFor="name">Your Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={questionData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={questionData.title}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="details">Details:</label>
                            <textarea
                                id="details"
                                name="details"
                                value={questionData.details}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                            <label htmlFor="tried">What did you try:</label>
                            <textarea
                                id="tried"
                                name="tried"
                                value={questionData.tried}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                            <label htmlFor="tags">Tags:</label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                value={questionData.tags}
                                onChange={handleInputChange}
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Questions;
