import styled from 'styled-components';

const MessageRow = styled.div`
background-color: #302c30;
padding: 10px;
display: flex;
flex-direction: row;
justify-content: ${props => props.outgoing ? 'flex-end' : 'flex-start'};
`

const MessageBubble = styled.div`
padding: 10px;
background-color: ${props => props.outgoing ? messageColor2 : messageColor1};
margin: 10px;
display: flex;
flex-direction: column;
border-radius: 10px;
max-width: 80%;
`

// const SenderText = styled.p`
// color: white;
// font-size: 0.8rem;
// margin: 0;
// `

const TimeStampText = styled.p`
color: lightgrey;
font-size: 0.8rem;
margin-bottom: 0.2rem;
margin-top: 0;
`

const MessageText = styled.p`
color: white;
margin: 0;
`

const messageColor1 = '#5c585c'; // Incoming messages
const messageColor2 = '#58516b'; // Outgoing messages

function MessageBubbleRow({ message, outgoing }) {
  let date = message && message.created_on && new Date(message.created_on);

  // Create formatted text to show the timestamp for a message
  let timestamp = 'no date' && date && `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

  return (
    <MessageRow outgoing={outgoing}>
      <MessageBubble outgoing={outgoing}>
        <TimeStampText>
          {(outgoing ? '' : message.author + '  ') + timestamp}
        </TimeStampText>
        <MessageText>
          {message ? message.text : 'No Message Text'}
        </MessageText>
      </MessageBubble>
    </MessageRow>
  )
}

export default MessageBubbleRow;