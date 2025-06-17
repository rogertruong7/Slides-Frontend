import styled from 'styled-components';
import { useState } from 'react';
import { getUserData, putUserData } from '../ApiCalls';
import { SettingsButton } from '../../pages/SlidePage';
import { Button as BaseButton } from '../../styles/LoginRegister';
import { fileToDataUrl } from '../Helpers';

const EditThumbnailSection = ({ token, presentation }) => {
  const [isEditingThumbnail, setEditingThumbnail] = useState(false);
  const [thumbnail, setThumbnail] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      return fileToDataUrl(file)
        .then(dataUrl => {
          const image = dataUrl;
          setThumbnail(image);
        })
    }
  };

  const editThumbnail = () => {
		
    if (isEditingThumbnail) {
      getUserData(token)
        .then((response) => {
          const newPresentations = response.store.presentations;
          const updatedPresentation = newPresentations.find(p => p.id === presentation.id);
          updatedPresentation.thumbnail = thumbnail;
          const data = {
            presentations: newPresentations
          }
          putUserData(token, data)
            .then(() => {
              setEditingThumbnail(!isEditingThumbnail);
            })

        })

    }
  }

  return (
    <>
      <Container>
        <SettingsButton onClick={() => setEditingThumbnail(!isEditingThumbnail)}>Change Thumbnail</SettingsButton>
        {isEditingThumbnail && (
          <EditInputContainer>
            <FileInput type="file" onChange={handleImageUpload}/>
            <NewButton onClick={editThumbnail}>Submit</NewButton>
          </EditInputContainer>
        )}
      </Container>
    </>
  );
};

const FileInput = styled.input`
	font-family: 'Poppins', sans-serif;
  z-index: 3000;
  display: block;
`

const NewButton = styled(BaseButton)`
	padding: 5px;
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
	margin-left: 20px;
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

export default EditThumbnailSection;
