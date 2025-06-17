import { useState } from 'react';;
import { v4 as uuidv4 } from 'uuid';
import { getUserData, putUserData } from './ApiCalls'
import styled  from 'styled-components';

const PopupContainer = styled.form`
  width: 50%;
  display: flex;
  gap: 5px;
  align-items: flex-start;
`;

export const Button = styled.button`
  width: 100px;
  height: 40px;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  background-color: #007BFF;
  color: white;
  border-bottom-right-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

function CreatePresentation({token, setPresentations, setPopUpVisible}) {
  const [name, setName] = useState('');
  const id = uuidv4();

  const createPresentation = (e) => {
    e.preventDefault();
    getUserData(token)
      .then((response) => {
        if (Object.keys(response).length === 0) {
          return [];
        } 
        if (response.store.presentations) {
          return response.store.presentations;
        }
        return [];
      })
      .then((presentations) => {
        const thumbnail = '';
        const numSlides = 1;
        const description = '';
        const defaultTheme = '';
        const slideData = {
          texts: [],
          images: [],
          codes: [],
          videos: [],
          slideNumber: 1,
          theme: '',
        };
        let slides = [slideData];
 
        let newPresentation = {
          name,
          id,
          description,
          thumbnail,
          numSlides,
          slides,
          defaultTheme,
        };
        presentations.unshift(newPresentation);

        // Data to update
        const data = {
          presentations: presentations
        }

        // Updates User Data
        putUserData(token, data)
          .then(() => {
            setPopUpVisible(false);
            setPresentations(presentations);
          })
      })
  }

  return (
    <>
      <PopupContainer onSubmit={createPresentation}>
        <input 
          style={{
            width: '100%',
            height: "40px",
            boxSizing: 'border-box',
            fontFamily: "'Poppins', sans-serif",
            border: 'none',
            borderBottom: '1px solid black',
            borderTopLeftRadius: '10px',
            paddingLeft: '10px',
          }}
          type="text"
          placeholder='Title your presentation'
          value={name}
          onChange={e => setName(e.target.value)}/>
        <Button type='submit'>
          Create
        </Button>
      </PopupContainer>
    </>
  );
}

export default CreatePresentation;