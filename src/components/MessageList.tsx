import React from 'react';
import ReactMarkdown from 'react-markdown';

//npm install react-markdown
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

type MessageListProps = {
  messages: Message[];
};

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div key={message.id} className={`message ${message.sender}`}>
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default MessageList;