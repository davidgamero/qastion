import styled from 'styled-components';
import MessageBubbleRow from '../MessageBubbleRow';
import MessageInput from '../MessageInput';
import { useState, useEffect } from 'react';
import { FirebaseDatabaseMutation } from '@react-firebase/database';


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

function Messenger({ messages, suggestions, isLoading, me }) {

  const [suggestedQA, setSuggestedQA] = useState();
  const [dbmessages, setDbmessages] = useState([]);

  useEffect(() => {
    if (!isLoading && messages) {
      setDbmessages(Object.keys(messages).map((k) => messages[k]));
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
      {
        dbmessages.map(
          (message, i) => {
            //console.log(`author=${message.author} me=${me} check=${message.author === me}`);

            // Return a MessageBubbleRow for each object in the dbmessages array
            return <MessageBubbleRow
              key={i}
              message={message}
              outgoing={message.author ? message.author === me : false} />
          }
        )
      }
      <InputContainer>
        <FirebaseDatabaseMutation
          type="push"
          path={'messages/general'}>
          {({ runMutation }) => {
            // Pass the runMutation method into the MessageInput to allow it to send messages
            // runMutation pushes a new message to the general chat
            return (
              <MessageInput
                onChange={textChange}
                pushMessage={runMutation}
                suggestedQA={suggestedQA}
                me={me}
              />
            );
          }}
        </FirebaseDatabaseMutation>

      </InputContainer>
    </MessengerFrame >
  );
}

export default Messenger;