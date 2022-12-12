import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ChatContextProvider } from './context/Context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <React.StrictMode>
      <ChatContextProvider>
      <App />
      </ChatContextProvider>
    </React.StrictMode>

);
