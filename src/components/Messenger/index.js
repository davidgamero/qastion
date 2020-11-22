import styled from 'styled-components';
import MessageBubbleRow from '../MessageBubbleRow';
import MessageInput from '../MessageInput';
import { useState } from 'react';

const MessengerFrame = styled.div`
background-color: #302c30;
max-width: 700px;
width: 80%;
justify-content: center;
justify-items: center;
`;

const InputContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`

function Messenger({ messages, setMessages, suggestions }) {

  const [suggestedQA, setSuggestedQA] = useState();

  let textChange = (newVal) => {
    let text = newVal.target.value;

    // Clean the question text
    text = text.replace(/\?/, '');
    text = text.toLowerCase();

    let words = text.split(' ');

    let suggestionRanks = suggestions.map((s) => {
      let score = 0;
      console.log(s);

      if (!s.keywords) {
        console.log('No keywords on suggestion:');
        console.log(s);
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
    setMessages((m) => {
      return [...m, {
        author: 'David',
        text: messageText,
        outgoing: true,
      }];
    })
  }

  return (
    <MessengerFrame>
      {
        messages.map(
          (message, i) => {
            return <MessageBubbleRow
              key={i}
              message={message}
              outgoing={message.outgoing ? message.outgoing : false} />
          }
        )
      }
      <InputContainer>
        <MessageInput
          onChange={textChange}
          onSend={sendMessage}
          suggestedQA={suggestedQA}
        />
      </InputContainer>
    </MessengerFrame >
  );
}

export default Messenger;