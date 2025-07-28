import React, { useState } from 'react';

type InputBoxProps = {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
};

const InputBox: React.FC<InputBoxProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-box">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type a message..."
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !inputText.trim()}>
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default InputBox;