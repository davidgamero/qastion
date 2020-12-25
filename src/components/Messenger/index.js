import styled from 'styled-components';
import MessageBubbleRow from '../MessageBubbleRow';
import MessageInput from '../MessageInput';
import { useState, useEffect } from 'react';
import { FirebaseDatabaseProvider, FirebaseDatabaseNode, FirebaseDatabaseMutation } from '@react-firebase/database';


const MessengerFrame = styled.div`
background-color: #302c30;
max-width: 700px;
width: 100%;
justify-content: center;
justify-items: center;
`;

const InputContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`

function Messenger({ messages, setMessages, suggestions, analyzeMessage, isLoading }) {

  const [suggestedQA, setSuggestedQA] = useState();
  const [dbmessages, setDbmessages] = useState([]);

  useEffect(() => {
    console.log('effect fired')
    console.log(messages);
    if (!isLoading && messages) {
      setDbmessages(Object.keys(messages).map((k) => messages[k]));
      console.log('parsed db messages');
      console.log(messages);
    }
  }, [messages, isLoading]);

  let textChange = (newVal) => {
    let text = newVal.target.value;

    // Clean the question text
    text = text.replace(/\?/, '');
    text = text.toLowerCase();

    let words = text.split(' ');

    let suggestionRanks = suggestions.map((s) => {
      let score = 0;
      //console.log(s);

      if (!s.keywords) {
        console.log('No keywords on suggestion:');
        //console.log(s);
        return 0;
      }

      words.forEach((w) => {
        if (s.keywords.includes(w)) score += 1;
      })

      return score;
    })


    let iMaxScore = suggestionRanks.indexOf(Math.max(...suggestionRanks));

    if (suggestionRanks[iMaxScore] > 0) {
      // Non zero best match
      console.log(suggestionRanks);
      setSuggestedQA(suggestions[iMaxScore]);
    } else {
      setSuggestedQA(undefined);
    }
  }

  let sendMessage = (messageText) => {
    //analyzeMessage(messageText);

    setMessages((m) => {
      return [...m, {
        author: 'David',
        text: messageText,
        outgoing: true,
      }];
    });
  }

  return (
    <MessengerFrame>
      {
        dbmessages.map(
          (message, i) => {
            return <MessageBubbleRow
              key={i}
              message={message}
              outgoing={message.outgoing ? message.outgoing : false} />
          }
        )
      }
      <InputContainer>
        <FirebaseDatabaseMutation
          type="push"
          path={'messages/general'}>
          {({ runMutation }) => {
            console.log('mutation loop render');
            return (
              <MessageInput
                onChange={textChange}
                pushMessage={runMutation}
                onSend={sendMessage}
                suggestedQA={suggestedQA}
              />
            );
          }}
        </FirebaseDatabaseMutation>

      </InputContainer>
    </MessengerFrame >
  );
}

export default Messenger;