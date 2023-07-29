import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/message', { message });
      setResponse(previousResponse => previousResponse + '\n' + res.data.message);
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-6 mx-auto">
          <div className="border rounded p-3 mb-4" style={{ height: '400px', overflowY: 'scroll' }}>
            {response.split('\n').map((res, i) => (
              <p key={i}>{res}</p>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                type="text" 
                value={message} 
                onChange={handleMessageChange} 
                className="form-control"
                placeholder="Type your message here..."
              />
              <button type="submit" className="btn btn-primary">Ask GPT-3</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
