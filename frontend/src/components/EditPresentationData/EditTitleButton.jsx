import styled from 'styled-components';
import edit from '../../assets/edit.svg'
import { useState, useEffect } from 'react';
import { getUserData, putUserData } from '../ApiCalls';
import Error from '../Error';

const EditTitleSection = ({ token, presentation, setPresentation }) => {
  const [isEditingTitle, setEditingTitle] = useState(false);
  const [newName, setNewName] = useState(presentation.name);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const currPresentation = presentations.find(p => p.id === presentation.id);
        setPresentation(currPresentation);
        if (presentation.name !== currPresentation.name) {
          setNewName(currPresentation.name);
        }
      });
  }, []);

  const editTitle = () => {
    setEditingTitle(!isEditingTitle);
    if (isEditingTitle) {
      getUserData(token)
        .then((response) => {
          const newPresentations = response.store.presentations;
          const updatedPresentation = newPresentations.find(p => p.id === presentation.id);
          updatedPresentation.name = newName;
          const data = {
            presentations: newPresentations
          }
          putUserData(token, data)
            .then(() => {
              setPresentation(updatedPresentation);
            })
            .catch((error) => {
              setErrorVisible(true);
              setErrorMessage(error.response.data.error);
            });
        })
        .catch((error) => {
          setErrorVisible(true);
          setErrorMessage(error.response.data.error);
        });
    }
  }

  return (
    <>
      {errorVisible && (
        <Error setErrorVisible={setErrorVisible} errorMessage={errorMessage} errorStatus={'400'} /> 
      )}
      {!isEditingTitle ? (
        <h2>{presentation.name}</h2>
      ) : (
        <EditInput onBlur={editTitle} type="text" value={newName} onChange={e => setNewName(e.target.value)}/>
      )}
		
      <EditButtonContainer onClick={editTitle}>
        <EditButton src={edit} alt="edit_picture" />
      </EditButtonContainer>
    </>
  );
};

export const EditInput = styled.input`
	font-family: 'Poppins', sans-serif;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	width: 400px;
	height: 40px;
	font-size: 20px;
`;

const EditButtonContainer = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: gray;
    border: 1px solid white;
  }
`

const EditButton = styled.img`
  height: 25px;
`

export default EditTitleSection;
