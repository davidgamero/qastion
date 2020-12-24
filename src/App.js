import Messenger from './components/Messenger';
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const text_analytics_key = 'e99f8216303f4eb18ca6b145b9e3d7e2';
const text_analytics_endpoint = 'https://qastion.cognitiveservices.azure.com/';
const text_key_phrases = 'text/analytics/v2.1/keyPhrases';

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
      text: 'Do you know where we saved the updated slide deck?',
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

  const analyzeMessage = (m) => {
    console.log(`Analyzing "${m}"`);

    let docs = {
      "documents": [
        {
          "language": "en",
          "id": "1",
          "text": m
        }]
    }

    var data = JSON.stringify(docs);

    var config = {
      method: 'post',
      url: text_analytics_endpoint + text_key_phrases,
      headers: {
        'Ocp-Apim-Subscription-Key': text_analytics_key,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const [suggestions,] = useState([
    {
      keywords: ['done', 'due', 'deadline', 'turn', 'slide', 'deck'],
      question: 'When is our new deadline?',
      response: 'The client needs it by 11/29 at 4pm EST',
      responseAuthor: 'Lucas',
      responseTimestamp: '11/6 8:34 AM'
    },
    {
      keywords: ['saved', 'updated', 'update', 'slide', 'deck', 'location', 'located', 'stored'],
      question: 'Do you know where we saved the updated slide deck?',
      response: 'Yea it\'s at slidedecks.com',
      responseAuthor: 'Lucas',
      responseTimestamp: '11/6 8:34 AM'
    },
    {
      keywords: ['thanksgiving', 'holiday'],
      question: 'Do we get thanksgiving off?',
      response: 'No you can rest when you\'re dead',
      responseAuthor: 'Mike the Manager',
      responseTimestamp: '11/6 8:37 AM'
    },
  ]);

  return (
    <Frame>
      <Messenger
        messages={messages}
        setMessages={setMessages}
        analyzeMessage={analyzeMessage}
        suggestions={suggestions}
        me="David" />
    </Frame>
  );
}

export default App;
