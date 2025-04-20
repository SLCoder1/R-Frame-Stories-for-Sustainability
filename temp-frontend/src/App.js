import React, {useState} from 'react';
import ChatBox from './ChatBox.js';
import chatIcon from './images/chatImage.png';
import './App.css';

function App() {
  const [showChatBox, setShowChatBox] = useState(false);

const toggleChatBox = () => {
  setShowChatBox(prev => !prev);
}

  return (
    
    <div className = "p-4">
      <button
        onClick={toggleChatBox}
        className="ChatBoxButton"
      >
        <img src={chatIcon} alt="Toggle Chat" className="chatbox-icon-img"/>
        {/* {showChatBox ? 'Hide ChatBox' : 'Show ChatBox'} */}
      </button>
      {showChatBox && <ChatBox />}
    </div>
  );
}


export default App;