import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function App() {
  const [message, setMessage] = useState('');

  const fetchMessage = async () => {
    try {
      const response = await fetch('https://tta-practice.onrender.com'); // Replace with your Render backend URL
      const messageText = await response.text();
      setMessage(messageText);
    } catch (error) {
      console.error('Error fetching message:', error);
      setMessage('Failed to fetch message.');
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Welcome to My Frontend App</h1>
      <button onClick={fetchMessage} className="btn btn-primary btn-lg">
        Fetch Message
      </button>
      {message && (
        <div className="mt-4 alert alert-info" role="alert">
          {message}
        </div>
      )}
    </div>
  );
}

export default App;