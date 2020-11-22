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

  const [suggestions,] = useState([
    {
      keywords: ['done', 'due', 'deadline'],
      question: 'When is our new deadline?',
      response: 'The client needs it by 11/29 at 4pm EST',
      responseAuthor: 'Lucas',
      responseTimestamp: '11/6 8:34 AM'
    }
  ]);

  return (
    <Frame>
      <Messenger
        messages={messages}
        setMessages={setMessages}
        suggestions={suggestions}
        me="David" />
    </Frame>
  );
}

export default App;
