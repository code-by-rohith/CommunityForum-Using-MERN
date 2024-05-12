import React, { useState, useEffect } from 'react';
import './ques1.css';
import { BsQuestionSquare } from "react-icons/bs";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { AiFillTags } from "react-icons/ai";

const Comment = ({ text, votes, isBold, isItalic, onUpvote, onDownvote }) => (
  <li className="comment-item">
    <div className="comment-text" style={{ fontWeight: isBold ? 'bold' : 'normal', fontStyle: isItalic ? 'italic' : 'normal' }}>{text}</div>
    <div className="comment-votes">
      <button className="upvote-btn" onClick={onUpvote}><BiSolidUpvote /></button>
      <span className="votes-count">{votes}</span>
      <button className="downvote-btn" onClick={onDownvote}><BiSolidDownvote/> </button>
    </div>
  </li>
);

const Question = ({ id, title, username, content, tags, onClick }) => {
    const [views, setViews] = useState(() => {
        const storedViews = localStorage.getItem(`question_views_${id}`);
        return storedViews ? parseInt(storedViews) : 0;
    });
    const [trending, setTrending] = useState(false);

    const handleClick = () => {
        setViews(prevViews => prevViews + 1);
        onClick();
        // Store updated views in local storage
        localStorage.setItem(`question_views_${id}`, views + 1);
    };

    // Function to truncate text if it exceeds a certain number of characters
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + "...";
    };

    useEffect(() => {
        if (views > 100) { // Adjust the threshold as needed
            setTrending(true);
        } else {
            setTrending(false);
        }
        console.log(`Question ${id} is trending: ${trending}`);
    }, [views]);

    return (
        <div className={`question ${trending ? 'trending' : ''}`} onClick={handleClick}>
            <h2 className='tittle'>{truncateText(title, 100)}</h2>
            <p>{truncateText(content, 200)}</p>
            <p className="asked-by">Asked by {username}</p>
            {Array.isArray(tags) && tags.length > 0 && <p className="tags"><AiFillTags /> {tags.join(' ')}</p>}
            <p className="views"> {views} views</p>
            {trending && <span className="trending-tag">#Trending</span>}
        </div>
    );
};

const Questions1 = ({ name }) => {
    const [defaultQuestions, setDefaultQuestions] = useState(() => {
        const storedQuestions = localStorage.getItem('questions');
        return storedQuestions ? JSON.parse(storedQuestions) : [];
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [askingQuestion, setAskingQuestion] = useState(false);
    const [questionData, setQuestionData] = useState({
        name: name || '', // Set the default username to the passed prop or an empty string
        title: '',
        details: '',
        tried: '',
        tags: ''
    });
    const [filteredQuestions, setFilteredQuestions] = useState(defaultQuestions);
    const [newAnswer, setNewAnswer] = useState('');
    const [answers, setAnswers] = useState(() => {
        const storedAnswers = localStorage.getItem('answers');
        return storedAnswers ? JSON.parse(storedAnswers) : {};
    });
    const [boldAnswer, setBoldAnswer] = useState(false);
    const [italicAnswer, setItalicAnswer] = useState(false);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredQuestions(defaultQuestions);
        } else {
            const filtered = defaultQuestions.filter(question =>
                question.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredQuestions(filtered);
        }
    }, [searchQuery, defaultQuestions]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
    };

    const handleCloseModal = () => {
        setSelectedQuestion(null);
    };

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
            id: Date.now(), // Generate a unique id for the new question
            title: questionData.title,
            content: questionData.details,
            username: questionData.name || name, // Use the entered username or the default prop value
            tags: questionData.tags.split(',').map(tag => tag.trim()), // Split tags by comma and trim whitespace
            views: 0 // Initialize views to 0
        };

        const updatedQuestions = [...defaultQuestions, newQuestion];
        localStorage.setItem('questions', JSON.stringify(updatedQuestions));
        setDefaultQuestions(updatedQuestions);
        setFilteredQuestions(updatedQuestions);
        setAskingQuestion(false);

        // Store views for the new question
        localStorage.setItem(`question_views_${newQuestion.id}`, 0);

        // Store tags for the new question
        localStorage.setItem(`question_tags_${newQuestion.id}`, JSON.stringify(newQuestion.tags));
    };

    const handleAddAnswer = () => {
        if (!newAnswer.trim() || !selectedQuestion) return;
        const updatedAnswers = { ...answers };
        if (!updatedAnswers[selectedQuestion.id]) {
            updatedAnswers[selectedQuestion.id] = [];
        }
        const newAnswerObj = {
            text: newAnswer,
            isBold: boldAnswer,
            isItalic: italicAnswer,
            username: name, // Store the username of the current user
            votes: 0 // Initialize votes to 0
        };
        updatedAnswers[selectedQuestion.id].push(newAnswerObj);
        setAnswers(updatedAnswers);
        setNewAnswer('');

        // Update local storage
        localStorage.setItem('answers', JSON.stringify(updatedAnswers));
    };

    const handleUpvote = (questionId, answerIndex) => {
        const updatedAnswers = { ...answers };
        updatedAnswers[questionId][answerIndex].votes += 1;
        setAnswers(updatedAnswers);
    };

    const handleDownvote = (questionId, answerIndex) => {
        const updatedAnswers = { ...answers };
        updatedAnswers[questionId][answerIndex].votes -= 1;
        setAnswers(updatedAnswers);
    };

    const toggleBold = () => {
        setBoldAnswer(!boldAnswer);
    };

    const toggleItalic = () => {
        setItalicAnswer(!italicAnswer);
    };

    return (
        <div className="questions-container">
            <header>
                <br></br>
                <br></br>
                <br></br>
                <h1 className='q'><BsQuestionSquare className='jum' /> Top Questions</h1>

                

                
            </header>
            
            
            <main>
                {filteredQuestions.map(question => (
                    <Question
                        key={question.id}
                        id={question.id}
                        title={question.title}
                        username={question.username}
                        content={question.content}
                        tags={question.tags}
                        onClick={() => handleQuestionClick(question)}
                    />
                ))}
            </main>
            {selectedQuestion && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>{selectedQuestion.title}</h2>
                        <p>{selectedQuestion.content}</p>
                        <h3 className='comment'>Answers:</h3>
                        
                        <ul>
                            {answers[selectedQuestion.id] && answers[selectedQuestion.id].map((answer, index) => (
                                <Comment
                                    key={index}
                                    text={answer.text}
                                    votes={answer.votes}
                                    isBold={answer.isBold}
                                    isItalic={answer.isItalic}
                                    onUpvote={() => handleUpvote(selectedQuestion.id, index)}
                                    onDownvote={() => handleDownvote(selectedQuestion.id, index)}
                                />
                            ))}
                        </ul>
                        <div>
                            <button className='bold' onClick={toggleBold}>Bold</button>
                            <button className='italic' onClick={toggleItalic}>Italic</button>
                        </div>
                        <div className="add-comment-container">
                            <input
                                type="text"
                                placeholder="Add an answer..."
                                value={newAnswer}
                                onChange={(e) => setNewAnswer(e.target.value)}
                                style={{ fontWeight: boldAnswer ? 'bold' : 'normal', fontStyle: italicAnswer ? 'italic' : 'normal' }}
                            />
                            <br></br>
                            <br></br>
                            

                            <button className="cmtbtn" onClick={handleAddAnswer}>Add Answer</button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Questions1;
