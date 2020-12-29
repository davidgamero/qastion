import styled from 'styled-components';
import MessageBubbleRow from '../MessageBubbleRow';
import MessageInput from '../MessageInput';
import { useState, useEffect } from 'react';
import { firebase } from '@firebase/app';

const MessengerFrame = styled.div`
background-color: #302c30;
max-width: 700px;
width: 100%;
justify-content: center;
justify-items: center;
height: 100vh;
display: flex;
flex-direction: column;
`;

// Show messages in top portion of Messenger with most recent at bottom, and scrolling up
const MessageRowsFrame = styled.div`
overflow-y: scroll;
display: flex;
flex-direction: column-reverse;
`

// Extra wrapper to preserve order of messages instead of flipping them
const MessageRowsContainer = styled.div`
`

const InputContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`

function Messenger({ messages, suggestions, isLoading, me }) {

  const [suggestedQA, setSuggestedQA] = useState();
  const [dbmessages, setDbmessages] = useState([]);

  useEffect(() => {
    if (!isLoading && messages) {
      setDbmessages(Object.keys(messages).map((k) => messages[k]));
    }
  }, [messages, isLoading]);

  // Mutation runner since FirebaseDatabaseMutation was breaking state rerendering props
  // sourced from https://github.com/rakannimer/react-firebase/blob/master/modules/database/src/components/FirebaseDatabaseMutation.tsx
  // issue documented at https://github.com/rakannimer/react-firebase/issues/14
  const pushMessage = (value) => {
    const path = 'messages/general';

    const firebaseRef = firebase
      .app()
      .database()
      .ref(path);

    setSuggestedQA();
    return firebaseRef.push(value);
  }

  const textChange = (newVal) => {
    let text = newVal.target.value;

    // Clean the question text
    text = text.replace(/\?/, '');
    text = text.toLowerCase();

    let words = text.split(' ');

    let suggestionRanks = suggestions.map((s) => {
      let score = 0;

      if (!s.keywords) {
        console.log('No keywords on suggestion:');
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

  return (
    <MessengerFrame>
      <MessageRowsFrame>
        <MessageRowsContainer>
          {
            dbmessages.map(
              (message, i) => {
                // Return a MessageBubbleRow for each object in the dbmessages array
                return <MessageBubbleRow
                  key={i}
                  message={message}
                  outgoing={message.author ? message.author === me : false} />
              }
            )
          }
        </MessageRowsContainer>

      </MessageRowsFrame>

      <InputContainer>
        <MessageInput
          onChange={textChange}
          suggestedQA={suggestedQA}
          pushMessage={pushMessage}
          me={me}
        />
      </InputContainer>
    </MessengerFrame >
  );
}

export default Messenger;