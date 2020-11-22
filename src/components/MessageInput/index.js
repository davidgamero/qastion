import styled from 'styled-components';
import { useState } from 'react';

// const Container = styled.div`

// `

const InputForm = styled.form`
width: 100%;
display: flex;
justify-content: center;
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
`;

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
      <TextInput placeholder="Type a new message" onChange={handleChange} />

    </InputForm>
  )

}

export default MessageInput;