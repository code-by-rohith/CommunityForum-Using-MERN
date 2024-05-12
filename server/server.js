const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
mongoose.connect(
    'mongodb://localhost:27017/societyDB',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const requestSchema = new mongoose.Schema({
    residentName: { type: String, required: true },
    content: { type: String, required: true },
    contentTitle: { type: String },
    likes: { type: Number, default: 0 },
    comments: { type: [String], default: [] } // Array to store comments
});

const Request = mongoose.model('Request', requestSchema);

// Create a new request
app.post('/requests', async (req, res) => {
    try {
        const { residentName, content, contentTitle } = req.body;
        const newRequest = new Request({ residentName, content, contentTitle });
        const savedRequest = await newRequest.save();
        res.json(savedRequest);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all requests
app.get('/requests', async (req, res) => {
    try {
        const requests = await Request.find();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Like a request
app.patch('/requests/:id/like', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRequest = await Request.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        res.json(updatedRequest);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Downvote a request
app.patch('/requests/:id/downvote', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRequest = await Request.findByIdAndUpdate(
            id,
            { $inc: { likes: -1 } },
            { new: true }
        );
        res.json(updatedRequest);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a comment to a request
app.post('/requests/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const updatedRequest = await Request.findByIdAndUpdate(
            id,
            { $push: { comments: comment } },
            { new: true }
        );
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
