import styled from 'styled-components';
import { useState } from 'react';

// const Container = styled.div`

// `

const InputForm = styled.form`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
align-content: center;
`

const TextInput = styled.input`
width: 70%;
font-size: 1rem;
margin: 10px;
color: white;
padding: 10px;
border-radius: 0.2rem;
border: none;
background-color: #5c585c;
:focus {
  outline: none;
  border-bottom: solid #cab2eb 2px;
}
::placeholder {
  color: lightgrey;
}
display: flex;
flex-direction: column;
`;

const SuggestionBox = styled.div`
width: 70%;
background-color: #dafebb;
padding: 0px 10px;
border-radius: 0.2rem;
border: none;
display: flex;
flex-direction: column;
`;

const QuastionTitle = styled.p`
color: #1b3c13;
font-size: 0.8rem;
margin: 10px 0;
margin-bottom: 5px;
`

const SuggestionText = styled.p`
color: #244f19;
font-size: 1rem;
margin: 10px 0;
margin-top: 0;
`


function MessageInput({ onChange, onSend }) {
  const [messageText, setMessageText] = useState('');

  let handleChange = (e) => {
    if (e) setMessageText(e.target.value);

    onChange(e);
  }

  let handleSubmit = (e) => {
    if (e) e.preventDefault();

    console.log('Sent');
    console.log(e);
    onSend(messageText);
  }

  return (
    <InputForm onSubmit={handleSubmit}>
      <SuggestionBox>
        <QuastionTitle>
          {'Qastion Suggestion'}
        </QuastionTitle>
        <SuggestionText>
          {'Similar to: "When is our new deadline?"'}
        </SuggestionText>
      </SuggestionBox>
      <TextInput placeholder="Type a new message" onChange={handleChange} />

    </InputForm>
  )

}

export default MessageInput;