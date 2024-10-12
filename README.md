Here’s a simplified example of how to build a basic CMS using the MERN stack with instructions for hosting your frontend on GitHub Pages and backend on Heroku.

Step 1: Set Up the Backend (Node.js & Express)
Create a New Directory for Your Project:

bash
코드 복사
mkdir cms-backend
cd cms-backend
Initialize a New Node.js Project:

bash
코드 복사
npm init -y
Install Required Packages:

bash
코드 복사
npm install express mongoose body-parser cors dotenv
Create the Backend Files:

Create the following directory structure:
bash
코드 복사
cms-backend/
├── .env
├── server.js
├── models/
│   └── Post.js
└── routes/
    └── posts.js
Create a .env File:

plaintext
코드 복사
MONGO_URI=your_mongodb_connection_string
PORT=5000
Create the Post Model (models/Post.js):

javascript
코드 복사
// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Post', PostSchema);
Create the Routes for Posts (routes/posts.js):

javascript
코드 복사
// routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a post
router.post('/', async (req, res) => {
    const post = new Post(req.body);
    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
Set Up the Express Server (server.js):

javascript
코드 복사
// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const postsRoute = require('./routes/posts');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());

app.use('/api/posts', postsRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
Step 2: Deploy the Backend
You can deploy the backend to a service like Heroku. Here’s a basic guide:
Sign up for Heroku.
Install the Heroku CLI on your machine.
Log in to your Heroku account via the CLI:
bash
코드 복사
heroku login
Create a new Heroku app:
bash
코드 복사
heroku create your-app-name
Set your MongoDB URI as an environment variable:
bash
코드 복사
heroku config:set MONGO_URI=your_mongodb_connection_string
Deploy your app:
bash
코드 복사
git init
heroku git:remote -a your-app-name
git add .
git commit -m "Initial commit"
git push heroku master
Step 3: Set Up the Frontend (React)
Create a New React App: In a new directory:

bash
코드 복사
npx create-react-app cms-frontend
cd cms-frontend
Install Axios for API Requests:

bash
코드 복사
npm install axios
Create Components: You will need components for creating, reading, updating, and deleting posts.

Create a folder named components in the src directory and add the following files:

PostList.js

javascript
코드 복사
// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('https://your-heroku-app.herokuapp.com/api/posts');
            setPosts(res.data);
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
PostForm.js

javascript
코드 복사
// src/components/PostForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://your-heroku-app.herokuapp.com/api/posts', { title, content });
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
            <button type="submit">Create Post</button>
        </form>
    );
};

export default PostForm;
Update the App Component: In src/App.js, import and use the PostList and PostForm components.

javascript
코드 복사
// src/App.js
import React from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

function App() {
    return (
        <div>
            <h1>CMS Dashboard</h1>
            <PostForm />
            <PostList />
        </div>
    );
}

export default App;
Step 4: Deploy the Frontend to GitHub Pages
Install the gh-pages Package:

bash
코드 복사
npm install gh-pages --save-dev
Update package.json: Add the following properties:

json
코드 복사
{
  "homepage": "https://yourusername.github.io/cms-frontend",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
Deploy Your Frontend: Run the following command:

bash
코드 복사
npm run deploy
Final Notes
Database: You can use MongoDB Atlas for your MongoDB database.
Frontend-Backend Communication: Ensure that the API URLs point to your deployed Heroku backend.
CORS: If you encounter CORS issues, ensure your backend server allows requests from your frontend’s domain.
Real Data: You might want to add more features, such as user authentication, better error handling, and styling.
This example provides a simple yet comprehensive way to create a CMS using the MERN stack, utilizing GitHub