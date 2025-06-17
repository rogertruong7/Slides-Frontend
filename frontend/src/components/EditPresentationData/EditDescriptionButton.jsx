import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getUserData, putUserData } from '../ApiCalls';
import { SettingsButton } from '../../pages/SlidePage';
import { Button as BaseButton } from '../../styles/LoginRegister';
import Error from '../Error';

const EditDescriptionSection = ({ token, presentation }) => {
  const [isEditingDescription, setEditingDescription] = useState(false);
  const [description, setDescription] = useState(presentation.description);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getUserData(token)
      .then((response) => {
        const presentations = response.store.presentations;
        const currPresentation = presentations.find(p => p.id === presentation.id);
        if (presentation.description !== currPresentation.description) {
          setDescription(currPresentation.description);
        }
      })
      .catch((error) => {
        setErrorVisible(true);
        setErrorMessage(error.response.data.error);
      });
  }, []);

  const editDescription = () => {
    if (isEditingDescription) {
      getUserData(token)
        .then((response) => {
          const newPresentations = response.store.presentations;
          const updatedPresentation = newPresentations.find(p => p.id === presentation.id);
          updatedPresentation.description = description;
          const data = {
            presentations: newPresentations
          }
          putUserData(token, data)
            .then(() => {
              setEditingDescription(!isEditingDescription);
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
        <Error setErrorVisible={setErrorVisible} errorMessage={errorMessage} errorStatus={'403'} /> 
      )}
      <Container>
        <SettingsButton onClick={() => setEditingDescription(!isEditingDescription)}>Change Description</SettingsButton>
        {isEditingDescription && (
          <EditInputContainer>
            <Input type="text" value={description} onChange={e => setDescription(e.target.value)}/>
            <NewButton onClick={editDescription}>Submit</NewButton>
          </EditInputContainer>
        )}
      </Container>
    </>
  );
};

const Input = styled.textarea`
	font-family: 'Poppins', sans-serif;
  height: 200px;
  border-radius: 10px;
  padding: 10px;
  z-index: 3000;
`

const NewButton = styled(BaseButton)`
	padding: 5px;
  z-index: 3000;
`

const EditInputContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	margin-top: 130px;
	background-color: white;
	padding: 20px;
	border-radius: 10px;
	font-family: 'Poppins', sans-serif;
	width: 185px;
	box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.2);
	margin-left: 95px;
	display: flex;
	flex-direction: column;
	gap: 5px;
  z-index: 3000;
`

const Container = styled.div`
	display: flex;
	flex-direction: column;
  z-index: 3000;
`

export default EditDescriptionSection;
