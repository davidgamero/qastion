import logo from './logo.svg';
import Messenger from './components/Messenger';
import React, { useState } from 'react';
import styled from 'styled-components';

const Frame = styled.div`
align-content: center;
align-items: center;
justify-content: center;
justify-items: center;
display: flex;
`

function App() {
  const [messages, setMessages] = useState([
    {
      author: 'David',
      text: 'Hey!',
      outgoing: true,
    },
    {
      author: 'Lucas',
      text: 'Hello'
    },
    {
      author: 'David',
      text: 'Do you know where we saved the updated slide deck? Do you know where we saved the updated slide deck?',
      outgoing: true,
    },
    {
      author: 'Lucas',
      text: 'Yea it\'s at slidedecks.com'
    },
    {
      author: 'David',
      text: 'Thanks!',
      outgoing: true,
    },
  ])

  return (
    <Frame>
      <Messenger
        messages={messages}
        setMessages={setMessages}
        me="David" />
    </Frame>
  );
}

export default App;
