# Nodejs - Express / Render Platform

## Step 1: Prepare Your Node.js Backend Application

- Create a Simple Node.js Application

```bash
mkdir my-node-app
cd my-node-app
npm init -y
```

- Install Required Packages: For this example, let's install express to set up a basic server:

```bash
npm install express cors dotenv
```

- Create Basic Server Code: Create a file named server.js:

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

- Create a .env File (optional): If you're using environment variables, create a .env file to store your configurations:

```plaintext
PORT=5000
```

# Step 2: Deploy the Node.js Application (Render)

- Node.js application using Render:
- Create an Account on Render: Sign up for an account at Render.
- Create a New Web Service:
- Click on New and select Web Service.
- Connect your GitHub repository where your Node.js code is located.
- Configure Your Web Service:


- Environment: Choose `Node`.
- Build Command: `npm install`.
- Start Command: `node server.js` or if you use nodemon during development, use nodemon server.js.
- Region: Select the region for your service.
- Click on Create Web Service.

# Step 3: Prepare Your Frontend for Netlify
- If you have a frontend app (e.g., built with HTML, CSS, and JavaScript), follow these steps to deploy it to Netlify:
- Create a New Directory for Your Frontend:

```bash
mkdir my-frontend
cd my-frontend
```

- Set Up Your Frontend Code: Create a simple index.html file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Frontend App</title>
</head>
<body>
    <h1>Welcome to My App</h1>
    <button id="fetchMessage">Fetch Message</button>
    <div id="message"></div>

    <script>
        document.getElementById('fetchMessage').addEventListener('click', async () => {
            const response = await fetch('https://tta-practice.onrender.com'); // Replace with your Render app URL
            const message = await response.text();
            document.getElementById('message').innerText = message;
        });
    </script>
</body>
</html>
```

# Step 4: Deploy Frontend to Netlify

- Create a Netlify Account: Sign up for a Netlify account.
- New Site from Git: After logging in, click on "New site from Git."
- Connect Your Repository: Connect your GitHub (or GitLab/Bitbucket) account to Netlify and select the repository that contains your frontend code.
- Configure Build Settings:
- Branch to deploy: Usually, it's main or master.
- Build command: N/A for simple HTML/CSS/JS; you can leave this blank.
- Publish directory: Specify the directory containing your index.html file.
- Deploy Site: Click on the "Deploy site" button. Netlify will begin the deployment process.

- Your Node.js application will be hosted on a service like Render, and you can access it via its URL.
- Your frontend can be hosted on Netlify, allowing you to make requests to your backend.