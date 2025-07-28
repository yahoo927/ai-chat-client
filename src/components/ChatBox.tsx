import React, { useState } from 'react';
import MessageList from './MessageList';
import InputBox from './InputBox';
import { sendMessageToGemini } from '../services/GeminiService';
import { sendMessageToQwen } from '../services/QwenService';
import { ReactComponent as ErrorIcon } from '../assets/error-icon.svg';
import './ChatBox.css';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  isHtml?: boolean;
};

type ModelType = 'gemini-2.5-flash' | 'qwen-plus';//'qwen-wan2.1-t2i-turbo';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState<ModelType>('gemini-2.5-flash');
  const [error, setError] = useState<string | null>(null);
  //const qwenService = new QwenService('sk-dd485c9e4f2d49b5b383e92da8501641');

  const handleSendMessage = async (text: string) => {
    setError(null);
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      let botResponse: string;
      if (model === 'gemini-2.5-flash') {
        botResponse = await sendMessageToGemini(text);
      } else {
        botResponse = await sendMessageToQwen(text);//qwenService.generateText(text);
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        sender: 'bot',
        isHtml: true, // Enable HTML rendering for bot messages
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-box">
      <div className="model-selector">
        <select
          value={model}
          onChange={(e) => setModel(e.target.value as ModelType)}
        >
          <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
          <option value="qwen-plus">qwen-plus</option>
        </select>
      </div>
      {error && (
        <div className="error-message">
          <ErrorIcon className="error-icon" />
          <span>{error}</span>
        </div>
      )}
      <MessageList messages={messages} />
      <InputBox onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatBox;