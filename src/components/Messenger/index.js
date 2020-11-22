import styled from 'styled-components';
import MessageBubbleRow from '../MessageBubbleRow';
import MessageInput from '../MessageInput';

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

function Messenger({ messages, setMessages }) {

  let textChange = (newVal) => {
    //let text = newVal.target.value;


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

  console.log(messages);

  return (
    <MessengerFrame>
      {
        messages.map(
          (message, i) => {
            console.log(message);
            return <MessageBubbleRow
              key={i}
              message={message}
              outgoing={message.outgoing ? message.outgoing : false} />
          }
        )
      }
      <InputContainer>
        <MessageInput onChange={textChange} onSend={sendMessage} />
      </InputContainer>
    </MessengerFrame >
  );
}

export default Messenger;