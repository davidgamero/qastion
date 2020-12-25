import styled from 'styled-components';
import { useState } from 'react';

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

function MessageInput({ onChange, suggestedQA, pushMessage, me }) {
  const [messageText, setMessageText] = useState('');

  /**
   * Callback for each time the text in the message input changes
   */
  let handleChange = (e) => {
    if (e) setMessageText(e.target.value);
    onChange(e);
  }

  /**
   * Callback for pressing enter key in TextInput
   * @param {*} e 
   */
  let handleSubmit = (e) => {
    // Block form submission by default since we want to process this in a custom way
    if (e) e.preventDefault();

    console.log('Sent');
    console.log(e);

    // Push new message to Firebase using Mutation method from props
    pushMessage({
      created_on: Date.now(),
      text: messageText,
      author: 'no author' && me,
      replies: []
    })
  }

  return (
    <InputForm onSubmit={handleSubmit}>
      {suggestedQA ? <SuggestionBox>
        <QuastionTitle>
          {'Qastion Suggestion'}
        </QuastionTitle>
        <SuggestionText>
          {`Similar to: "${suggestedQA.question}"`}
        </SuggestionText>
        <QuastionTitle>
          {`>  ${suggestedQA.responseAuthor} @ ${suggestedQA.responseTimestamp}`}
        </QuastionTitle>
        <SuggestionText>
          {`> ${suggestedQA.response}`}
        </SuggestionText>
      </SuggestionBox>
        : ''}
      <TextInput placeholder="What's the new deadline?" onChange={handleChange} />

    </InputForm>
  )

}

export default MessageInput;