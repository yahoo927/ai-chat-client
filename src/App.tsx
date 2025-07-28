import React from 'react';
import './App.css';
import ChatBox from './components/ChatBox';

function App() {
  return (
    <div className="App">
      <h1>Chat with AI Asisstants</h1>
      <ChatBox />
      <br />
      <br />
      <footer style={{ 
        fontSize: '12px', 
        color: 'grey', 
        textAlign: 'center',
        position: 'fixed',
        bottom: '10px',
        left: '0',
        right: '0',
        padding: '10px'
      }}>
        © 2025 OSeeLight. All rights reserved. - (Franken Fu - 647-503-7066)
      </footer>
    </div>
  );
}

export default App;